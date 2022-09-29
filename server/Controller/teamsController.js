const mysqlcon = require('../config/db_connection');
const emailvalidator = require("email-validator");
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted_date = dt.format('Y-m-d H:M:S');
const send_mail = require('../helper/send-mail')

let pagination = (total,page)=>{
    let limit = 15;

    let numOfPages = Math.ceil(total / limit)
    let start = ((page * limit) - (limit))

    return {limit,start,numOfPages}
}


module.exports.default = async function(req,res){

    try {

        let user = req.user;

        let sql = "SELECT COUNT(*) as Total FROM tbl_user_employee WHERE users_id = ?";

        let result = await mysqlcon(sql,[user.id]);

        let total = result[0].Total;

        let Page = req.body.page ? Number(req.body.page) : 1;

        let page = pagination(total,Page);


        let sql1 = "SELECT * FROM tbl_user_employee WHERE users_id = ? ORDER BY DATE(created_on) DESC LIMIT ?,?";

        let result1 =  await mysqlcon(sql1,[user.id,page.start,page.limit]);

        return res.json(200,{
            message:`Total Employee are ${total}`,
            currentPage:Page,
            totalPages:page.numOfPages,
            employee:result1
        })
        
    } catch (error) {

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }


}



module.exports.createEmployee = async function(req,res){

    try {

        let user = req.user;

        let { email,number,fname,lname,role } = req.body;

        if(!emailvalidator.validate(email)){

        }
        
        let sql = "SELECT email FROM tbl_user_employee WHERE users_id = ? && email = ?"

        // checking if email exist or not
        let result =  await mysqlcon(sql,[user.id,email]);

        if(result.length === 0){

                let sql1 = "SELECT mobile_no FROM tbl_user_employee WHERE users_id = ? && mobile_no = ?";
                
                // checking if mobile number exist or not
                let result1 =  await mysqlcon(sql1,[user.id,number]);

                // if email and mobile number both not exist than create row in the database
                if(result1.length === 0){

                        if(email && emailvalidator.validate(email)){

                            let details = {
                                email : email,
                                mobile_no : number,
                                name : `${fname} ${lname}`,
                                created_on : formatted_date,
                                updated_on : formatted_date,
                                users_id: user.id,
                                role:role,
                                status:0
    
                            }
    
                            let sql2 = "INSERT INTO tbl_user_employee SET ?";
    
                            let result2 = mysqlcon(sql2,details);
    
                            if(!result2){
                                return res.json(201,{
                                    message:'Error in Adding Employee',        
                                });  
                            }else{

                                if(role === '1'){
                                    role = 'Adminstrator'
                                }

                                if(role === '2'){
                                    role = 'Manager'
                                }


                                if(role === '3'){
                                    role = 'Cashier'
                                }

                                if(role === '4'){
                                    role = 'Reporter'
                                }
    

                                let name =  `${fname} ${lname}`;
                                send_mail.mail({email,number,name,role,subject:"Team Create"},'employee.ejs');
                                return res.json(200,{
                                    message:"Employee Added"
                                })
    
                            }

                        }
                        else{
                            return res.json(201,{
                                message:"Email Not Valid/Correct"
                            })
                        }                

                }
          
        }else{

            return res.json(200,{
                message:"Employee Email Already Exist"
            })

        }

        
        
    } catch (error) {
        return res.json(500,{
            message: "error occurered",
            error: error
        })
    }


}