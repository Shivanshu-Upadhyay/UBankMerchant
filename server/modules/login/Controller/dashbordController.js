const config = require("../../../config/config");
const mysqlcon = require("../../../config/db_connection");

const dashboardCount = {
  payout: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;
      res.json({
        message: "err in finding payout",
      });
      
    } catch (error) {
      return res.json({
        status: 400,
        message: "err in finding payout",
      });
    }
  },

  card_data: async function (req, res) {
    let user = req.user;
    let user_id = user.id;

    try {
      sql =
        "select i_flname,date_format(tbl_icici_payout_transaction_response_details.created_on,'%m/%Y') as date,i_email,ROUND(sum(ammount)) as deposit, ROUND(sum(amount)) as payout, ROUND(sum(settlementAmount)) as settlement, ROUND(sum(rolling_reverse_amount)) as roll_reverse, ROUND(sum(totalCharges)) as charges,wallet as avilable_amt from tbl_merchant_transaction INNER JOIN tbl_icici_payout_transaction_response_details on tbl_merchant_transaction.user_id = tbl_icici_payout_transaction_response_details.users_id INNER JOIN tbl_settlement on tbl_settlement.user_id = tbl_icici_payout_transaction_response_details.users_id INNER JOIN tbl_user on tbl_icici_payout_transaction_response_details.users_id=tbl_user.parent_id";
      // sql = "select i_flname,date_format(created_on,'%m/%Y') as date,ROUND(sum(ammount)) as deposit,i_email from tbl_icici_payout_transaction_response_details ";//where user_id = ? user_id

      let result = await mysqlcon(sql);

      return res.status(200).json({
        status: true,
        message: "data sent successfully",
        data: result,
      });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
      
    }
  },
  success_rate: async function (req, res) {
    let {id} = req.user;                      
    try {
      sql =
        "select status from  tbl_icici_payout_transaction_response_details where users_id = ? AND created_on > CURRENT_TIMESTAMP "; //WHERE users_id = ? user_id
      let result = await mysqlcon(sql,[id]);
      let total = result.length;
     if(total<1){
      return res.status(200).json({
        status: true,
        message: "data sent successfully",
        data: 0,
      });
     }

      let successCount = 0;
      for (let i = 0; i < total; i++) {
        if (result[i].status === "SUCCESS") {
          successCount += 1;
        }
      }
      successPercent = Math.round((successCount / total) * 100);
      res.status(200).json({
        status: true,
        message: "data sent successfully",
        data: successPercent,
      });
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } finally {
     
    }
  },
 
  //     let user = req.user;

  //     let today = Number(req.body.today); //? Number(req.body.today) : 1
  //     currencies = ['INR','CNY','IDR','THB','VND','USD','PHP','MYR']

  //     try {
  //         let sql;
  //         let message;
  //         // let sql = "SELECT id, name, IF(id, ?, ?) AS currency, (SELECT Sum(ammount) FROM  tbl_merchant_transaction WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 1 AND ammount_type = ? AND user_id = ?) AS deposite, (SELECT Sum(amount) FROM   tbl_icici_payout_transaction_response_details WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 'SUCCESS' AND currency = ? AND users_id = ?) AS payout, (SELECT Sum(settlementAmount) FROM   tbl_settlement WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 1 AND fromCurrency = ? AND user_id = ?)  AS settlement FROM tbl_user WHERE  id = ?";
  //         // let message = "Deposits By Currency - Today's data";
  //         data = [];
  //         if (today === 1){
  //             sql = "SELECT id, name, IF(id, ?, ?) AS currency, (SELECT Sum(ammount) FROM  tbl_merchant_transaction WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 1 AND ammount_type = ? AND user_id = ?) AS deposite, (SELECT Sum(amount) FROM   tbl_icici_payout_transaction_response_details WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 'SUCCESS' AND currency = ? AND users_id = ?) AS payout, (SELECT Sum(settlementAmount) FROM   tbl_settlement WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 0 day AND status = 1 AND fromCurrency = ? AND user_id = ?)  AS settlement FROM tbl_user WHERE  id = ?";
  //             message = "Deposits By Currency - Today's data";
  //         }
  //         if (today === 2){
  //             sql = "SELECT id, name, IF(id, ?, ?) AS currency, (SELECT Sum(ammount) FROM  tbl_merchant_transaction WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 6 day AND status = 1 AND ammount_type = ? AND user_id = ?) AS deposite, (SELECT Sum(amount) FROM   tbl_icici_payout_transaction_response_details WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 6 day AND status = 'SUCCESS' AND currency = ? AND users_id = ?) AS payout, (SELECT Sum(settlementAmount) FROM   tbl_settlement WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 6 day AND status = 1 AND fromCurrency = ? AND user_id = ?)  AS settlement FROM tbl_user WHERE  id = ?";
  //             message = "Deposits By Currency - Weekly data";
  //         }
  //         if (today === 3){
  //             sql = "SELECT id, name, IF(id, ?, ?) AS currency, (SELECT Sum(ammount) FROM  tbl_merchant_transaction WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 30 day AND status = 1 AND ammount_type = ? AND user_id = ?) AS deposite, (SELECT Sum(amount) FROM   tbl_icici_payout_transaction_response_details WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 30 day AND status = 'SUCCESS' AND currency = ? AND users_id = ?) AS payout, (SELECT Sum(settlementAmount) FROM   tbl_settlement WHERE  DATE(created_on) >= DATE(Now()) - INTERVAL 30 day AND status = 1 AND fromCurrency = ? AND user_id = ?)  AS settlement FROM tbl_user WHERE  id = ?";
  //             message = "Deposits By Currency - Monthly data";
  //         }
  //         for (let x = 0; x < currencies.length; x++) {
  //             currency = currencies[x];

  //             let result = await mysqlcon(sql, [currency, currency, currency, user.id, currency, user.id, currency, user.id, user.id]);
  //             result[0].net_balnce = result[0].deposite - result[0].payout;
  //             await data.push(result[0]);
  //         }
  //         return res.status(200).json({ status: true, message: message, data:data});
  //     }
  //     catch (Error) {
  //         console.log(Error)
  //         res.status(500).json({ status: false, message: 'Error to complete task.', Error });
  //     }
  //  
  // },
  top_transaction_today: async function (req, res) {
    let user = req.user;

    try {
      let { today, week, month } = req.body;

      let result;

      let sql;
      if (today) {
        sql =
          "(SELECT x.id, x.name,x.dt,x.time,x.method,x.amount,x.status,'payout' as icon FROM (SELECT users_id as id,customer_name as name, DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,trx_type as method,amount as amount,status as status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on) = DATE(NOW()) ORDER BY DATE(created_on) DESC) as x UNION ALL SELECT y.id,y.name,y.dt,y.time,y.method,y.amount,y.status,'deposit'as icon FROM (SELECT user_id as id,i_flname as name, DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,payment_type as method,ammount as amount,status as status FROM tbl_merchant_transaction WHERE user_id = ? AND  DATE(created_on) = DATE(NOW()) ORDER BY DATE(created_on) DESC) as y) ORDER BY DATE(dt) DESC";
      }

      //    let sql =  "(SELECT x.id, x.name,x.dt,x.amount,x.status,'payout' as icon FROM (SELECT users_id as id,customer_name as name, created_on as dt,amount as amount,status as status FROM tbl_icici_payout_transaction_response_details WHERE users_id =15 AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 365 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC LIMIT 0,15) as x UNION ALL SELECT y.id,y.name,y.dt,y.amount,y.status,'deposit'as icon FROM (SELECT user_id as id,i_flname as name, created_on as dt,ammount as amount,status as status FROM tbl_merchant_transaction WHERE user_id =15 AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 365 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC LIMIT 0,15) as y) ORDER BY DATE(dt) DESC";

      if (week) {
        sql =
          "(SELECT x.id, x.name,x.dt,x.time,x.method,x.amount,x.status,'payout' as icon FROM (SELECT users_id as id,customer_name as name, DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,trx_type as method,amount as amount,status as status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC) as x UNION ALL SELECT y.id,y.name,y.dt,y.time,y.method,y.amount,y.status,'deposit'as icon FROM (SELECT user_id as id,i_flname as name,DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,payment_type as method,ammount as amount,status as status FROM tbl_merchant_transaction WHERE user_id = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC) as y) ORDER BY DATE(dt) DESC";
      }

      if (month) {
        sql =
          "(SELECT x.id, x.name,x.dt,x.time,x.method,x.amount,x.status,'payout' as icon FROM (SELECT users_id as id,customer_name as name,DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,trx_type as method,amount as amount,status as status FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC) as x UNION ALL SELECT y.id,y.name,y.dt,y.time,y.method,y.amount,y.status,'deposit'as icon FROM (SELECT user_id as id,i_flname as name, DATE_FORMAT(created_on,'%D %M %Y') as dt,DATE_FORMAT(created_on,'%H:%i %p') as time,payment_type as method,ammount as amount,status as status FROM tbl_merchant_transaction WHERE user_id = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY) AND DATE(created_on) <= DATE(NOW()) ORDER BY DATE(created_on) DESC) as y) ORDER BY DATE(dt) DESC";
      }

      result = await mysqlcon(sql, [user.id, user.id]);

      if (result) {
        return res.json(200, {
          message: "take transaction",
          data: result,
        });
      } else {
        return res.json(201, {
          message: "No data Found",
        });
      }
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },
  payout_icon: async (req, res) => {
    let user = req.user;
    let Type = req.body.type;
    am = "";
    let tbl_name = "";
    if (Type === "payout") {
      tbl_name += "tbl_icici_payout_transaction_response_details";
      am += "amount";
    } else {
      tbl_name += "tbl_merchant_transaction";
      am += "ammount";
    }
    try {
      let user_id = user.id;
      // sql = "select (select count(*) from " + tbl_name + " where time(created_on) BETWEEN '00:00:01' and '04:00:00' and date(created_on)=date(now()) ) as first,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '04:00:01' and '08:00:00' and date(created_on)=date(now()) ) as second,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '08:00:01' and '12:00:00' and date(created_on)=date(now()) ) as third,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '12:00:01' and '16:00:00' and date(created_on)=date(now()) ) as fourth,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '16:00:01' and '20:00:00' and date(created_on)=date(now()) ) as fifth,(select count(*) from " + tbl_name + " where time(created_on) BETWEEN '20:00:01' and '24:00:00' and date(created_on)=date(now()) ) as sixth,(select sum(" + am + ") from " + tbl_name + " ) as total_payout,(select ROUND(sum(ammount)) from tbl_merchant_transaction) as total_deposit"

      sql =
        "select (select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '00:00:01' and '04:00:00' ) as first,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '04:00:01' and '08:00:00' ) as second,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '08:00:01' and '12:00:00' ) as third,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '12:00:01' and '16:00:00' ) as fourth,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '16:00:01' and '20:00:00' ) as fifth,(select count(*) from " +
        tbl_name +
        " where time(created_on) BETWEEN '20:00:01' and '24:00:00' ) as sixth,(select sum(" +
        am +
        ") from " +
        tbl_name +
        " ) as total_payout,(select ROUND(sum(ammount)) from tbl_merchant_transaction) as total_deposit";

      let found = await mysqlcon(sql, user_id);
      
      return res.json({
        status: 200,
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 400,
        message: "err in finding payout ",
        error,
      });
    }
  },
  daily_sale_count_icon: async (req, res) => {
    let user = req.user;
    try {
      let user_id = user.id;

      let Start = req.body.start_date;
      let End = req.body.end_dateDATE_S;
      sql =
        "select count(ammount) as no_of_transaction,SUBSTRING(DAYNAME(date(created_on)),1,3) as weekday,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN DATE_SUB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)";
      // sql ="select count(ammount) as no_of_transaction,if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=0,'Sun',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=1,'Mon',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=2,'Tue',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=3,'Wed',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=4,'Thu',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=5,'Fri',if(WEEKDAY(date_format(created_on,'%Y-%m-%d'))=6,'Sat',''))))))) as weekday,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN DATE_SUB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)"
      // let = sql = "SELECT sum(ammount) AS sale ,DATE(created_on) AS time FROM tbl_merchant_transaction WHERE user_id = ? AND DATE(created_on) BETWEEN ? AND ? GROUP by time(created_on)"

      let found = await mysqlcon(sql, [user_id, Start, End]);

      if (!found) {
        return res.status(201).json({ message: "not found" });
      }
      return res.status(200).json({
        message: "data recieved",
        data: found,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "err in finding payout ",
        error,
      });
    }
  },
  monthly_transaction: async (req, res) => {
    let user = req.user
    let sql = "SELECT IF(created_on, 1, 1) as tbl, MONTH(created_on) as month, SUM(ammount) as amount from tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND YEAR(created_on) = YEAR(NOW()) AND MONTH(created_on) >= 1  GROUP BY MONTH(created_on) UNION SELECT IF(created_on, 2, 2) as tbl, MONTH(created_on) as month, SUM(amount) as amount from tbl_icici_payout_transaction_response_details WHERE users_id = ? AND status= 'SUCCESS' AND YEAR(created_on) = YEAR(NOW()) AND MONTH(created_on) >= 1  GROUP BY MONTH(created_on);";
    try {
      let result = (await mysqlcon(sql, [user.id, user.id]));
      let deposit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let payout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (x in result) {
        if (result[x].tbl === 1) {
          deposit[(result[x].month) - 1] = Number(result[x].amount);
        }
        else {
          payout[(result[x].month) - 1] = Number(result[x].amount);
        }
      }
      return res.status(200).json({
        status: true,
        message: "Last 12 month Transections of deposit & payout ",
        data: {
          deposit: deposit,
          payout: payout
        }
      });
    }
    catch (Error) {
      console.log(Error)
      res.status(500).json({ status: false, message: 'Error to complete task.', Error });
    }
    finally {
      console.log("Execution completed.");
    }
  },

  weekly_transaction: async (req, res) => {
    let user = req.user;
    let sql = "SELECT IF(created_on, 1, 1) as tbl, WEEKDAY(created_on) as day, SUM(ammount) as amount FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND created_on >= NOW() - INTERVAL WEEKDAY(NOW()) DAY GROUP BY WEEKDAY(created_on) UNION SELECT IF(created_on, 2, 2) as tbl, WEEKDAY(created_on) as day, SUM(amount) as amount FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND status = 'SUCCESS' AND created_on >= NOW() - INTERVAL WEEKDAY(NOW()) DAY GROUP BY WEEKDAY(created_on)";
    try {
      let result = (await mysqlcon(sql, [user.id, user.id]));
      let deposit = [0, 0, 0, 0, 0, 0, 0];
      let payout = [0, 0, 0, 0, 0, 0, 0];
      for (x in result){
        if (result[x].tbl === 1) {
          deposit[result[x].day] = Number(result[x].amount);
        }
        else {
          payout[result[x].day] = Number(result[x].amount);
        }
      }
      return res.status(200).json({
        status: true,
        message: "Last week Transections of deposit & payout ",
        data: {
          deposit: deposit,
          payout: payout
        }
      });
      
    }
    catch (Error) {
      console.log(Error)
      res.status(500).json({ status: false, message: 'Error to complete task.', Error });
    }
    finally {
      console.log("Execution completed.");
    }
  },
  payment_type: async function (req, res) {
    let {id} = req.user;
    
    const currentdate     = new Date(); 
    try {
      sql = "select payment_type,ammount from tbl_merchant_transaction where users_id = ? AND created_on > CURRENT_TIMESTAMP";

      let result = await mysqlcon(sql,[id]);
      upi_amt = 0;
      wallet_amt = 0;
      card_amt = 0;
      netbanking_amt = 0;
      upi_count = 0;
      wallet_count = 0;
      card_count = 0;
      netbanking_count = 0;
      total_count = result.length;

      for (i of result) {
        if (
          i.payment_type === "CREDIT CARD" ||
          i.payment_type === "DEBIT CARD"
        ) {
          card_count += 1;
          card_amt += parseInt(i.ammount);
        } else if (i.payment_type === "UPI") {
          upi_count += 1;
          upi_amt += parseInt(i.ammount);
        } else if (i.payment_type === "NETBANKING") {
          netbanking_count += 1;
          netbanking_amt += parseInt(i.ammount);
        } else {
          wallet_count += 1;
          wallet_amt += parseInt(i.ammount);
        }
      }
      upi_percent = Math.round((upi_count / total_count) * 100);
      wallet_percent = Math.round((wallet_count / total_count) * 100);
      card_percent = Math.round((card_count / total_count) * 100);
      netbanking_percent = Math.round((netbanking_count / total_count) * 100);

      let data = {
        upi: { total: upi_amt, percent: upi_percent },
        card: { total: card_amt, percent: card_percent },
        wallet: { total: wallet_amt, percent: wallet_percent },
        netbanking: { total: netbanking_amt, percent: netbanking_percent },
      };

      res
        .status(200)
        .json({ status: true, message: "data sent successfully", data: data });
    } catch (Error) {
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },
  dbycurrency: async function (req, res) {
    let user = req.user;

    let curr = ["INR", "CNY", "IDR", "THB", "VND", "USD", "PHP", "MYR"];

    try {
      let { today, week, month } = req.body;

      let sql;

      let output = [];

      if (today) {
        for (let i = 0; i < curr.length; i++) {
          sql =
            "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND DATE(created_on) = DATE(NOW())) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND DATE(created_on) = DATE(NOW())) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND DATE(created_on) = DATE(NOW())) as settlementSum";

          let result = await mysqlcon(sql, [
            user.id,
            curr[i],
            user.id,
            curr[i],
            user.id,
            curr[i],
          ]);

          if (result.length !== 0) {
            output.push({
              currency: curr[i],
              depositSum: result[0].depositSum,
              payoutSum: result[0].payoutSum,
              settlementSum: result[0].settlementSum,
              net:
                result[0].depositSum +
                result[0].settlementSum -
                result[0].payoutSum,
            });
          }
        }

        return res.json(200, {
          message: "Today data",
          data: output,
        });
      }

      if (week) {
        for (let i = 0; i < curr.length; i++) {
          sql =
            "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 6 DAY)) as settlementSum";

          let result = await mysqlcon(sql, [
            user.id,
            curr[i],
            user.id,
            curr[i],
            user.id,
            curr[i],
          ]);

          if (result.length !== 0) {
            output.push({
              currency: curr[i],
              depositSum: result[0].depositSum,
              payoutSum: result[0].payoutSum,
              settlementSum: result[0].settlementSum,
              net:
                result[0].depositSum +
                result[0].settlementSum -
                result[0].payoutSum,
            });
          }
        }

        return res.json(200, {
          message: "Weekly data",
          data: output,
        });
      }

      if (month) {
        for (let i = 0; i < curr.length; i++) {
          sql =
            "SELECT (SELECT COALESCE(SUM(ammount),0) FROM tbl_merchant_transaction WHERE user_id = ? AND ammount_type = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as depositSum , (SELECT COALESCE(SUM(amount),0) FROM tbl_icici_payout_transaction_response_details WHERE users_id = ? AND currency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as payoutSum, (SELECT COALESCE(SUM(settlementAmount),0) FROM tbl_settlement WHERE user_id = ? AND fromCurrency = ? AND DATE(created_on) >= DATE_SUB(DATE(NOW()),INTERVAL 30 DAY)) as settlementSum";

          let result = await mysqlcon(sql, [
            user.id,
            curr[i],
            user.id,
            curr[i],
            user.id,
            curr[i],
          ]);

          if (result.length !== 0) {
            output.push({
              currency: curr[i],
              depositSum: result[0].depositSum,
              payoutSum: result[0].payoutSum,
              settlementSum: result[0].settlementSum,
              net:
                result[0].depositSum +
                result[0].settlementSum -
                result[0].payoutSum,
            });
          }
        }

        return res.json(200, {
          message: "Monthly data",
          data: output,
        });
      }
    } catch (Error) {
      console.log(Error);
      res
        .status(500)
        .json({ status: false, message: "Error to complete task.", Error });
    } 
  },
};

module.exports = dashboardCount;
