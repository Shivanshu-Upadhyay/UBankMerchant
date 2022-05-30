const mysqlcon = require("../config/db_connection");

const validateUserEmail = {
    validateEmail: async function(req, res, next){ 

        var email = req.body.email;
        console.log('emillll : ', email); 
        await  mysqlcon.query('SELECT * FROM tbl_user WHERE email = "'+email+'"', function(error, result){
            console.log('helper : ', result);
            req.email_available = result;
        });
        
        
        // req.email_available = 1;
        // if(req.body){
        //     var email = req.body.email; 
        //     if(email){
        //         mysqlcon.query("SELECT email from tbl_user WHERE email = " + email, function (error, results) {
        //             if (!results) {
        //                 req.email_available = 0;
        //             }           
        //         }); 
        //     }
        // } 
        next(); 
    }
}
module.exports = validateUserEmail;
