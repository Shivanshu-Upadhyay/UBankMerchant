const mysqlcon = require("../../../config/db_connection");
class BusinesSetting {
  async default(req, res) {
    try {
      const { id } = req.user;
      const { tab } = req.body;
      switch (tab) {
        case "1": {
          const sql ="SELECT bname, trading_dba, blocation, busines_Code, busines_Country, fname, lname, main_contact_email FROM tbl_user WHERE id = ?";
          const sqlForCountry = "SELECT id,name, sortname FROM countries";
          const result = await mysqlcon(sql, [id]);
          const country = await mysqlcon(sqlForCountry);
          res.status(200).json({
            success: true,
            message: "Company Profile",
            result: result[0],
            country,
          });
          break;
        }
        case "2": {
          const sql ="SELECT  solution_apply_for_country, mode_of_solution FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Solution Apply for country",
            solution_apply_for_country:
              result[0].solution_apply_for_country.split(","),
            mode_of_solution: result[0].mode_of_solution.split(','),
          });
          break;
        }
        case "3": {
          const sql ="SELECT  director1_name, director1_dob, director1_nationality, director2_name, director2_dob, director2_nationality FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Director's Info",
            result:result[0]
          });
          break;
        }
        case "4": {
          const sql ="select shareholder1_name, shareholder1_dob, shareholder1_nationality, shareholder2_name, shareholder2_dob, shareholder2_nationality FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Shareholder Info",
            result: result[0],
          });
          break;
        }
        case "5": {
          const sql ="SELECT  website, job_title, company_estimated_monthly_volume, company_avarage_ticket_size FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Business Info",
            result: result[0],
          });
          break;
        }
        case "6": {
          const sql ="SELECT  settle_currency, wallet_url FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Settelment Info",
            result: result[0],
          });
          break;
        }
        case "7": {
          const sql = "SELECT  id, secretkey FROM tbl_user WHERE id = ?";
          const result = await mysqlcon(sql, [id]);
          res.status(200).json({
            success: true,
            message: "Keys",
            result: result[0],
          });
          break;
        }
        // case "8": {
        // const sql = "SELECT  id, secretkey FROM tbl_user WHERE id = ?";
        //   const result = await mysqlcon(sql, [id]);
        //   res.status(200).json({
        //     success: true,
        //     message: "Keys",
        //     result,
        //   });
        //   break;
        // }
        default:
          res.status(400).json({
            success: false,
            message: "somthing went wrong",
          });
          break;
      }
    } catch (err) {
      res.status(500).json({
        sussess: false,
        message: err,
      });
    }
  }
}

module.exports = new BusinesSetting();
