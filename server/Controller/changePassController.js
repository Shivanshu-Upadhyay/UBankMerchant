const jwt = require("jsonwebtoken");
var md5 = require("md5");
const config = require("../config/config");
const mysqlcon = require("../config/db_connection");
module.exports.changePassword = async function (req, res) {
  try {
    let { oldPassword, newPassword, confirmPassword, token } = req.body;
    jwt.verify(token, config.JWT_SECRET, async (err, payload) => {
      let id = payload.id;
      if (oldPassword && newPassword && confirmPassword) {
        if (newPassword !== oldPassword) {
          if (newPassword === confirmPassword) {
            let userSql = "SELECT * FROM  tbl_user WHERE id = ?";
            let userData = await mysqlcon(userSql, [id]);
           
            oldPassword = md5(oldPassword);
            newPassword = md5(newPassword);
            confirmPassword = md5(confirmPassword);

            if (userData.length > 0) {
              if (userData[0].password === oldPassword) {
                let password1 = userData[0].password;
                let password2 = userData[0].password1
                  ? userData[0].password1
                  : null;
                let password3 = userData[0].password2
                  ? userData[0].password2
                  : null;

                let sql = `UPDATE tbl_user SET password = ? ,password1 = ? , password2 = ? , password3=?  where id = ?`;
                let result = await mysqlcon(sql, [
                  newPassword,
                  password1,
                  password2,
                  password3,
                  id,
                ]);
                return res.json(200, {
                  message: "Password Change Successfully✅",
                  
                });
              } else {
                res.json(201, {
                  message: "Old password is wrong",
                });
              }
            } else {
              return res.json(201, {
                message: "Password Change Failed❌",
              });
            }
          } else {
            return res.json(201, {
              message: "New Password and Confirm Password does not match",
            });
          }
        } else {
          return res.json(201, {
            message: "New Password and Old Password is Same",
          });
        }
      } else {
        return res.status(201).json({
          message: "Please fill all the fields",
        });
      }
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
