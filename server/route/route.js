const loginController = require("../Controller/loginController.js");
const dashbordController = require("../Controller/dashbordController");
const payoutController = require("../Controller/payoutController");
const depositsController = require("../Controller/deposits_controller");
const settlementController = require("../Controller/settlementController");
const teamsController = require("../Controller/teamsController");
const statementController = require("../Controller/statementController");
const reportsController = require("../Controller/reportsController");
const invoiceController = require("../Controller/invoiceController");
const changePassController = require("../Controller/changePassController");
const BusinesSetting = require("../Controller/businesSetting");
const authMiddleware = require('../middleware/authMiddleware')
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
const username = require("../helper/username");
const dashboardCount = require("../Controller/dashbordController");
const subMerchant = require("../Controller/subMerchant.js");
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
  authMiddleware,
  loginController.company_profile
);

route.post(
  "/save_shareholder_info",
  uploads.none(),
  authMiddleware,
  loginController.save_shareholder_info
);
route.post(
  "/save_business_info",
  uploads.none(),
  authMiddleware,
  loginController.save_business_info
);
route.post(
  "/save_settelment_info",
  uploads.none(),
  authMiddleware,
  loginController.save_settelment_info
);

route.post("/login", uploads.none(), loginController.login);

// country of incorporation
route.post(
  "/country-list",
  uploads.none(),
  authMiddleware,
  loginController.get_countries
);
route.post(
  "/solution-apply",
  uploads.none(),
  authMiddleware,
  loginController.get_solution_apply
);
route.post(
  "/save-country-solution-apply",
  uploads.none(),
  authMiddleware,
  loginController.save_country_solution_apply
);
route.post(
  "/save-director-info",
  uploads.none(),
  authMiddleware,
  loginController.save_director_info
);

route.post("/qusAns", uploads.none(), authMiddleware, loginController.qusAns);

// dashboard controller

route.post(
  "/top_transaction_today",
  uploads.none(),
  authMiddleware,
  dashbordController.top_transaction_today
);

route.post(
  "/card_data",
  uploads.none(),
  authMiddleware,
  dashbordController.card_data
);

route.post(
  "/success_rate",
  uploads.none(),
  authMiddleware,
  dashbordController.success_rate
);
route.post(
  "/payment_type",
  uploads.none(),
  authMiddleware,
  dashbordController.payment_type
);
route.post(
  "/daily_sale_count_icon",
  uploads.none(),
  authMiddleware,
  dashbordController.daily_sale_count_icon
);
route.post(
  "/payout_icon",
  uploads.none(),
  authMiddleware,
  dashbordController.payout_icon
);
route.post(
  "/monthly_transaction",
  uploads.none(),
  authMiddleware,
  dashbordController.monthly_transaction
);
route.post(
  "/weekly_transaction",
  uploads.none(),
  authMiddleware,
  dashbordController.weekly_transaction
);
route.post(
  "/dbycurrency",
  uploads.none(),
  authMiddleware,
  dashbordController.dbycurrency
);

//deposits controller

route.post(
  "/show_all",
  uploads.none(),
  authMiddleware,
  depositsController.defaultOrder
);

route.get(
  "/downloadReports",
  uploads.none(),
  authMiddleware,
  depositsController.downloadReports
);

route.post(
  "/statusResult",
  uploads.none(),
  authMiddleware,
  depositsController.statusResult
);
route.post(
  "/searchDateFilter",
  uploads.none(),
  authMiddleware,
  depositsController.searchDateFilter
);

// Payout Router

route.post("/filter", uploads.none(), authMiddleware, payoutController.filter);
route.post(
  "/payoutheader",
  uploads.none(),
  authMiddleware,
  payoutController.payoutheader
);

// Settlement ___________________+++**&&*(())

route.post(
  "/settlemetnt_Trans",
  uploads.none(),
  authMiddleware,
  settlementController.settlemetnt_Trans
);
route.post(
  "/requestSettlement",
  uploads.none(),
  authMiddleware,
  settlementController.requestSettlement
);

// Statement Rout hai bahanchod????????????????????????????

route.post(
  "/statement",
  uploads.none(),
  authMiddleware,
  statementController.statement
);

// teams controller ==============================
route.post("/default", uploads.none(), authMiddleware, teamsController.default);
route.post(
  "/createEmployee",
  uploads.none(),
  authMiddleware,
  teamsController.createEmployee
);
module.exports = route;

// invoice
route.post(
  "/invoice",
  uploads.none(),
  authMiddleware,
  invoiceController.allInvoice
);
route.post(
  "/new_invoice",
  uploads.none(),
  authMiddleware,
  invoiceController.new_invoice
);

// Reports Controller
// route.post(
//   "/reports",
//   uploads.none(),
//   authMiddleware,
//   reportsController.reports
// );
route.post(
  "/changePassword-merchant",
  uploads.none(),
  authMiddleware,
  changePassController.changePassword
);


// reports abhineet
route.post(
  "/accountSummary",
  uploads.none(),
  authMiddleware,
  reportsController.accountSummary
);
route.post(
  "/defaultBusinesSettingData",
  uploads.none(),
  authMiddleware,
  BusinesSetting.default
);
route.post(
  "/toggleQNA",
  uploads.none(),
  authMiddleware,
  BusinesSetting.toggleQNA
);
route.post(
  "/blockToggle",
  uploads.none(),
  authMiddleware,
  BusinesSetting.blockToggle
);
route.post(
  "/BusnissDownload",
  uploads.none(),
  authMiddleware,
  BusinesSetting.download
);

route.post('/submerchant',authMiddleware,subMerchant.dafault)