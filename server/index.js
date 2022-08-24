const express = require('express');
const app = express();
const port = 9240;
const config = require('./config/config.js');
const cors = require("cors");

// Cors error
 
app.use(cors());
app.use(express.urlencoded())
app.use(express.json())

// routing
app.use(require('./route/route'));

// run website
app.listen(port, (req, res) =>{
    
    console.log('http://' + config.DB_HOST + ':' + port);
});


