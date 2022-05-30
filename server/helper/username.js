
const mysqlcon = require("../config/db_connection");

const username = {
    create_username: async function(req, res, next){ 

        // var tusername = req.body.fname+'-'+req.body.lname;
        var tusername = 'ubankconnect';
        tusername = tusername.replace(/ |:|\+|\(|\)/gi, '-');

        var res_username = tusername;
        var arr_len = await checkusername(res_username);
        var inc = 0;
        // console.log('uname : ' + arr_len);
        if(arr_len != undefined){
            while(arr_len > 0){
                // console.log('entr---------');
                inc = inc + 1;
                tusername = res_username + inc;
                // console.log(tusername);
                arr_len = await  checkusername(tusername);
                // console.log('eere' + arr_len);
            } 
        }
        req.username = tusername;
        next(); 
    }
}
module.exports = username;


async function checkusername(req_username){
    mysqlcon.query('SELECT usercode from tbl_user WHERE usercode = "'+ req_username +'"', function (error, results) {
    if (error) return 1;
    // console.log(results.length);
        return results;
    });
}