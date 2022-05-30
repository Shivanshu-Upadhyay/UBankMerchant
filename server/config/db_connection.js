const config = require("./config");
const util = require("util");

// Mongo DB Connection

// const mongoose = require("mongoose");
// var uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
// // if(config.DB_USERNAME != "" && config.DB_PASSWORD !=""){
// //     uri = `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
// // }
// mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true});
// module.exports = mongoose;

// Sql Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USERNAME,
    password : config.DB_PASSWORD,
    database : config.DB_NAME
});
connection.connect(function(err){
    if(err){
        console.log('error to connect database');
    }
    else{
        console.log('connection success to database');
    }
});
 

const query = util.promisify(connection.query).bind(connection);

module.exports = query;

 