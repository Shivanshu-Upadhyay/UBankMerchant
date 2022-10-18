const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 9240;
const config = require("./config/config.js");
const cors = require("cors");
// Cors error
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOption = {
    credentials:true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
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
