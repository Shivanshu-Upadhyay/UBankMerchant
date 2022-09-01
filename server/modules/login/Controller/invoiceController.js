const mysqlcon = require("../../../config/db_connection");
const dateTime = require("node-datetime");
const { localsName } = require("ejs");
const Date = dateTime.create();
const date_format = Date.format("dmy");

let pagination = (total, page) => {
  let limit = 15;
  let numOfPages = Math.ceil(total / limit);
  let start = page * limit - limit;
  return { limit, start, numOfPages };
};

const Invoice = {
  allInvoice: async (req, res) => {
    let user = req.user;
    let merchant_id = user.id;
    let { from, to, date, paid, unpaid, pending, overdue } = req.body;

    

    try {
      //icon
      // getting paid unpaid and due ammount
      let sql =
        "SELECT count(*) as all_invoice,(SELECT sum(amount) FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = 1) as paid_ammount, (SELECT sum(amount) FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = 0) as unpaid_amount,(SELECT sum(amount) FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = 0 AND date(due_date) < date(now()) ) as due_amount FROM tbl_user_invoice WHERE merchant_id = ?";

      let icon = await mysqlcon(sql, [
        merchant_id,
        merchant_id,
        merchant_id,
        merchant_id,
      ]);

      //page
      // pagination(icon[0].all_invoice,req.body.page);

      let sqld;

      if (date) {
        sqld = "";

        sqld += " AND DATE(created_on) = '" + date + "'";
      } else {
        sqld = "";

        sqld +=
          " AND DATE(created_on) >= '" +
          from +
          "' AND DATE(created_on) <= '" +
          to +
          "'";
      }

      let sql2;

      if (paid && !unpaid && !pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = 1";
        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && unpaid && !pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status = 0";
        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && !unpaid && pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status  NOT IN (1,0) AND DATE(due_date) <= DATE(now())";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && !unpaid && !pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status  NOT IN (1, 0) AND DATE(due_date) > DATE(now())";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && unpaid && !pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND pay_status IN (1, 0)";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && !unpaid && pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND (pay_status IN (1) OR (pay_status NOT IN (0,1) AND DATE(due_date) >= DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && !unpaid && !pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND (pay_status IN (1) OR (pay_status NOT IN (0,1) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && unpaid && pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND (pay_status IN (0) OR (pay_status NOT IN (0,1) AND DATE(due_date) >= DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && unpaid && !pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (0) OR (pay_status IN (0,1) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && !unpaid && pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( (pay_status  NOT IN (1, 0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && unpaid && pending && !overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (1, 0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && !unpaid && pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (1) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && unpaid && !pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (1,0) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (!paid && unpaid && pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (paid && unpaid && pending && overdue) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ? AND ( pay_status IN (1,0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";

        if (date || from || to) {
          sql2 += sqld;
        }
      } else if (date || from || to) {
        sql2 = "";
        sql2 +=
          "SELECT COUNT(*) AS Total FROM tbl_user_invoice WHERE merchant_id = ?";
        sql2 += sqld;
      }

      let total;
      let result2;

      if (paid || unpaid || pending || overdue || date || from || to) {
        result2 = await mysqlcon(sql2, [merchant_id]);
        total = result2[0].Total;
      } else {
        total = icon[0].all_invoice;
      }

      let Page = req.body.page ? Number(req.body.page) : 1;

      let page = pagination(total, Page);

      //data
      let sql1 =
        "SELECT invoice_no,send_date,due_date,email,amount,tax_amount,pay_status,created_on FROM tbl_user_invoice where merchant_id = ?";

      if (paid && !unpaid && !pending && !overdue) {
        sql1 += " AND pay_status = 1";

        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && unpaid && !pending && !overdue) {
        sql1 += " AND pay_status = 0";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && !unpaid && pending && !overdue) {
        sql1 +=
          " AND pay_status  NOT IN (1, 0) AND DATE(due_date) <= DATE(now())";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && !unpaid && !pending && overdue) {
        sql1 +=
          " AND pay_status  NOT IN (1, 0) AND DATE(due_date) > DATE(now())";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && unpaid && !pending && !overdue) {
        sql1 += " AND pay_status IN (1, 0)";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && !unpaid && pending && !overdue) {
        sql1 +=
          " AND (pay_status IN (1) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && !unpaid && !pending && overdue) {
        sql1 +=
          " AND (pay_status IN (1) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && unpaid && pending && !overdue) {
        sql1 +=
          " AND (pay_status IN (0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && unpaid && !pending && overdue) {
        sql1 +=
          " AND (pay_status IN (0) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && !unpaid && pending && overdue) {
        sql1 +=
          " AND ( (pay_status NOT IN (1, 0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && unpaid && pending && !overdue) {
        sql1 +=
          " AND (pay_status IN (1,0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && !unpaid && pending && overdue) {
        sql1 +=
          " AND (pay_status IN (1) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && unpaid && !pending && overdue) {
        sql1 +=
          " AND ( pay_status IN (1,0) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (!paid && unpaid && pending && overdue) {
        sql1 +=
          " AND ( pay_status IN (0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (paid && unpaid && pending && overdue) {
        sql1 +=
          " AND ( pay_status IN (1,0) OR (pay_status NOT IN (1,0) AND DATE(due_date) >= DATE(now())) OR (pay_status NOT IN (1,0) AND DATE(due_date) < DATE(now())) )";
        if (date || from || to) {
          sql1 += sqld;
        }
      } else if (date || from || to) {
        if (date || from || to) {
          sql1 += sqld;
        }
      }

      sql1 += " LIMIT ?,?";

      let data = await mysqlcon(sql1, [merchant_id, page.start, page.limit]);

      return res.json(200, {
        message: "settelment transaston",
        card: [
          {
            name: "All Invoice",
            amount: icon[0].all_invoice,
            percentage: 32,
          },

          { name: "Paid Amount", amount: icon[0].paid_ammount, percentage: 40 },

          {
            name: "Unpaid Ammount",
            amount: icon[0].unpaid_amount,
            percentage: 60,
          },
          {
            name: "Due Ammount",
            amount: icon[0].Datedue_amount,
            percentage: 20,
          },
        ],

        currentPage: Page,
        totalPages: page.numOfPages,
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

  new_invoice: async (req, res) => {
    let user = req.user;
    let request = req.body;
    console.log(Date._now);
    let new_invoice;

    try {
      if (!request.taxable) {
        new_invoice = {
          merchant_id: user.id,
          invoice_no: request.invoice_no,
          send_date: request.send_date,
          due_date: request.due_date,
          fname: request.fname,
          lname: request.lname,
          email: request.email,
          amount: request.amount,
          currency: request.currency,
          description: request.description,
        };
      } else {
        new_invoice = {
          merchant_id: user.id,
          invoice_no: request.invoice_no,
          send_date: request.send_date,
          due_date: request.due_date,
          fname: request.fname,
          lname: request.lname,
          email: request.email,
          amount: request.amount,
          currency: request.currency,
          tax_amount: (request.amount * request.tax) / 100,
          description: request.description,
        };
      }

      let sql = "INSERT INTO tbl_user_invoice SET ?";

      let inserted = await mysqlcon(sql, [new_invoice]);

      return res.status(200).json({
        inserted,
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

module.exports = Invoice;
