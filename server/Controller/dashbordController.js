const config = require("../config/config");
const mysqlcon = require("../config/db_connection");

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
    let sql = "SELECT IF(ammount, 1, 1) as tbl, COUNT(ammount) as count,SUM(ammount) as amount, ammount_type as currency, (CASE WHEN hour(created_on) < 4 then '00-04' WHEN hour(created_on) >= 4 and hour(created_on) < 8 then '04-08' WHEN hour(created_on) >= 8 and hour(created_on) < 12 then '08-12' WHEN hour(created_on) >= 12 and hour(created_on) < 16 then '12-16' WHEN hour(created_on) >= 16 and hour(created_on) < 20 then '16-20' ELSE '20-24' END) AS hr FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND DATE(created_on) = DATE(NOW()) GROUP BY currency, hr UNION SELECT IF(amount, 2, 2) tbl, COUNT(amount), SUM(amount), currency,(CASE WHEN hour(created_on) < 4 then '00-04' WHEN hour(created_on) >= 4 and hour(created_on) < 8 then '04-08' WHEN hour(created_on) >= 8 and hour(created_on) < 12 then '08-12' WHEN hour(created_on) >= 12 and hour(created_on) < 16 then '12-16' WHEN hour(created_on) >= 16 and hour(created_on) < 20 then '16-20' ELSE '20-24' END) AS hr FROM `tbl_icici_payout_transaction_response_details` WHERE DATE(created_on) = DATE(NOW()) AND users_id = ? and status = 'SUCCESS' GROUP BY currency, hr";
    let sql1 = "SELECT * FROM tbl_user_settled_currency WHERE settled_currency = ?";
    let sql2 = "SELECT symbol FROM countries WHERE sortname = ?";
    try {
      let result = await mysqlcon(sql, [user.id, user.id]);
      let result1 = await mysqlcon(sql1, [user.settle_currency]);
      let result2 = await mysqlcon(sql2, [user.settle_currency == 'USDT' ? 'USD' :user.settle_currency]);
      let deposit_data = []
      let payout_data = []
      deposit_data[0] = result.filter((item) => item.hr === '00-04' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      deposit_data[1] = result.filter((item) => item.hr === '04-08' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      deposit_data[2] = result.filter((item) => item.hr === '08-12' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      deposit_data[3] = result.filter((item) => item.hr === '12-16' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      deposit_data[4] = result.filter((item) => item.hr === '16-20' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      deposit_data[5] = result.filter((item) => item.hr === '20-24' && item.tbl === 1).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      let dep_count = deposit_data.map((item, index) => (item.count));
      let dep_total = result2[0].symbol +" " + deposit_data.reduce((total, curr) => { return total += curr.amount }, 0).toFixed(2);

      payout_data[0] = result.filter((item) => item.hr === '00-04' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      payout_data[1] = result.filter((item) => item.hr === '04-08' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      payout_data[2] = result.filter((item) => item.hr === '08-12' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      payout_data[3] = result.filter((item) => item.hr === '12-16' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      payout_data[4] = result.filter((item) => item.hr === '16-20' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      payout_data[5] = result.filter((item) => item.hr === '20-24' && item.tbl === 2).reduce((acc, curr) => { acc.count += curr.count; acc.amount += curr.amount / (((result1.filter((item) => item.deposit_currency === curr.currency)[0]) ? (result1.filter((item) => item.deposit_currency === curr.currency)[0].rate) : 1)); return acc }, { count: 0, amount: 0 }, 0)
      let pay_count = payout_data.map((item, index) => (item.count));
      let pay_total = result2[0].symbol + " " + payout_data.reduce((total, curr) => { return total += curr.amount }, 0).toFixed(2);

      return res.status(200).json({
        status: true,
        message: "Deposit & Payout icon data - ",
        data: {
          dep_total: dep_total,
          dep_count: dep_count,
          pay_total: pay_total,
          pay_count: pay_count
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Error to complete task.', data: [] });
    }
  },
  daily_sale_count_icon: async (req, res) => {
    let user = req.user;
    let day = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
    let sql = "SELECT date_format(created_on,'%d-%m') as day, SUM(ammount) as total FROM tbl_merchant_transaction WHERE user_id = ? AND status = 1 AND DATE(created_on) >= DATE(NOW()) - INTERVAL 6 DAY GROUP BY day ORDER BY created_on ASC;";
    try {
        let result = await mysqlcon(sql, [user.id]);
        const dates = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return (("0" + (d.getDate())).slice(-2)+ "-" +   ("0" + (d.getMonth() + 1)).slice(-2)  + " " + day[d.getDay()]);
        })
        let data = {}
        dates.forEach(item => {
          let data1 = (result.filter((item1)=> item1.day === item.split(' ')[0] )[0])
          let data2 = (data1 ? data1 : 'daily_trnx');
          if (item.split(' ')[0] === data2.day){
            data[item] = data2.total
          }
          else{
            data[item] = 0
          } 
        });
      return res.status(200).json({
        status: true,
        message: "Daily Sales count - ",
        data: data
      });

    } catch (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Error to complete task.', data: [] });
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
