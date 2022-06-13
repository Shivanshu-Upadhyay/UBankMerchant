const mysqlcon = require("../../../config/db_connection");
const send_mail = require("../../../helper/send-mail");
const dateTime = require("node-datetime");
const Date = dateTime.create();
const date_format = Date.format("ymdTHHMMSS");

const settlement = {
  settlemetnt_Trans: async (req, res) => {
    let user = req.user;
    let user_id = user.id;
    let { from, to,today } = req.body;


    let pagination = (total, page) => {
      let limit = 15;
      let numOfPages = Math.ceil(total / limit);
      let start = page * limit - limit;
      return { limit, start, numOfPages };
    };

    try {
      let sql1 =
        "SELECT count(*) as count,SUM(requestedAmount) as request,SUM(charges) as charges,SUM(settlementAmount) as amount FROM tbl_settlement WHERE user_id = ? ORDER BY id ASC";
      let result = await mysqlcon(sql1, user_id);

      // console.log(result[0].requestedAmount) ICONS
      let requestedAmount = result[0].request;
      let charges = result[0].charges;
      let settlementAmount = result[0].amount;
      console.log(result[0].count);

      // paginenation
      let total = result[0].count;
      let Page = req.body.page ? Number(req.body.page) : 1;
      let page = await pagination(total, Page);

      console.log("total" + total);
      console.log(page);
      // console.log(result)

      let data;
      if (today) {
        let sql =
          "SELECT * FROM tbl_settlement WHERE user_id = ? AND DATE(created_on) = DATE(NOW()) LIMIT ?,?";
        data = await mysqlcon(sql, [user_id, page.start, page.limit]);
      } else if (from && to){
        let sql =
          "SELECT * FROM tbl_settlement WHERE user_id = ? AND DATE(created_on) >= ? AND DATE(created_on) <= ? LIMIT ?,?";
        data = await mysqlcon(sql, [user_id, from, to, page.start, page.limit]);
      } else {
        let sql =
          "SELECT * FROM tbl_settlement WHERE user_id = ? LIMIT ?,?";
        data = await mysqlcon(sql, [user_id, page.start, page.limit]);
      }

      // console.log(data)

      return res.json(200, {
        message: "settlement transaston",

        card: [
          {
            name: "Total Settlement Request",
            amount: requestedAmount,
          },

          { name: "Total Fees/Charges", amount: charges },

          {
            name: "Total Amount Sent",
            amount: settlementAmount,
          },
          {
            name: "Total Amount Recieved",
            amount: settlementAmount,
          },
        ],

        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occure",
        error,
      });
    }
  },

  // need to find exchange rate in databse in percentage
  requestSettlement: async (req, res) => {
    let user = req.user;
    // user.fee_charge
    let user_id = user.id;
    let request = req.body;

    try {
      let sql = "SELECT fee_charge FROM tbl_user where id = ? ORDER BY id ASC";
      let charge = await mysqlcon(sql, user_id);
      // console.log(charge[0].fee_charge)
      let charges = charge[0].fee_charge;

      // currrency send
      let currency = request.currency;
      if (currency === undefined) {
        return res.send("select currency");
      }

      let sql1 =
        "SELECT rate FROM tbl_settled_currency WHERE deposit_currency = ? ORDER BY id ASC";
      let rate = await mysqlcon(sql1, currency);
      console.log(rate);

      let total_charges =
        request.requestedAmount -
        (request.requestedAmount * charge[0].fee_charge) / 100;
      let Settlement_Ammount = total_charges / rate[0].rate;

      let Settlement = {
        user_id: user_id,
        settlementId: date_format, // id = date
        settlementType: request.settlementType,
        fromCurrency: currency, // like USD
        toCurrency: request.toCurrency,
        walletAddress: request.walletAddress,
        accountNumber: request.accountNumber,
        bankName: request.bankName,
        branchName: request.branchName,
        city: request.city,
        country: request.country,
        swiftCode: request.swiftCode,
        requestedAmount: request.requestedAmount,
        charges: charge[0].fee_charge, // This will go from 'sql' tbl_user
        exchangeRate: rate[0].rate, //  This will go from 'sql' tbl_settle_currency
        totalCharges: total_charges, // formula
        settlementAmount: Settlement_Ammount, // formula
      };

      if (Settlement.settlementType === "CRYPTO") {
        Settlement = {
          user_id: user_id,
          settlementId: date_format, // id = date
          settlementType: request.settlementType,
          fromCurrency: currency, // like USD
          toCurrency: request.toCurrency,
          walletAddress: " ",
          accountNumber: " ",
          bankName: " ",
          branchName: " ",
          city: " ",
          country: " ",
          swiftCode: " ",
          requestedAmount: request.requestedAmount,
          charges: charge[0].fee_charge, // This will go from 'sql' tbl_user
          exchangeRate: rate[0].rate, //  This will go from 'sql' tbl_settle_currency
          totalCharges: total_charges, // formula
          settlementAmount: Settlement_Ammount, // formula
        };
      }

      let sql2 = "INSERT INTO tbl_settlement SET ?";
      let result = await mysqlcon(sql2, Settlement);

      console.log(user.email);

      // let mail = send_mail.invoiceMail(Settlement,user.email);

      return res.status(200).json({
        message: "Request settlement transaston",
        Charges: charges,
        settlementId: date_format,
        "Exchange Rate": rate[0].rate,
        requested: request.requestedAmount,
        "total charges": total_charges,
        "Exchange Rate": Settlement_Ammount,
      });
    } catch (error) {
      console.log(error);
      return res.json(500, {
        message: "error occure",
        error,
      });
    }
  },
};

module.exports = settlement;
