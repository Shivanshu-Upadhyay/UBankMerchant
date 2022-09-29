const mysqlcon = require('../config/db_connection');

/* Methods with Numbers
1 - Default Page
2 - search by OrderID
3 - Today
4 - Yesterday
5 - Custom Date 
*/

const payoutMethods = {
  filter: async (req, res) => {
    let user = req.user;
    var { uniqueid } = req.body;
    const { Date } = req.body;
    const { from, to } = req.body;
    let filterType = req.body.filterType ? Number(req.body.filterType) : 1;
    let page = req.body.page ? Number(req.body.page) : 1;

    let limit = 15;
    let start = page * limit - limit;

    let sql, sql1;
    let arr = [],
      arr1 = [];

    console.log(filterType);
    if (filterType === 1) {
      // 1 Default Page
      sql =
        "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?";
      arr = [user.id];
      sql1 =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? LIMIT ?,?";
      arr1 = [user.id, start,limit];
    } else if (filterType === 2) {
      // 2 - search by OrderID
      sql =
        "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND uniqueid LIKE ?";
      arr = [user.id, uniqueid + "%"];
      sql1 =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND uniqueid LIKE ?";
      arr1 = [user.id, uniqueid + "%"];
    } else if (filterType === 3) {
      // 3 - Today, Yesterday
      sql =
        "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id = ?";
      arr = [Date, user.id];
      sql1 =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) = ? AND users_id = ? LIMIT ?,?";
      arr1 = [Date, user.id, start, limit];
    } else if (filterType === 4) {
      // 4 - Custom Date
      sql =
        "SELECT COUNT(*) AS Total FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id = ?";
      arr = [from, to, user.id];
      sql1 =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE DATE(created_on) >= ? AND DATE(created_on) <= ? AND users_id = ? LIMIT ?,?";
      arr1 = [from, to, user.id, start, limit];
    }

    try {
      let data = await mysqlcon(sql, arr);
      let total = data[0].Total;
      let numOfPages = Math.ceil(total / limit);

      let result = await mysqlcon(sql1, arr1);
      if (result.length === 0) {
        return res.status(201).json({
          message: "No record found.",
          data: [],
        });
      }
      return res.status(200).json({
        Status: "success",
        currPage: page,
        message: "Showing " + result.length + " out of " + total + " results",
        totalPage: numOfPages,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured" });
    } 
  },
  payoutheader: async (req, res) => {
    let user = req.user;
    let sql =
      "SELECT SUM(amount) AS amount FROM tbl_icici_payout_transaction_response_details WHERE  users_id = ? AND status = ?";
    try {
      let successData = await mysqlcon(sql, [user.id, "SUCCESS"]); // Success
      var success = successData[0].amount;
      let declinedData = await mysqlcon(sql, [user.id, "FAILURE"]); // Declined
      var failure = declinedData[0].amount;
      let pendingData = await mysqlcon(sql, [user.id, "PENDING"]); // Pending
      var pending = pendingData[0].amount;
      var successJSON = { name: "Success", amount: success };
      var declinedJSON = { name: "Declined", amount: failure };
      var pendingJSON = { name: "Pending", amount: pending };
      var totalJSON = { name: "Total Payout", amount: user.wallet };
      return res.status(200).json({
        message: "All Payout header Data",
        data: [successJSON, declinedJSON, pendingJSON, totalJSON],
      });
    } catch (error) {
      console.log(error);
      return res
        .status(201)
        .json({ status: false, message: "Some error occured" });
    } 
  },

  viewDetails: async (req, res) => {
    let user = req.user;
    const { uniqueid } = req.body;
    try {
      let sql =
        "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE uniqueid = ? AND users_id = ?";
      let result = await mysqlcon(sql, [uniqueid, user.id]);
      return res.status(200).json({
        message: "Transection details are : ",
        data: result,
      });
    } catch (error) {
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    } 
  },

  downloadReport: async (req, res) => {
    let user = req.user;
    const { uniqueid } = req.body;
    try {
      if (uniqueid != undefined) {
        let sql =
          "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE uniqueid in (?) AND users_id = ?";
        let result = await mysqlcon(sql, [uniqueid, user.id]);
        if (result.length === 0) {
          res.status(201).json({ message: "No record found." });
        } else {
          return res.status(200).json({
            message: "Transection details are : ",
            data: result,
          });
        }
      } else {
        let sql =
          "SELECT uniqueid, created_on, utrnumber, creditacc, bank_name, amount, status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ?";
        let result = await mysqlcon(sql, [user.id]);
        if (result.length === 0) {
          return res.status(201).json({ message: "No record found." });
        } else {
          return res.status(200).json({
            message: "Transection details are : ",
            data: result,
          });
        }
      }
    } catch (error) {
      return res
        .status(201)
        .json({ status: false, message: "Some error occured", data: [] });
    } 
  },
};

module.exports = payoutMethods