const mysqlcon = require("../../../config/db_connection");

let pagination = (total, page) => {
  let limit = 15;

  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;

  return { limit, start, numOfPages };
};
module.exports.defaultOrder = async function (req, res) {
  let user = req.user;
  try {
    let { orderNumber } = req.body;
    let sql;

    if (orderNumber) {
      sql =
        "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = ? AND order_no LIKE ?";
    } else {
      sql =
        "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = ?";
    }

    let result;
    if (orderNumber) {
      result = await mysqlcon(sql, [user.id, orderNumber + "%"]);
    } else {
      result = await mysqlcon(sql, [user.id]);
    }

    let total = result[0].Total;

    let Page = req.body.page ? Number(req.body.page) : 1;

    let page = pagination(total, Page);

    let sql1;
    if (orderNumber) {
      sql1 =
        "SELECT * FROM tbl_merchant_transaction WHERE user_id = ? AND order_no LIKE ? ORDER BY (CASE WHEN txn_id IS NULL THEN order_no ELSE txn_id END) DESC LIMIT ?,?";
    } else {
      sql1 =
        "SELECT * FROM tbl_merchant_transaction WHERE user_id = ? ORDER BY (CASE WHEN txn_id IS NULL THEN order_no ELSE txn_id END) DESC LIMIT ?,?";
    }

    let result1;
    if (orderNumber) {
      result1 = await mysqlcon(sql1, [
        user.id,
        orderNumber + "%",
        page.start,
        page.limit,
      ]);
    } else {
      result1 = await mysqlcon(sql1, [user.id, page.start, page.limit]);
    }

    if (result1.length === 0) {
      res.status(201).json({ message: "No record found." });
    } else {
      if (orderNumber) {
        return res.json(201, {
          message: "Record for order id " + orderNumber + " are " + `${total}`,
          data: {
            currentPage: Page,
            totalPages: page.numOfPages,
            deposits: result1,
          },
        });
      } else {
        return res.json(200, {
          message: `All Deposits Transactions are ${total}`,

          data: {
            currentPage: Page,
            totalPage: page.numOfPages,
            deposits: result1,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.downloadReports = async function (req, res) {
  let user = req.user;
  const { orderNumber } = req.body;
  try {
    if (orderNumber != undefined) {
      let sql =
        "SELECT * FROM tbl_merchant_transaction WHERE order_no in (?) AND user_id = ?";
      let result = await mysqlcon(sql, [orderNumber, user.id]);

      if (result.length === 0) {
        res.status(201).json({ message: "No record found." });
      } else {
        res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      }
    } else {
      let sql = "SELECT * FROM tbl_merchant_transaction WHERE user_id = ?";
      let result = await mysqlcon(sql, [user.id]);

      if (result.length === 0) {
        res.status(201).json({ message: "No record found." });
      } else {
        res.status(200).json({
          message: "Transection details are : ",
          data: result,
        });
      }
    }
  } catch (error) {
    res
      .status(201)
      .json({ status: false, message: "Some error occured", data: [] });
  } finally {
    console.log("Execution completed.");
  }
};

module.exports.statusResult = async function (req, res) {
  let user = req.user;

  try {
    let sql =
      "SELECT count(status) as count FROM tbl_merchant_transaction WHERE user_id = ?";

    let result = await mysqlcon(sql, [user.id]);

    let totalCount = result[0].count;

    let sql0 =
      "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=0";
    let sql1 =
      "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=1";
    let sql4 =
      "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=4";
    let sql5 =
      "SELECT COUNT(status) as count,SUM(ammount) as ammount FROM tbl_merchant_transaction WHERE user_id = ? AND status=5";

    let statusResult0 = await mysqlcon(sql0, [user.id]);
    let statusResult1 = await mysqlcon(sql1, [user.id]);
    let statusResult4 = await mysqlcon(sql4, [user.id]);
    let statusResult5 = await mysqlcon(sql5, [user.id]);

    let declinedCount = statusResult0[0].count;
    let successCount = statusResult1[0].count;
    let refundCount = statusResult4[0].count;
    let chargebackCount = statusResult5[0].count;

    let percentageD = await Math.round((declinedCount / totalCount) * 100);
    let percentageS = await Math.round((successCount / totalCount) * 100);
    let percentageR = await Math.round((refundCount / totalCount) * 100);
    let percentageC = await Math.round((chargebackCount / totalCount) * 100);

    if (totalCount === 0) {
      return res.json(201, {
        message: `User has no transaction`,
        data: [
          {
            name: "Declined",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Success",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Refund",
            percentage: 0,
            amount: 0,
          },
          {
            name: "Chargeback",
            percentage: 0,
            amount: 0,
          },
        ],
      });
    } else {
      return res.json(200, {
        message: `All Status Data`,
        data: [
          {
            name: "Declined",
            percentage: percentageD,
            amount: statusResult0[0].ammount,
          },
          {
            name: "Success",
            percentage: percentageS,
            amount: statusResult1[0].ammount,
          },
          {
            name: "Refund",
            percentage: percentageR,
            amount: statusResult4[0].ammount,
          },
          {
            name: "Chargeback",
            percentage: percentageC,
            amount: statusResult5[0].ammount,
          },
        ],
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occured",
      error: error,
    });
  }
};

module.exports.searchDateFilter = async function (req, res) {
  let user = req.user;

  try {
    let { date, from, to } = req.body;
    console.log(date, from, to);

    let sqld;

    if (!date) {
      sqld = " AND DATE(created_on) >= ? AND DATE(created_on) <= ?";
    } else {
      sqld = " AND DATE(created_on) = ?";
    }

    console.log(req.body.methodPayment);
    console.log(req.body.status);
    console.log(req.body.currency);

    if (
      req.body.methodPayment === undefined &&
      req.body.status === undefined &&
      req.body.currency === undefined
    ) {
      //    return res.redirect('/deposits/show_all');

      let sql =
        "SELECT COUNT(*) as Total FROM tbl_merchant_transaction where user_id = '" +
        user.id +
        "'";

      if (date || from || to) {
        sql += sqld;
      }

      let result;

      if (date) {
        result = await mysqlcon(sql, [date]);
      } else if (from !== undefined && to !== undefined) {
        result = await mysqlcon(sql, [from, to]);
      } else {
        result = await mysqlcon(sql);
      }

      let total = result[0].Total;
      let Page = req.body.page ? Number(req.body.page) : 1;

      let page = pagination(total, Page);

      let sql1 =
        "SELECT * FROM tbl_merchant_transaction where user_id = '" +
        user.id +
        "'";

      if (date || from || to) {
        sql1 += sqld;
      }

      sql1 +=
        " ORDER BY (CASE WHEN txn_id IS NULL THEN order_no ELSE txn_id END) DESC";
      sql1 += " LIMIT ?,?";

      let result1;

      if (date) {
        result1 = await mysqlcon(sql1, [date, page.start, page.limit]);
      } else if (from !== undefined && to !== undefined) {
        result1 = await mysqlcon(sql1, [from, to, page.start, page.limit]);
      } else {
        result1 = await mysqlcon(sql1, [page.start, page.limit]);
      }

      if (date || (from && to)) {
        return res.json(200, {
          message: `All Deposits Transactions are ${total} for date ${
            date ? date : `from ${from} to ${to}`
          } `,

          data: {
            currentPage: Page,
            totalPages: page.numOfPages,
            deposits: result1,
          },
        });
      } else {
        return res.json(200, {
          message: `All Deposits Transactions are ${total} `,

          data: {
            currentPage: Page,
            totalPages: page.numOfPages,
            deposits: result1,
          },
        });
      }
    }

    let sql;

    if (req.body.methodPayment !== undefined) {
      console.log(req.body.methodPayment.length);

      if (typeof req.body.methodPayment === "string") {
        sql = "";
        sql +=
          "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
          user.id +
          "' AND ";
        sql += "payment_type = ";
        sql += "'";
        sql += req.body.methodPayment;
        sql += "'";
      } else {
        sql = "";
        sql +=
          "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
          user.id +
          "' AND ";
        sql += "payment_type IN (";
        let methodR = req.body.methodPayment[0].split(",");
        for (let i = 0; i < methodR.length; i++) {
          sql += "'";
          sql += methodR[i];
          sql += "'";
          sql += ",";
        }
        sql = sql.slice(0, -1);
        sql += ")";
      }
    }

    if (req.body.status !== undefined) {
      if (typeof req.body.status === "string") {
        if (sql !== undefined) {
          sql += " AND ";
          sql += "status = ";
          sql += req.body.status;
        } else {
          sql = "";
          sql +=
            "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql += "status = ";
          sql += req.body.status;
        }
      } else {
        if (sql !== undefined) {
          sql += " AND ";
          sql += "status IN (";
          let statusR = req.body.status[0].split(",");
          for (let i = 0; i < statusR.length; i++) {
            sql += "'";
            sql += statusR[i];
            sql += "'";
            sql += ",";
          }
          sql = sql.slice(0, -1);
          sql += ")";
        } else {
          sql = "";
          sql +=
            "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql += "status IN (";
          // console.log(req.body.status[0]);
          let statusR = req.body.status[0].split(",");
          //  console.log(statusR);
          for (let i = 0; i < statusR.length; i++) {
            sql += "'";
            sql += statusR[i];
            sql += "'";
            sql += ",";
          }
          sql = sql.slice(0, -1);
          sql += ")";
        }
      }
    }

    if (req.body.currency !== undefined) {
      if (typeof req.body.currency === "string") {
        if (sql !== undefined) {
          sql += " AND ";
          sql += "ammount_type = ";
          sql += "'";
          sql += req.body.currency;
          sql += "'";
        } else {
          sql = "";
          sql +=
            "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql += "ammount_type = ";
          sql += "'";
          sql += req.body.currency;
          sql += "'";
        }
      } else {
        if (sql !== undefined) {
          sql += " AND ";
          sql += "ammount_type IN (";
          let currencyR = req.body.currency[0].split(",");
          for (let i = 0; i < currencyR.length; i++) {
            sql += "'";
            sql += currencyR[i];
            sql += "'";
            sql += ",";
          }
          sql = sql.slice(0, -1);
          sql += ")";
        } else {
          sql = "";
          sql +=
            "SELECT COUNT(*) as Total FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql += "ammount_type IN (";
          let currencyR = req.body.currency[0].split(",");
          for (let i = 0; i < currencyR.length; i++) {
            sql += "'";
            sql += currencyR[i];
            sql += "'";
            sql += ",";
          }
          sql = sql.slice(0, -1);
          sql += ")";
        }
      }
    }

    let result2;

    if (date || from || to) {
      sql += sqld;

      if (date) {
        result2 = await mysqlcon(sql, [date]);
      } else {
        result2 = await mysqlcon(sql, [from, to]);
      }
    } else {
      result2 = await mysqlcon(sql);
    }

    let total = result2[0].Total;

    let Page = req.body.page ? Number(req.body.page) : 1;

    let page = pagination(total, Page);

    let sql3;

    if (req.body.methodPayment !== undefined) {
      console.log(req.body.methodPayment.length);

      if (typeof req.body.methodPayment === "string") {
        sql3 = "";
        sql3 +=
          "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
          user.id +
          "' AND ";
        sql3 += "payment_type = ";
        sql3 += "'";
        sql3 += req.body.methodPayment;
        sql3 += "'";
      } else {
        console.log(req.body.methodPayment);
        sql3 = "";
        sql3 +=
          "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
          user.id +
          "' AND ";
        sql3 += "payment_type IN (";
        let methodPaymentR = req.body.methodPayment[0].split(",");
        for (let i = 0; i < methodPaymentR.length; i++) {
          sql3 += "'";
          sql3 += methodPaymentR[i];
          sql3 += "'";
          sql3 += ",";
        }
        sql3 = sql3.slice(0, -1);
        sql3 += ")";
      }
    }

    if (req.body.status !== undefined) {
      if (typeof req.body.status === "string") {
        if (sql3 !== undefined) {
          sql3 += " AND ";
          sql3 += "status = ";
          sql3 += req.body.status;
        } else {
          sql3 = "";
          sql3 +=
            "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql3 += "status = ";
          sql3 += req.body.status;
        }
      } else {
        if (sql3 !== undefined) {
          sql3 += " AND ";
          sql3 += "status IN (";
          let statusR = req.body.status[0].split(",");
          for (let i = 0; i < statusR.length; i++) {
            sql3 += "'";
            sql3 += statusR[i];
            sql3 += "'";
            sql3 += ",";
          }
          sql3 = sql3.slice(0, -1);
          sql3 += ")";
        } else {
          sql3 = "";
          sql3 +=
            "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql3 += "status IN (";
          let statusR = req.body.status[0].split(",");
          for (let i = 0; i < statusR.length; i++) {
            sql3 += "'";
            sql3 += statusR[i];
            sql3 += "'";
            sql3 += ",";
          }
          sql3 = sql3.slice(0, -1);
          sql3 += ")";
        }
      }
    }

    if (req.body.currency !== undefined) {
      if (typeof req.body.currency === "string") {
        if (sql3 !== undefined) {
          sql3 += " AND ";
          sql3 += "ammount_type = ";
          sql3 += "'";
          sql3 += req.body.currency;
          sql3 += "'";
        } else {
          sql3 = "";
          sql3 +=
            "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql3 += "ammount_type = ";
          sql3 += "'";
          sql3 += req.body.currency;
          sql3 += "'";
        }
      } else {
        if (sql3 !== undefined) {
          sql3 += " AND ";
          sql3 += "ammount_type IN (";
          let currencyR = req.body.currency[0].split(",");
          for (let i = 0; i < currencyR.length; i++) {
            sql3 += "'";
            sql3 += currencyR[i];
            sql3 += "'";
            sql3 += ",";
          }
          sql3 = sql3.slice(0, -1);
          sql3 += ")";
        } else {
          sql3 = "";
          sql3 +=
            "SELECT * FROM tbl_merchant_transaction WHERE user_id = '" +
            user.id +
            "' AND ";
          sql3 += "ammount_type IN (";
          let currencyR = req.body.currency[0].split(",");
          for (let i = 0; i < currencyR.length; i++) {
            sql3 += "'";
            sql3 += currencyR[i];
            sql3 += "'";
            sql3 += ",";
          }
          sql3 = sql3.slice(0, -1);
          sql3 += ")";
        }
      }
    }

    let result3;

    if (date || from || to) {
      sql3 += sqld;
      sql3 +=
        " ORDER BY (CASE WHEN txn_id IS NULL THEN order_no ELSE txn_id END) DESC";
      sql3 += " LIMIT " + page.start + "," + page.limit + "";

      if (date) {
        result3 = await mysqlcon(sql3, [date]);
      } else {
        result3 = await mysqlcon(sql3, [from, to]);
      }
    } else {
      sql3 +=
        " ORDER BY (CASE WHEN txn_id IS NULL THEN order_no ELSE txn_id END) DESC";
      sql3 += " LIMIT " + page.start + "," + page.limit + "";
      result3 = await mysqlcon(sql3);
    }

    if (date || (from && to)) {
      return res.json(200, {
        message: `Total Records are ${total} for date ${
          date ? date : `from ${from} to ${to}`
        } are ${total}`,
        data: {
          currentPage: Page,
          totalPages: page.numOfPages,
          sql3: sql3,
          deposits: result3,
        },
      });
    } else {
      return res.json(200, {
        message: `Total Records are ${total}`,
        data: {
          currentPage: Page,
          totalPages: page.numOfPages,
          sql3: sql3,
          deposits: result3,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occured",
      error: error,
    });
  }
};
