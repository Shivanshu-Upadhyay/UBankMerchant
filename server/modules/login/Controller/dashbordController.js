const config = require("../../../config/config");
const mysqlcon = require("../../../config/db_connection");

const dashboardCount = {
  payout: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;
      res.json({
        message: "err in finding payout",
      });
      console.log("reached");
      // sql = "SELECT * FROM `tbl_icici_payout_transaction_response_details` WHERE users_id = ?"
      // let found = await mysqlcon.query(sql,user_id)
    } catch (error) {
      return res.json({
        status: 400,
        message: "err in finding payout",
      });
    }
  },

  card_data: async function (req, res) {
    let user = req.user;
    let user_id = user.id;

    try {
      sql =
        "select i_flname,date_format(tbl_icici_payout_transaction_response_details.created_on,'%m/%Y') as date,i_email,ROUND(sum(ammount)) as deposit, ROUND(sum(amount)) as payout, ROUND(sum(settlementAmount)) as settlement, ROUND(sum(rolling_reverse_amount)) as roll_reverse, ROUND(sum(totalCharges)) as charges,wallet as avilable_amt from tbl_merchant_transaction INNER JOIN tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id = tbl_icici_payout_transaction_response_details.users_id INNER JOIN tbl_settlement on tbl_settlement.user_id = tbl_icici_payout_transaction_response_details.users_id INNER JOIN tbl_user on tbl_icici_payout_transaction_response_details.users_id=tbl_user.parent_id";
      // sql = "select i_flname,date_format(created_on,'%m/%Y') as date,ROUND(sum(ammount)) as deposit,i_email from tbl_icici_payout_transaction_response_details ";//where user_id = ? user_id

      let result = await mysqlcon(sql);

      return res
        .status(200)
        .json({
          status: true,
          message: "data sent successfully",
          data: result,
        });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      console.log("Execution completed.");
    }
  },
  success_rate: async function (req, res) {
    let user = req.user;
    let user_id = user.id;

    try {
      sql =
        "select status from  tbl_icici_payout_transaction_response_details "; //WHERE users_id = ? user_id
      let result = await mysqlcon(sql);

      let total = result.length;
      let successCount = 0;
      for (let i = 0; i < total; i++) {
        if (result[i].status === "SUCCESS") {
          successCount += 1;
        }
      }
      successPercent = Math.round((successCount / total) * 100);
      res
        .status(200)
        .json({
          status: true,
          message: "data sent successfully",
          data: successPercent,
        });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      console.log("Execution completed.");
    }
  },
  dpc: async function (req, res) {
    let user = req.user;
    let user_id = user.id;
    console.log(user_id)

    var d = new Date();
    let sdate1 = d.toLocaleString().slice(0, 10);
    let today =
      sdate1.slice(6, 10) + "-" + sdate1.slice(3, 5) + "-" + sdate1.slice(0, 2);
    // week
    var d2 = new Date();
    let sdate2 = d2.toLocaleString().slice(0, 10);
    let start_week =
      sdate2.slice(6, 10) + "-" + sdate2.slice(3, 5) + "-" + sdate2.slice(0, 2);
    d2.setDate(d.getDate() - 6);
    let s_week_date = d.toLocaleString().slice(0, 10);
    let end_week =
      s_week_date.slice(6, 10) +
      "-" +
      s_week_date.slice(3, 5) +
      "-" +
      s_week_date.slice(0, 2);

    // month
    var d3 = new Date();
    let sdate3 = d.toLocaleString().slice(0, 10);
    let start_month =
      sdate3.slice(6, 10) + "-" + sdate3.slice(3, 5) + "-" + sdate3.slice(0, 2);
    d.setDate(d.getDate() - 29);
    let s_month_date = d3.toLocaleString().slice(0, 10);
    let end_month =
      s_month_date.slice(6, 10) +
      "-" +
      s_month_date.slice(3, 5) +
      "-" +
      s_month_date.slice(0, 2);

    try {
      let result;

      let todayy = req.body.today_;
      let week = req.body.week_;
      let month = req.body.month_;

      // for day
      if (todayy) {
        sql =
          "select currency,ammount,ammount_type,settlementAmount,amount from tbl_merchant_transaction inner join tbl_settlement on tbl_merchant_transaction.user_id=tbl_settlement.user_id inner join tbl_icici_payout_transaction_response_details on tbl_settlement.user_id=tbl_icici_payout_transaction_response_details.users_id limit 10";
        // sql = "select currency,ammount,ammount_type,settlementAmount,amount from tbl_merchant_transaction inner join tbl_settlement on tbl_merchant_transaction.user_id=tbl_settlement.user_id inner join tbl_icici_payout_transaction_response_details on tbl_settlement.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on) = ? AND tbl_icici_payout_transaction_response_details.users_id = 15"
        console.log(user_id);

        result = await mysqlcon(sql, [today]);
        return res
          .status(200)
          .json({
            status: true,
            message: "data sent successfully",
            data: result,
          });
      }

      // week
      if (week) {
        sql =
          "select tbl_icici_payout_transaction_response_details.created_on currency,ammount,ammount_type,settlementAmount,amount from tbl_merchant_transaction inner join tbl_settlement on tbl_merchant_transaction.user_id=tbl_settlement.user_id inner join tbl_icici_payout_transaction_response_details on tbl_settlement.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on) BETWEEN '" +
          start_week +
          "' AND '" +
          end_week +
          "' AND tbl_icici_payout_transaction_response_details.users_id = ? ";

        result = await mysqlcon(sql, user_id);
        return res
          .status(200)
          .json({
            status: true,
            message: "data sent successfully",
            data: result,
          });
      }

      // month
      if (month) {
        sql =
          "select tbl_icici_payout_transaction_response_details.created_on currency,ammount,ammount_type,settlementAmount,amount from tbl_merchant_transaction inner join tbl_settlement on tbl_merchant_transaction.user_id=tbl_settlement.user_id inner join tbl_icici_payout_transaction_response_details on tbl_settlement.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_icici_payout_transaction_response_details.created_on) BETWEEN '" +
          start_month +
          "' AND '" +
          end_month +
          "' AND tbl_icici_payout_transaction_response_details.users_id = ?";

        result = await mysqlcon(sql, user_id);
        return res
          .status(200)
          .json({
            status: true,
            message: "data sent successfully",
            data: result,
          });
      }

      // console.log(result)

      if (!result) {
        return res
          .status(201)
          .json({
            status: false,
            message: "Something went wrong, try again later",
            data: [],
          });
      }
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      console.log("Execution completed.");
    }
  },
  top_transaction_today: async function (req, res) {
    let user = req.user;
    let user_id = user.id;
    console.log(1234567893435)

    var d = new Date();
    let sdate1 = d.toLocaleString().slice(0, 10);
    let today =
      sdate1.slice(6, 10) + "-" + sdate1.slice(3, 5) + "-" + sdate1.slice(0, 2);
    // week
    var d2 = new Date();
    let sdate2 = d2.toLocaleString().slice(0, 10);
    let start_week =
      sdate2.slice(6, 10) + "-" + sdate2.slice(3, 5) + "-" + sdate2.slice(0, 2);
    d2.setDate(d.getDate() - 6);
    let s_week_date = d.toLocaleString().slice(0, 10);
    let end_week =
      s_week_date.slice(6, 10) +
      "-" +
      s_week_date.slice(3, 5) +
      "-" +
      s_week_date.slice(0, 2);

    // month
    var d3 = new Date();
    let sdate3 = d.toLocaleString().slice(0, 10);
    let start_month =
      sdate3.slice(6, 10) + "-" + sdate3.slice(3, 5) + "-" + sdate3.slice(0, 2);
    d.setDate(d.getDate() - 29);
    let s_month_date = d3.toLocaleString().slice(0, 10);
    let end_month =
      s_month_date.slice(6, 10) +
      "-" +
      s_month_date.slice(3, 5) +
      "-" +
      s_month_date.slice(0, 2);

    try {
      var request = req.body;

      let result;

      let today = request.today_;
      let week = request.week_;
      let month = request.month_;

      // day
      if (today) {
        sql =
          "select i_flname,payment_type,currency,date_format(tbl_merchant_transaction.created_on,'%d %M, %Y') as date,date_format(tbl_merchant_transaction.created_on,'%h:%i') as time,ammount,tbl_icici_payout_transaction_response_details.status from tbl_merchant_transaction inner join tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id=tbl_icici_payout_transaction_response_details.users_id limit 20";
        // sql = "select i_flname,payment_type,currency,tbl_merchant_transaction.created_on,ammount,tbl_icici_payout_transaction_response_details.status from tbl_merchant_transaction inner join tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_merchant_transaction.created_on) = ? AND user_id = ?"

        result = await mysqlcon(sql, [today, user_id]);
      }

      // weeks
      if (week) {
        sql =
          "select i_flname,payment_type,currency,tbl_merchant_transaction.created_on,ammount,tbl_icici_payout_transaction_response_details.status from tbl_merchant_transaction inner join tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_merchant_transaction.created_on) BETWEEN ? AND ? AND user_id = ?";

        result = await mysqlcon(sql, [start_week, end_week, user_id]);
      }

      //months
      if (month) {
        sql =
          "select i_flname,payment_type,currency,tbl_merchant_transaction.created_on,ammount,tbl_icici_payout_transaction_response_details.status from tbl_merchant_transaction inner join tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id=tbl_icici_payout_transaction_response_details.users_id WHERE DATE(tbl_merchant_transaction.created_on) BETWEEN ? AND ? AND user_id = ?";

        result = await mysqlcon(sql, [start_month, end_month, user_id]);
      }

      if (!result) {
        return res
          .status(201)
          .json({
            status: false,
            message: "Something, try again later",
            data: [],
          });
      }

      return res
        .status(200)
        .json({
          status: true,
          message: "data recived successfully",
          data: result,
        });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      console.log("Execution completed.");
    }
  },
  payout_icon: async (req, res) => {
    let user = req.user;
    let Type = req.body.type;
    am = "";
    let tbl_name = "";
    if (Type === "payout") {
      tbl_name += "tbl_icici_payout_transaction_response_details";
      am += "amount";
    } else {
      tbl_name += "tbl_merchant_transaction";
      am += "ammount";
    }
    try {
      let user_id = user.id;
      // sql = "select (select count(*) from " + tbl_name + " where time(created_on) BETWEEN '00:00:01' and '04:00:00' and date(created_on)=date(now()) ) as first,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '04:00:01' and '08:00:00' and date(created_on)=date(now()) ) as second,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '08:00:01' and '12:00:00' and date(created_on)=date(now()) ) as third,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '12:00:01' and '16:00:00' and date(created_on)=date(now()) ) as fourth,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '16:00:01' and '20:00:00' and date(created_on)=date(now()) ) as fifth,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '20:00:01' and '24:00:00' and date(created_on)=date(now()) ) as sixth,(select sum(" + am + ") from " + tbl_name + " ) as total_payout,(select ROUND(sum(ammount)) from tbl_merchant_transaction) as total_deposit"

      sql =
        "select (select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '00:00:01' and '04:00:00' ) as first,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '04:00:01' and '08:00:00' ) as second,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '08:00:01' and '12:00:00' ) as third,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '12:00:01' and '16:00:00' ) as fourth,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '16:00:01' and '20:00:00' ) as fifth,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '20:00:01' and '24:00:00' ) as sixth,(select sum(" +
        am +
        ") from " +
        tbl_name +
        " ) as total_payout,(select ROUND(sum(ammount)) from tbl_merchant_transaction) as total_deposit";

      let found = await mysqlcon(sql, user_id);
      console.log(found);
      return res.json({
        status: 200,
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 400,
        message: "err in finding payout ",
        error,
      });
    }
  },
  daily_sale_count_icon: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;

      let Start = req.body.start_date;
      let End = req.body.end_dateDATE_S;
      sql =
        "select count(ammount) as no_of_transaction,SUBSTRING(DAYNAME(date(created_on)),1,3) as weekday,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN DATE_SUB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)";
      // sql ="select count(ammount) as no_of_transaction,if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=0,'Sun',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=1,'Mon',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=2,'Tue',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=3,'Wed',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=4,'Thu',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=5,'Fri',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=6,'Sat',''))))))) as weekday,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN DATE_SUB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)"
      // let = sql = "SELECT sum(ammount) AS sale ,DATE(created_on) AS time FROM tbl_merchant_transaction WHERE user_id = ? AND DATE(created_on) BETWEEN ? AND ? GROUP by time(created_on)"

      let found = await mysqlcon(sql, [user_id, Start, End]);

      if (!found) {
        return res.status(201).json({ message: "not found" });
      }
      return res.status(200).json({
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "err in finding payout ",
        error,
      });
    }
  },
  monthly_transaction: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;

      let Start = req.body.start_date;
      let End = req.body.end_date;

      sql =
        "select ROUND(sum(ammount)) as Total_transaction_amount,count(ammount) as No_of_transaction,SUBSTRING(date_format(created_on,'%M-%Y'),1,3) as name from tbl_merchant_transaction where date(created_on)>=DATE_SUB(date(now()),interval 12 month) group by date_format(created_on,'%m-%Y');";
      let found = await mysqlcon(sql, [user_id, Start, End]);

      if (!found) {
        return res.status(201).json({ message: "not found" });
      }
      return res.status(200).json({
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "err in finding payout ",
        error,
      });
    }
  },
  weekly_transaction: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;

      let Start = req.body.start_date;
      let End = req.body.end_date;

      sql =
        "select sum(ammount) as Total_transaction_amount,count(ammount) as No_of_transaction,if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=0,'Sun',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=1,'Mon',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=2,'Tue',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=3,'Wed',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=4,'Thu',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=5,'Fri',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=6,'Sat',''))))))) as name,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN DATE_SUB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)";
      let found = await mysqlcon(sql, [user_id, Start, End]);

      if (!found) {
        return res.status(201).json({ message: "not found" });
      }
      return res.status(200).json({
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "err in finding payout ",
        error,
      });
    }
  },
  payment_type: async function (req, res) {
    let user = req.user;
    let user_id = user.id;

    try {
      sql = "select payment_type,ammount from tbl_merchant_transaction";

      let result = await mysqlcon(sql);
      upi_amt = 0;
      wallet_amt = 0;
      card_amt = 0;
      netbanking_amt = 0;
      upi_count = 0;
      wallet_count = 0;
      card_count = 0;
      netbanking_count = 0;
      total_count = result.length;

      for (i of result) {
        if (
          i.payment_type === "CREDIT CARD" ||
          i.payment_type === "DEBIT CARD"
        ) {
          card_count += 1;
          card_amt += parseInt(i.ammount);
        } else if (i.payment_type === "UPI") {
          upi_count += 1;
          upi_amt += parseInt(i.ammount);
        } else if (i.payment_type === "NETBANKING") {
          netbanking_count += 1;
          netbanking_amt += parseInt(i.ammount);
        } else {
          wallet_count += 1;
          wallet_amt += parseInt(i.ammount);
        }
      }
      upi_percent = Math.round((upi_count / total_count) * 100);
      wallet_percent = Math.round((wallet_count / total_count) * 100);
      card_percent = Math.round((card_count / total_count) * 100);
      netbanking_percent = Math.round((netbanking_count / total_count) * 100);

      let data = {
        upi: { total: upi_amt, percent: upi_percent },
        card: { total: card_amt, percent: card_percent },
        wallet: { total: wallet_amt, percent: wallet_percent },
        netbanking: { total: netbanking_amt, percent: netbanking_percent },
      };

      res
        .status(200)
        .json({ status: true, message: "data sent successfully", data: data });
    } catch (Error) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      console.log("Execution completed.");
    }
  },
};

module.exports = dashboardCount;
