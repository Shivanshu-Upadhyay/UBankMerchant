const jwt = require('jsonwebtoken')
const config = require("../config/config");
const mysqlcon = require('../config/db_connection');

const authMiddleware = async(req,res,next)=>{
    try {
        const {authorization} = req.headers
        if(!authorization)return res.status(404).json({message:"JWT Not Found💀"})
        const Token = authorization.replace('Bearer ','')
        const {id} = jwt.verify(Token,config.JWT_SECRET);
        const userData = await mysqlcon('SELECT * FROM tbl_user WHERE id = ?',[id])
        req.user = userData[0]
        next()
    } catch (error) {
       res.status(401).json({
        error
       }) 
    }
  
}

module.exports = authMiddleware