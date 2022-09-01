const mjwt = require("jsonwebtoken");
const config = require("../config/config");
const mysqlcon = require('../config/db_connection');
const jwt = {
    verify:function(req,res,next){
        if("authorization" in req.headers){
            let token  = req.headers.authorization.split("Bearer ")[1];
            mjwt.verify(token,config.JWT_SECRET,async (err,payload)=>{
                if(err) return res.send(err);
                let id  = payload.id; 
                console.log(id);
                mysqlcon('SELECT * FROM tbl_user WHERE id = ?', [id], (err, results) => {
                    if(err){
                        res.status(201).json({status:false, message:'Authentication Failed', data: []});  
                    }
                    else{
                        req.user = results[0];
                        next(); 
                    }
                }); 
            })
        }
        else{
            res.status(201).json({status:false, message:'Authorization not found.', data: [] });
        }
    }
}

module.exports = jwt;