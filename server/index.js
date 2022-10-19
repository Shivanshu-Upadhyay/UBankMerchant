const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 9240;
const config = require("./config/config.js");
const cors = require("cors");
// Cors error

const corsOption = {
    credentials:true,
    origin:'http://localhost:3000'
  };
app.use(cors(corsOption));
app.use(express.urlencoded());
app.use(express.json());

// routing
app.use(require("./route/route"));

// run website
app.listen(process.env.PORT || PORT, (req, res) => {
  console.log("http://" + config.DB_HOST + ":" + PORT);
});
