const config = require("../../../config/config");
const mysqlcon = require('../../../config/db_connection');

const dashboardCount ={

payout: async (req,res)=>{
    let user = req.user;
try {
    let user_id = user.id;
    res.json({
        message: "err in finding payout" 
    })
    console.log('reached')
    // sql = "SELECT * FROM `tbl_icici_payout_transaction_response_details` WHERE users_id = ?"
    // let found = await mysqlcon.query(sql,user_id)
}

 catch (error) {
    return res.json({
        status: 400,
        message: "err in finding payout" 
    })
}
}

}

module.exports = dashboardCount;