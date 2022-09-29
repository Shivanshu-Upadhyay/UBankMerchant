const express = require('express');
const app = express();
const port = 9240;
const config = require('./config/config.js');
const cors = require("cors");

// Cors error
const corsOption = {
    credentials:true,
    origin: ["http://localhost:3000"],
  };
app.use(cors(corsOption));
app.use(express.urlencoded())
app.use(express.json())

// routing
app.use(require('./router/route'));

// run website
app.listen(port, (req, res) =>{
    
    console.log('http://' + config.DB_HOST + ':' + port);
});


