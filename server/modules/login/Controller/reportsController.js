const mysqlcon = require('../../../config/db_connection');

function calculateDeposit(data) {
    // tax amount+ payin harges + our bank charges + rolling + our bank charge gst 
    //currencies = ['INR','CNY','IDR','THB','VND','USD','PHP','MYR']
    let commission_INR = 0;
    let refund_INR = 0;
    let chargeback_INR = 0;
    let count_INR = 0;
    let amount_INR = 0;

    let commission_CNY = 0;
    let refund_CNY = 0;
    let chargeback_CNY = 0;
    let count_CNY = 0;
    let amount_CNY = 0;

    let commission_IDR = 0;
    let refund_IDR = 0;
    let chargeback_IDR = 0;
    let count_IDR = 0;
    let amount_IDR = 0;

    let commission_THB = 0;
    let refund_THB = 0;
    let chargeback_THB = 0;
    let count_THB = 0;
    let amount_THB = 0;

    let commission_VND = 0;
    let refund_VND = 0;
    let chargeback_VND = 0;
    let count_VND = 0;
    let amount_VND = 0;

    let commission_USD = 0;
    let refund_USD = 0;
    let chargeback_USD = 0;
    let count_USD = 0;
    let amount_USD = 0;

    let commission_PHP = 0;
    let refund_PHP = 0;
    let chargeback_PHP = 0;
    let count_PHP = 0;
    let amount_PHP = 0;

    let commission_MYR = 0;
    let refund_MYR = 0;
    let chargeback_MYR = 0;
    let count_MYR = 0;
    let amount_MYR = 0;

    for (x = 0; x < data.length; x++) {
        if (data[x].ammount_type === "INR") {
            count_INR += 1;
            amount_INR += Number(data[x].ammount);
            commission_INR += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_INR += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_INR += Number(data[x].ammount)
            }
        }
        if (data[x].ammount_type === "CNY") {
            count_CNY += 1;
            amount_CNY += Number(data[x].ammount);
            commission_CNY += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_CNY += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_CNY += Number(data[x].ammount)
            }

        }
        if (data[x].ammount_type === "IDR") {
            count_IDR += 1;
            amount_IDR += Number(data[x].ammount);
            commission_IDR += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_IDR += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_IDR += Number(data[x].ammount)
            }
        }
        if (data[x].ammount_type === "THB") {
            count_THB += 1;
            amount_THB += Number(data[x].ammount);
            commission_THB += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_THB += Number(data[x].ammount) 
            }
            if (data[x].status === 5) {
                chargeback_THB += Number(data[x].ammount) 
            }
        }
        if (data[x].ammount_type === "VND") {
            count_VND += 1;
            amount_VND += Number(data[x].ammount);
            commission_VND += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_VND += Number(data[x].ammount) 
            }
            if (data[x].status === 5) {
                chargeback_VND += Number(data[x].ammount)
            }
        }

        if (data[x].ammount_type === "USD") {
            count_USD += 1;
            amount_USD += Number(data[x].ammount);
            commission_USD += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_USD += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_USD += Number(data[x].ammount)
            }
        }
        if (data[x].ammount_type === "PHP") {
            count_PHP += 1;
            amount_PHP += Number(data[x].ammount);
            commission_PHP += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_PHP += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_PHP += Number(data[x].ammount)
            }
        }
        if (data[x].ammount_type === "MYR") {
            count_MYR += 1;
            amount_MYR += Number(data[x].ammount);
            commission_MYR += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst)
            if (data[x].status === 4) {
                refund_MYR += Number(data[x].ammount)
            }
            if (data[x].status === 5) {
                chargeback_MYR += Number(data[x].ammount)
            }
        }
    }
    return [
        { currency: "INR", amount: amount_INR.toFixed(2), count: count_INR, commission: commission_INR.toFixed(2), refund: refund_INR.toFixed(2), chargeback: chargeback_INR.toFixed(2) },
        { currency: "CNY", amount: amount_CNY.toFixed(2), count: count_CNY, commission: commission_CNY.toFixed(2), refund: refund_CNY.toFixed(2), chargeback: chargeback_CNY.toFixed(2) },
        { currency: "IDR", amount: amount_IDR.toFixed(2), count: count_IDR, commission: commission_IDR.toFixed(2), refund: refund_IDR.toFixed(2), chargeback: chargeback_IDR.toFixed(2) },
        { currency: "THB", amount: amount_THB.toFixed(2), count: count_THB, commission: commission_THB.toFixed(2), refund: refund_THB.toFixed(2), chargeback: chargeback_THB.toFixed(2) },
        { currency: "VND", amount: amount_VND.toFixed(2), count: count_VND, commission: commission_VND.toFixed(2), refund: refund_VND.toFixed(2), chargeback: chargeback_VND.toFixed(2) },
        { currency: "USD", amount: amount_USD.toFixed(2), count: count_USD, commission: commission_USD.toFixed(2), refund: refund_USD.toFixed(2), chargeback: chargeback_USD.toFixed(2) },
        { currency: "PHP", amount: amount_PHP.toFixed(2), count: count_PHP, commission: commission_PHP.toFixed(2), refund: refund_PHP.toFixed(2), chargeback: chargeback_PHP.toFixed(2) },
        { currency: "MYR", amount: amount_MYR.toFixed(2), count: count_MYR, commission: commission_MYR.toFixed(2), refund: refund_MYR.toFixed(2), chargeback: chargeback_MYR.toFixed(2) }
    ]
}
function calculatePayout(data) {
    // gst amount + aknto charge
    //currencies = ['INR','CNY','IDR','THB','VND','USD','PHP','MYR']
    let count_INR = 0;
    let commission_INR = 0;
    let amount_INR = 0;

    let count_CNY = 0;
    let commission_CNY = 0;
    let amount_CNY = 0;

    let count_IDR = 0;
    let commission_IDR = 0;
    let amount_IDR = 0;

    let count_THB = 0;
    let commission_THB = 0;
    let amount_THB = 0;

    let count_VND = 0;
    let commission_VND = 0;
    let amount_VND = 0;

    let count_USD = 0;
    let commission_USD = 0;
    let amount_USD = 0;

    let count_PHP = 0;
    let commission_PHP = 0;
    let amount_PHP = 0;

    let count_MYR = 0;
    let commission_MYR = 0;
    let amount_MYR = 0;

    for (x = 0; x < data.length; x++) {
        if (data[x].currency === "INR") {
            count_INR += 1;
            amount_INR += Number(data[x].amount);
            commission_INR += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "CNY") {
            count_CNY += 1;
            amount_CNY += Number(data[x].amount);
            commission_CNY += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "IDR") {
            count_IDR += 1;
            amount_IDR += Number(data[x].amount);
            commission_IDR += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "THB") {
            count_THB += 1;
            amount_THB += Number(data[x].amount);
            commission_THB += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "VND") {
            count_VND += 1;
            amount_VND += Number(data[x].amount);
            commission_VND += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "USD") {
            count_USD += 1;
            amount_USD += Number(data[x].amount);
            commission_USD += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "PHP") {
            count_PHP += 1;
            amount_PHP += Number(data[x].amount);
            commission_PHP += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
        if (data[x].currency === "MYR") {
            count_MYR += 1;
            amount_MYR += Number(data[x].amount);
            commission_MYR += Number(data[x].gst_amount) + Number(data[x].akonto_charge);
        }
    }
    return [
        { currency: "INR", amount: amount_INR.toFixed(2), count: count_INR, commission: commission_INR.toFixed(2) },
        { currency: "CNY", amount: amount_CNY.toFixed(2), count: count_CNY, commission: commission_CNY.toFixed(2) },
        { currency: "IDR", amount: amount_IDR.toFixed(2), count: count_IDR, commission: commission_IDR.toFixed(2) },
        { currency: "THB", amount: amount_THB.toFixed(2), count: count_THB, commission: commission_THB.toFixed(2) },
        { currency: "VND", amount: amount_VND.toFixed(2), count: count_VND, commission: commission_VND.toFixed(2) },
        { currency: "USD", amount: amount_USD.toFixed(2), count: count_USD, commission: commission_USD.toFixed(2) },
        { currency: "PHP", amount: amount_PHP.toFixed(2), count: count_PHP, commission: commission_PHP.toFixed(2) },
        { currency: "MYR", amount: amount_MYR.toFixed(2), count: count_MYR, commission: commission_MYR.toFixed(2) }
    ]

}
function calculateSettlement(data) {
    // commission = charges
    //Settlement Type = ['CRYPTO','FIAT']
    let count_FAIT = 0;
    let commission_FIAT = 0;
    let requested_Amount_FIAT = 0;

    let count_CRYPTO = 0;
    let commission_CRYPTO = 0;
    let requested_Amount_CRYPTO = 0;

    for (x = 0; x < data.length; x++) {
        if (data[x].settlementType === "FIAT") {
            count_FAIT += 1;
            commission_FIAT += data[x].charges;
            requested_Amount_FIAT += data[x].requestedAmount;

        }
        if (data[x].settlementType === "CRYPTO") {
            count_CRYPTO += 1
            commission_CRYPTO += data[x].charges;
            requested_Amount_CRYPTO += data[x].requestedAmount;
        }
    }
    return [
        { sttlementType: "FIAT", requested_Amount: requested_Amount_FIAT, count: count_FAIT, commission: commission_FIAT },
        { sttlementType: "CRYPTO", requested_Amount: requested_Amount_CRYPTO, count: count_CRYPTO, commission: commission_CRYPTO }
    ]


}
// function calculatePayout2(data) {
//     // UPI, NetBanking, Wallet, DebitCard, CreditCard, Cash
//     let count_UPI = 0;
//     let commission_UPI = 0;
//     let amount_UPI = 0;

//     let count_NetBanking = 0;
//     let commission_NetBanking = 0;
//     let amount_NetBanking = 0;

//     let count_Wallet = 0;
//     let commission_Wallet = 0;
//     let amount_Wallet = 0;

//     let count_DebitCard = 0;
//     let commission_DebitCard = 0;
//     let amount_DebitCard = 0;

//     let count_CreditCard = 0;
//     let commission_CreditCard = 0;
//     let amount_CreditCard = 0;

//     let count_Cash = 0;
//     let commission_Cash = 0;
//     let amount_Cash = 0;

//     for (x = 0; x < data.length; x++) {

//         if (data[x].payment_type == "UPI") {
//             count_UPI += 1;
//             commission_UPI += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_UPI += Number(data[x].ammount);
//         }
//         if (data[x].payment_type === "NETBANKING") {
//             count_NetBanking += 1;
//             commission_NetBanking += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_NetBanking += Number(data[x].ammount);
//         }
//         if (data[x].payment_type === "Wallet") {
//             count_Wallet += 1;
//             commission_Wallet += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_Wallet += Number(data[x].ammount);
//         }
//         if ((data[x].payment_type).startsWith("DEBIT")) {
//             count_DebitCard += 1;
//             // console.log(data[x])
//             commission_DebitCard += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_DebitCard += Number(data[x].ammount);
//         }
//         if (data[x].payment_type === "CreditCard") {
//             count_CreditCard += 1;
//             commission_CreditCard += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_CreditCard += Number(data[x].ammount);
//         }
//         if (data[x].payment_type === "Cash") {
//             count_Cash += 1;
//             // console.log(data[x].tax_amt)
//             commission_Cash += Number(data[x].tax_amt) + Number(data[x].payin_charges) + Number(data[x].our_bank_charge) + Number(data[x].rolling_reverse_amount) + Number(data[x].our_bank_charge_gst);
//             amount_Cash += Number(data[x].ammount);
//         }
//         return [
//             {trx_type:"UPI", amount: amount_UPI, count: count_UPI, commission: commission_UPI},
//             {trx_type:"NetBanking", amount: amount_NetBanking, count: count_NetBanking, commission: commission_NetBanking},
//             {trx_type:"Wallet", amount: amount_Wallet, count: count_Wallet, commission: commission_Wallet},
//             {trx_type:"DebitCard", amount: amount_DebitCard, count: count_DebitCard, commission: commission_DebitCard},
//             {trx_type:"CreditCard", amount: amount_CreditCard, count: count_CreditCard, commission: commission_CreditCard},
//             {trx_type:"Cash", amount: amount_Cash, count: count_Cash, commission: commission_Cash}
//         ]
// //'SELECT payment_type,COUNT(payment_type), SUM(ammount),(SUM(IFNULL(tax_amt,0))+SUM(IFNULL(payin_charges,0))+SUM(IFNULL(our_bank_charge,0))+SUM(IFNULL(rolling_reverse_amount,0))+SUM(IFNULL(our_bank_charge_gst,0))) as commission FROM `tbl_merchant_transaction` WHERE user_id = 15 AND status IN (1,5,4) GROUP BY payment_type;'

//     }

// }
const reportsData = {
    accountSummary: async function (req, res) {
        let user = req.user;
        const { from, to } = req.body;
        console.log(from, to)
        var value = Number(req.body.value);
        try {
            // Account Summary
            if (value === 1) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr,order_no, IF(new_trx=0, transaction_id, txn_id) AS transaction_id, card_4_4 AS card_no, ammount, payment_type as method, ammount_type AS currency, i_country as country, created_on FROM tbl_merchant_transaction WHERE user_id = " + user.id; 
                let sql2 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, uniqueid, utrnumber as transection_id, trx_type AS method, amount, currency, country, created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql3 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr,settlementId, fromCurrency, requestedAmount AS settlement_request ,charges AS settlementfee, toCurrency,settlementAmount AS amount_received, settlementType, created_on FROM tbl_settlement WHERE user_id = " + user.id;
                let sql4 = "SELECT * FROM tbl_merchant_transaction WHERE user_id = " + user.id;//DepositSummary - SQL
                let sql5 = "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id; //PayoutSummary - SQL 
                let sql6 = "SELECT * FROM tbl_settlement WHERE user_id = " + user.id; //SettlementSummary - SQL
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    sql3 += " AND DATE(created_on) >= '" + from + "'"
                    sql4 += " AND DATE(created_on) >= '" + from + "'"
                    sql5 += " AND DATE(created_on) >= '" + from + "'"
                    sql6 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                        sql3 += " AND DATE(created_on) <= '" + to + "'"
                        sql4 += " AND DATE(created_on) <= '" + to + "'"
                        sql5 += " AND DATE(created_on) <= '" + to + "'"
                        sql6 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " ORDER BY created_on ASC"
                sql2 += " ORDER BY created_on ASC"
                sql3 += " ORDER BY created_on ASC"


                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let result3 = await mysqlcon(sql3);

                let result4 = await mysqlcon(sql4);
                let result5 = await mysqlcon(sql5);
                let result6 = await mysqlcon(sql6);

                let data1 = calculateDeposit(result4);
                let data2 = calculatePayout(result5);
                let data3 = calculateSettlement(result6);

                return res.status(200).json({
                    status: true,
                    message: "Account Summary Data - ",
                    data:
                     {
                        depositSummary: result1,
                        depositData: data1,
                        payoutSummary: result2,
                        payoutData: data2,
                        settlementSummary: result3,
                        settlementData: data3
                    }
                });
            }
            // Payment Type Summary
            else if (value === 2) {
                let sql = 'SELECT ROW_NUMBER() OVER(ORDER BY payment_type) AS sr, order_no, IF(new_trx=0, transaction_id, txn_id) AS transaction_id, card_4_4 AS card_no, ammount, payment_type, i_country AS country, created_on FROM tbl_merchant_transaction WHERE user_id = ' + user.id;
                let sql1 = 'SELECT payment_type,COUNT(payment_type) AS count, SUM(ammount) AS total_Amount,(SUM(IFNULL(tax_amt,0))+SUM(IFNULL(payin_charges,0))+SUM(IFNULL(our_bank_charge,0))+SUM(IFNULL(rolling_reverse_amount,0))+SUM(IFNULL(our_bank_charge_gst,0))) as commission FROM tbl_merchant_transaction WHERE user_id = ' + user.id;
                if (from) {
                    sql += " AND DATE(created_on) >= '" + from + "'"
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql += " AND DATE(created_on) <= '" + to + "'"
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }

                sql += " AND status IN (1,5,4) ORDER BY payment_type ASC"
                sql1 += " AND status IN (1,5,4) GROUP BY payment_type"

                let result = await mysqlcon(sql);
                let result1 = await mysqlcon(sql1);
                return res.status(200).json({
                    status: true,
                    message: "Payment Type Summary Data",
                    data: {
                        paymentSummary: result,
                        paymentData: result1
                    }
                });
            }
            // Payout Type Summary
            else if (value === 3) {
                let sql = "SELECT ROW_NUMBER() OVER(ORDER BY trx_type) AS sr, uniqueid as merchant_ID,utrnumber as utr_no, creditacc as account_no, bank_name,  amount, currency, trx_type,created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql1 = "SELECT trx_type, COUNT(IFNULL(trx_type,1)) as trx_count, (SUM(IFNULL(gst_amount,0)) + SUM(IFNULL(akonto_charge,0))) as commission FROM `tbl_icici_payout_transaction_response_details` WHERE users_id = " + user.id;
                if (from) {
                    sql += " AND DATE(created_on) >= '" + from + "'"
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql += " AND DATE(created_on) <= '" + to + "'"
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql += " ORDER BY trx_type ASC";
                sql1 += " GROUP BY trx_type";

                let result = await mysqlcon(sql);
                let result1 = await mysqlcon(sql1);

                return res.status(200).json({
                    status: true,
                    message: "Payout Type Summary Data",
                    data: {
                        payoutSummary: result,
                        payoutData: result1
                    }
                });
            }
            // // Currency & Geolocation Summary
            else if (value === 4) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY ammount_type) AS sr,order_no,IF(new_trx=0, transaction_id, txn_id) AS transaction_id,card_4_4 as card_no,ammount AS amount,ammount_type AS currency, i_country AS country, created_on FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql2 = "SELECT i_country AS country, SUM(ammount) as total_amount,COUNT(IFNULL(i_country,1)) as total_count, (SUM(IFNULL(tax_amt,0))+SUM(IFNULL(payin_charges,0))+SUM(IFNULL(our_bank_charge,0))+SUM(IFNULL(rolling_reverse_amount,0))+SUM(IFNULL(our_bank_charge_gst,0))) AS commission FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql3 = "SELECT ROW_NUMBER() OVER(ORDER BY trx_type) AS sr,uniqueid as transection_no,utrnumber,trx_type as method,amount,currency,country,created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql4 = "SELECT country,SUM(amount)as total_amount, COUNT(IFNULL(country,1)) as total_count, (SUM(IFNULL(gst_amount,0)) + SUM(IFNULL(akonto_charge,0))) as commission FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;


                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    sql3 += " AND DATE(created_on) >= '" + from + "'"
                    sql4 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                        sql3 += " AND DATE(created_on) <= '" + to + "'"
                        sql4 += " AND DATE(created_on) <= '" + to + "'"

                    }
                }
                sql1 += " ORDER BY ammount_type"
                sql2 += " GROUP BY i_country"
                sql3 += " ORDER BY trx_type ASC"
                sql4 += " GROUP BY country"

                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2)
                let result3 = await mysqlcon(sql3);
                let result4 = await mysqlcon(sql4);

                return res.status(200).json({
                    status: true,
                    message: "Currency & Geolocation Summary",
                    data: {
                        depositSummary: result1,
                        depositData: result2,
                        payoutSummary: result3,
                        payoutData: result4
                    }
                });
            }
            // // Transactions
            else if (value === 5) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY ammount_type) AS sr,order_no, IF(new_trx=0, transaction_id, txn_id) AS transaction_id, card_4_4 as card_no, ammount AS amount,ammount_type AS currency, payment_type AS method,i_country AS country, created_on FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql2 = "SELECT i_country AS country, SUM(ammount) as total_amount,COUNT(IFNULL(i_country,1)) as total_count FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql3 = "SELECT ROW_NUMBER() OVER(ORDER BY trx_type) AS sr,uniqueid as transection_no,utrnumber,trx_type as method,amount,currency,country,created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql4 = "SELECT country,SUM(amount)as total_amount, COUNT(IFNULL(country,1)) as total_count FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;


                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    sql3 += " AND DATE(created_on) >= '" + from + "'"
                    sql4 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                        sql3 += " AND DATE(created_on) <= '" + to + "'"
                        sql4 += " AND DATE(created_on) <= '" + to + "'"

                    }
                }
                sql1 += " ORDER BY ammount_type"
                sql2 += " GROUP BY i_country"
                sql3 += " ORDER BY trx_type ASC"
                sql4 += " GROUP BY country"

                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2)
                let result3 = await mysqlcon(sql3);
                let result4 = await mysqlcon(sql4);

                return res.status(200).json({
                    status: true,
                    message: "Transactions Summary",
                    data: {
                        depositSummary: result1,
                        depositData: result2,
                        payoutSummary: result3,
                        payoutData: result4
                    }
                });
            }
            // Dispute Reports
            else if (value === 6) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, order_no , mer_no, card_4_4 as card_no, ammount, payment_type,ammount_type, created_on FROM tbl_merchant_transaction WHERE user_id = "  + user.id;
                let sql2 = "SELECT (SUM(IFNULL(tax_amt,0))+SUM(IFNULL(payin_charges,0))+SUM(IFNULL(our_bank_charge,0))+SUM(IFNULL(rolling_reverse_amount,0))+SUM(IFNULL(our_bank_charge_gst,0))) as chargeback FROM tbl_merchant_transaction WHERE user_id = "  + user.id;
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " AND status = 5 ORDER BY created_on ASC";
                sql2 += " AND status = 5"
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                return res.status(200).json({
                    status: true,
                    message: "Dispute Summary Data",
                    data: {
                        depositSummary: result1,
                        depositData: result2
                    }
                });
            }
            // //Transaction Status Summary
            else if (value === 7) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, order_no , IF(new_trx=0, transaction_id, txn_id) AS transaction_id, card_4_4, ammount,ammount_type, payment_type,created_on,  (CASE WHEN status = 0 THEN 'failed' WHEN status = 1 THEN 'success' WHEN status = 2 THEN 'waiting' WHEN status = 3 THEN 'pending' WHEN status = 4 THEN 'refund' WHEN status = 5 THEN 'chargeback' END) as status, status  FROM `tbl_merchant_transaction` WHERE user_id = "  + user.id;
                let sql2 = "SELECT (CASE WHEN status = 0 THEN 'failed' WHEN status = 1 THEN 'success' WHEN status = 2 THEN 'waiting' WHEN status = 3 THEN 'pending' WHEN status = 4 THEN 'refund' WHEN status = 5 THEN 'chargeback' END) as status, SUM(IFNULL(ammount,0)) AS total_sum, COUNT(IFNULL(status,0)) AS total_count FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql3 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, uniqueid,utrnumber,trx_type,amount,status, currency,created_on FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql4 = "SELECT status, SUM(IFNULL(amount,0)) AS total_amount, COUNT(IFNULL(status,0)) AS total_count FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    sql3 += " AND DATE(created_on) >= '" + from + "'"
                    sql4 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                        sql3 += " AND DATE(created_on) <= '" + to + "'"
                        sql4 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " ORDER BY created_on ASC";
                sql2 += " GROUP BY status";
                sql3 += " ORDER BY created_on";
                sql4 += " GROUP BY status";
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let result3 = await mysqlcon(sql3);
                let result4 = await mysqlcon(sql4);
                return res.status(200).json({
                    status: true,
                    message: "Transaction Status Summary", 
                    data: {
                        depositSummary : result1,
                        depositData : result2,
                        paymentSummary: result3,
                        payoutSummary : result4
                    }
                });
            }
            // Refund Transactions
            else if (value === 8) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, order_no,mer_no, card_4_4 as card_no, ammount, payment_type as method,IF(status=4,'refund', status) as status, ammount_type as currency, created_on FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql2 = "SELECT IF(status=4,'refund', status) as status ,SUM(IFNULL(ammount,0)) as total_amount FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " AND status = 4 ORDER BY created_on ASC"
                sql2 += " AND status = 4 GROUP BY payment_type"
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                return res.status(200).json({
                    status: true,
                    message: "Refund Transactions Data",
                    data: {
                        refundSummary: result1,
                        refundData: result2
                    }
                });
            }
            // Card Brand Summary
            else if (value === 9) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, order_no,IF(new_trx=0, transaction_id, txn_id) AS transaction_id, card_4_4 as card_no, ammount, ammount_type as currency,payment_type as method, created_on FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                let sql2 = "SELECT payment_type, SUM(IFNULL(ammount,0)) AS total_amount FROM tbl_merchant_transaction WHERE user_id = " + user.id;
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " AND payment_type!= 'CASH' AND payment_type!= 'Wallet' AND payment_type!= 'UPI' AND payment_type!= 'NetBanking' ORDER BY created_on ASC"
                sql2 += " AND payment_type!= 'CASH' AND payment_type!= 'Wallet' AND payment_type!= 'UPI' AND payment_type!= 'NetBanking' GROUP BY payment_type"
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data",
                    data: {
                        cardSummary: result1,
                        cardData : result2
                    }
                });
            }
            // //Commission & Charges
            else if (value === 10) {
                let sql1 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, created_on, ammount, (IFNULL(tax_amt,0)+ IFNULL(payin_charges,0) + IFNULL(our_bank_charge,0) +  IFNULL(rolling_reverse_amount,0) + IFNULL(our_bank_charge_gst,0) ) as commission FROM tbl_merchant_transaction WHERE user_id = "  + user.id;
                let sql2 = "SELECT SUM(IFNULL(ammount,0)) as total_amount, (SUM(IFNULL(tax_amt,0))+ SUM(IFNULL(payin_charges,0))+SUM(IFNULL(our_bank_charge,0))+SUM(IFNULL(rolling_reverse_amount,0))+SUM(IFNULL(our_bank_charge_gst,0))) as commission FROM tbl_merchant_transaction WHERE user_id = "  + user.id;
                let sql3 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, created_on,IFNULL(amount,0) as amount,(IFNULL(gst_amount,0) + IFNULL(akonto_charge,0)) as commission FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql4 = "SELECT SUM(amount) as total_amount, (SUM(IFNULL(gst_amount,0)) + SUM(IFNULL(akonto_charge,0))) as commission FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
                let sql5 = "SELECT ROW_NUMBER() OVER(ORDER BY created_on) AS sr, created_on, requestedAmount as amount, charges as commission FROM tbl_settlement WHERE user_id = "  + user.id;
                let sql6 = "SELECT SUM(IFNULL(requestedAmount,0)) as total_amount, SUM(IFNULL(charges,0)) AS commission FROM tbl_settlement WHERE user_id = "  + user.id;
                if (from) {
                    sql1 += " AND DATE(created_on) >= '" + from + "'"
                    sql2 += " AND DATE(created_on) >= '" + from + "'"
                    sql3 += " AND DATE(created_on) >= '" + from + "'"
                    sql4 += " AND DATE(created_on) >= '" + from + "'"
                    sql5 += " AND DATE(created_on) >= '" + from + "'"
                    sql6 += " AND DATE(created_on) >= '" + from + "'"
                    if (to) {
                        sql1 += " AND DATE(created_on) <= '" + to + "'"
                        sql2 += " AND DATE(created_on) <= '" + to + "'"
                        sql3 += " AND DATE(created_on) <= '" + to + "'"
                        sql4 += " AND DATE(created_on) <= '" + to + "'"
                        sql5 += " AND DATE(created_on) <= '" + to + "'"
                        sql6 += " AND DATE(created_on) <= '" + to + "'"
                    }
                }
                sql1 += " AND status IN (?) ORDER BY created_on ASC"
                sql2 += " AND status IN (?) "
                sql3 += " ORDER BY created_on ASC"
                sql5 += " ORDER BY created_on ASC"
                let result1 = await mysqlcon(sql1,[[0,1,2,3,4]]);
                let result2 = await mysqlcon(sql2,[[0,1,2,3,4]]);
                let result3 = await mysqlcon(sql1,[[4]]);
                let result4 = await mysqlcon(sql2,[[4]]);
                let result5 = await mysqlcon(sql1,[[5]]);
                let result6 = await mysqlcon(sql2,[[5]]);
                let result7 = await mysqlcon(sql3);
                let result8 = await mysqlcon(sql4);
                let result9 = await mysqlcon(sql5);
                let result10 = await mysqlcon(sql6);
                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data", 
                    data: {
                        depositSummary: result1,
                        depositData : result2,
                        refundSummary: result3,
                        refundData : result4,
                        chargebackSummary: result5,
                        chargebackData: result6,
                        paymentSummary: result7,
                        payoutData : result8,
                        settlementSummary: result9,
                        settlementData : result10,
                    }
                });
            }

        }
        catch (Error) {
            console.log(Error)
            res.status(500).json({ status: false, message: 'Error to complete task.', Error });
        }
        finally {
            console.log("Execution completed.");
        }
    }

}

module.exports = reportsData