const loginController = require("../modules/login/Controller/loginController");
const dashbordController = require("../modules/login/Controller/dashbordController");
const payoutController = require("../modules/login/Controller/payoutController");
const depositsController = require("../modules/login/Controller/deposits_controller");
const settlementController = require("../modules/login/Controller/settlementController");
const teamsController = require("../modules/login/Controller/teamsController");
const statementController = require("../modules/login/Controller/statementController");
const reportsController = require("../modules/login/Controller/reportsController");
const invoiceController = require("../modules/login/Controller/invoiceController");
const changePassController = require("../modules/login/Controller/changePassController");

const route = require("express").Router();
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    let imgname = new Date().toString();
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.extname(file.originalname);
    let image = `${imgname}${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });

const helper = require("../helper/jwt");
const username = require("../helper/username");
const dashboardCount = require("../modules/login/Controller/dashbordController");
// const email_validate = require("../helper/email-validation");

const views = path.join(__dirname, "../views/");

// routes
route.get("/", (req, res) => {
  console.log(views);
  res.sendFile(views + "index.html");
});

route.post("/register", uploads.none(), loginController.register);
route.post(
  "/save-company-profile",
  uploads.none(),
  helper.verify,
  loginController.company_profile
);

route.post(
  "/save_shareholder_info",
  uploads.none(),
  helper.verify,
  loginController.save_shareholder_info
);
route.post(
  "/save_business_info",
  uploads.none(),
  helper.verify,
  loginController.save_business_info
);
route.post(
  "/save_settelment_info",
  uploads.none(),
  helper.verify,
  loginController.save_settelment_info
);

route.post("/login", uploads.none(), loginController.login);

// country of incorporation
route.post(
  "/country-list",
  uploads.none(),
  helper.verify,
  loginController.get_countries
);
route.post(
  "/solution-apply",
  uploads.none(),
  helper.verify,
  loginController.get_solution_apply
);
route.post(
  "/save-country-solution-apply",
  uploads.none(),
  helper.verify,
  loginController.save_country_solution_apply
);
route.post(
  "/save-director-info",
  uploads.none(),
  helper.verify,
  loginController.save_director_info
);

route.post("/qusAns", uploads.none(), helper.verify, loginController.qusAns);

// dashboard controller

route.post(
  "/top_transaction_today",
  uploads.none(),
  helper.verify,
  dashbordController.top_transaction_today
);

route.post(
  "/card_data",
  uploads.none(),
  helper.verify,
  dashbordController.card_data
);

route.post(
  "/success_rate",
  uploads.none(),
  helper.verify,
  dashbordController.success_rate
);
route.post(
  "/payment_type",
  uploads.none(),
  helper.verify,
  dashbordController.payment_type
);
route.post(
  "/daily_sale_count_icon",
  uploads.none(),
  helper.verify,
  dashbordController.daily_sale_count_icon
);
route.post(
  "/payout_icon",
  uploads.none(),
  helper.verify,
  dashbordController.payout_icon
);
route.post(
  "/monthly_transaction",
  uploads.none(),
  helper.verify,
  dashbordController.monthly_transaction
);
route.post(
  "/weekly_transaction",
  uploads.none(),
  helper.verify,
  dashbordController.weekly_transaction
);
route.post(
  "/dbycurrency",
  uploads.none(),
  helper.verify,
  dashbordController.dbycurrency
);

//deposits controller

route.post(
  "/show_all",
  uploads.none(),
  helper.verify,
  depositsController.defaultOrder
);

route.get(
  "/downloadReports",
  uploads.none(),
  helper.verify,
  depositsController.downloadReports
);

route.post(
  "/statusResult",
  uploads.none(),
  helper.verify,
  depositsController.statusResult
);
route.post(
  "/searchDateFilter",
  uploads.none(),
  helper.verify,
  depositsController.searchDateFilter
);

// Payout Router

route.post("/filter", uploads.none(), helper.verify, payoutController.filter);
route.post(
  "/payoutheader",
  uploads.none(),
  helper.verify,
  payoutController.payoutheader
);

// Settlement ___________________+++**&&*(())

route.post(
  "/settlemetnt_Trans",
  uploads.none(),
  helper.verify,
  settlementController.settlemetnt_Trans
);
route.post(
  "/requestSettlement",
  uploads.none(),
  helper.verify,
  settlementController.requestSettlement
);

// Statement Rout hai bahanchod????????????????????????????

route.post(
  "/statement",
  uploads.none(),
  helper.verify,
  statementController.statement
);

// teams controller ==============================
route.post("/default", uploads.none(), helper.verify, teamsController.default);
route.post(
  "/createEmployee",
  uploads.none(),
  helper.verify,
  teamsController.createEmployee
);
module.exports = route;

// invoice
route.post(
  "/invoice",
  uploads.none(),
  helper.verify,
  invoiceController.allInvoice
);
route.post(
  "/new_invoice",
  uploads.none(),
  helper.verify,
  invoiceController.new_invoice
);

// Reports Controller
// route.post(
//   "/reports",
//   uploads.none(),
//   helper.verify,
//   reportsController.reports
// );
route.post(
  "/changePassword-merchant",
  uploads.none(),
  helper.verify,
  changePassController.changePassword
);


// reports abhineet
route.post(
  "/accountSummary",
  uploads.none(),
  helper.verify,
  reportsController.accountSummary
);