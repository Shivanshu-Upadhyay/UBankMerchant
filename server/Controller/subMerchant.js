const mysqlcon = require("../config/db_connection");

class SubMerchant {
   async dafault(req,res){
       try {
        const {id} = req.user
        const sql = 'SELECT  id, status, account_type,fname,lname,parent_id,email,created_on,mobile_no,allow_webpayment,settle_currency,bname,busines_City,job_title,website from tbl_user where parent_id = ? And account_type =0'
      let data=  await mysqlcon(sql,[id])
      res.status(200).json({
        data
      })
       } catch (error) {
        res.status(500).json({message:"Somthing Went wrong",error})
       }
    }
}

module.exports = new SubMerchant