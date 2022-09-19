const mysqlcon = require("../../../config/db_connection");

module.exports.accountSummary = async function (req, res) {
    const user = req.user;
    const { from, to } = req.body;
    console.log(from, to)
    let value = Number(req.body.value);
    let sql1 = "SELECT * FROM tbl_merchant_transaction WHERE user_id = " + user.id;
    let sql2 = "SELECT * FROM tbl_icici_payout_transaction_response_details WHERE users_id = " + user.id;
    let sql3 = "SELECT * FROM tbl_settlement WHERE user_id = " + user.id;
    if (from) {
        sql1 += " AND DATE(created_on) >= '" + from + "'"
        sql2 += " AND DATE(created_on) >= '" + from + "'"
        sql3 += " AND DATE(created_on) >= '" + from + "'"
        if (to) {
            sql1 += " AND DATE(created_on) <= '" + to + "'"
            sql2 += " AND DATE(created_on) <= '" + to + "'"
            sql3 += " AND DATE(created_on) <= '" + to + "'"
        }
    }
    let countries = ['Vietnam', 'Thailand', 'Indonesia', 'Philippines', 'India', 'China']
    let currencies = ['INR', 'CNY', 'IDR', 'THB', 'VND', 'USD', 'PHP', 'MYR']
    function ord_num(item) {
        if (item.new_trx === 1) {
            return item.txn_id
        }
        else {
            return item.order_no
        }
    }
    try {
        // Account Summary
        switch (value) {
            case 1: {
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let result3 = await mysqlcon(sql3);
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                depositSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Currency',
                        'Order Number': 'Total Transection',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': 'Refund Amount',
                        'Payin Charge': 'Total Chargeback',
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    }
                )
                for (x in currencies) {
                    depositSummary.push({
                        'Sr': currencies[x],
                        'Order Number': result1.filter((item) => item.ammount_type === currencies[x]).length,
                        'Transaction ID': result1.filter((item) => item.ammount_type === currencies[x]).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': result1.filter((item) => item.ammount_type === currencies[x]).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'Amount': result1.filter((item) => item.ammount_type === currencies[x]).reduce((total, current) => { if (current.status === 4) { return total += Number(current.ammount) } else return total }, 0),
                        'Payin Charge': result1.filter((item) => item.ammount_type === currencies[x]).reduce((total, current) => { if (current.status === 5) { return total += Number(current.ammount) } else return total }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                depositSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': 'Payout Summary',
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Sr',
                        'Order Number': 'Transaction Number',
                        'Transaction ID': 'UTR Number',
                        'Card Number': 'Method',
                        'Amount': 'Amount',
                        'Payin Charge': 'Payout Charge',
                        'GST': 'GST',
                        'Currency': 'Currency',
                        'Method': 'Country',
                        'Country': 'Created On',
                        'Created On': 'Updated On',
                        'Updated On': null
                    },
                )
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    'Method': item.country,
                    'Country': item.created_on,
                    'Created On': item.updated_on,
                    'Updated On': null
                }))
                payoutSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Currency',
                        'Order Number': 'Total Transaction',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                )
                for (x in currencies) {
                    payoutSummary.push({
                        'Sr': currencies[x],
                        'Order Number': result2.filter((item) => item.currency === currencies[x]).length,
                        'Transaction ID': result2.filter((item) => item.currency === currencies[x]).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Card Number': result2.filter((item) => item.currency === currencies[x]).reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                payoutSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': 'Settlement Summary',
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Sr',
                        'Order Number': 'Settlement ID',
                        'Transaction ID': 'From Currency',
                        'Card Number': 'Settlement Request',
                        'Amount': 'Charge',
                        'Payin Charge': 'To Currency',
                        'GST': 'Amount Recieved',
                        'Currency': 'Settlement Type',
                        'Method': 'Created On',
                        'Country': 'Updated On',
                        'Created On': null,
                        'Updated On': null
                    }
                )
                let settlementSummary = result3.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.settlementId,
                    'Transaction ID': item.fromCurrency,
                    'Card Number': item.requestedAmount,
                    'Amount': item.charges,
                    'Payin Charge': item.toCurrency,
                    'GST': item.settlementAmount,
                    'Currency': item.settlementType,
                    'Method': item.created_on,
                    'Country': item.updated_on,
                    'Created On': null,
                    'Updated On': null
                }))
                settlementSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Settlement Type',
                        'Order Number': 'Total Transaction',
                        'Transaction ID': 'Total Amount',
                        'Card Number': 'Commission',
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Total Fiat',
                        'Order Number': result3.filter((item) => item.settlementType === 'FIAT').length,
                        'Transaction ID': result3.filter((item) => item.settlementType === 'FIAT').reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                        'Card Number': result3.filter((item) => item.settlementType === 'FIAT').reduce((total, current) => { return total += Number(current.charges) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': 'Total Crypto',
                        'Order Number': result3.filter((item) => item.settlementType === 'CRYPTO').length,
                        'Transaction ID': result3.filter((item) => item.settlementType === 'CRYPTO').reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                        'Card Number': result3.filter((item) => item.settlementType === 'CRYPTO').reduce((total, current) => { return total += Number(current.charges) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                )
                const data = [...depositSummary, ...payoutSummary, ...settlementSummary]


                return res.status(200).json({
                    status: true,
                    message: "Account Summary Data - ",
                    data: data
                });
            }
            // Payment Type Summary
            case 2: {
                let result1 = await mysqlcon(sql1);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                },
                    {
                        'Sr': null,
                        'Order Number': 'Total UPI',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'UPI').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': null,
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'UPI').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Total NetBanking',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'NETBANKING').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': null,
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'NETBANKING').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Total Wallet',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'Wallet').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': null,
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'Wallet').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Total Debit Card',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'DEBIT CARD').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': null,
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'DEBIT CARD').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Total Credit Card',
                        'Transaction ID': result1.filter((item) => item.payment_type === 'CREDIT CARD').reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Card Number': null,
                        'Amount': 'Commission',
                        'Payin Charge': result1.filter((item) => item.payment_type === 'CREDIT CARD').reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                );

                return res.status(200).json({
                    status: true,
                    message: "Payment Type Summary Data",
                    data: data
                });
            }
            // Payout Type Summary
            case 3: {
                let result2 = await mysqlcon(sql2);

                let data = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Merchant ID': item.uniqueid,
                    'UTR No/Ref ID': item.utrnumber,
                    'Account Number': item.creditacc,
                    'Bank Name': item.bank_name,
                    'Amount': item.amount,
                    'Payout Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Country': item.country,
                    'Method': item.trx_type,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                data.push(
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': null,
                        'Bank Name': null,
                        'Amount': null,
                        'Payout Charge': null,
                        'GST': null,
                        'Country': null,
                        'Method': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total IMPS',
                        'Bank Name': result2.filter((item) => item.trx_type === 'IMPS').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'IMPS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'GST': null,
                        'Country': null,
                        'Method': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total NEFT',
                        'Bank Name': result2.filter((item) => item.trx_type === 'NEFT').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'NEFT').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'GST': null,
                        'Country': null,
                        'Method': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Merchant ID': null,
                        'UTR No/Ref ID': null,
                        'Account Number': 'Total RTGS',
                        'Bank Name': result2.filter((item) => item.trx_type === 'RTGS').length,
                        'Amount': 'Commission',
                        'Payout Charge': result2.filter((item) => item.trx_type === 'RTGS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'GST': null,
                        'Country': null,
                        'Method': null,
                        'Created On': null,
                        'Updated On': null
                    }
                )

                return res.status(200).json({
                    status: true,
                    message: "Payout Type Summary Data",
                    data: data
                });

            }
            // Currency & Geolocation Summary
            case 4: {
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                depositSummary.push(
                    {
                        'Sr': null,
                        'Order Number': null,
                        'Transaction ID': null,
                        'Card Number': null,
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    },
                    {
                        'Sr': null,
                        'Order Number': 'Country',
                        'Transaction ID': 'Total Count',
                        'Card Number': 'Total Amount',
                        'Amount': 'Commission',
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    }
                )
                for (x in countries) {
                    depositSummary.push({
                        'Sr': null,
                        'Order Number': countries[x],
                        'Transaction ID': result1.filter((item) => item.i_country === countries[x]).length,
                        'Card Number': result1.filter((item) => item.i_country === countries[x]).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Amount': result1.filter((item) => item.i_country === countries[x]).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': "Payout Summary",
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Method',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    'Method': 'Country',
                    'Country': 'Created On',
                    'Created On': 'Updated On',
                    'Updated On': null
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    'Method': item.country,
                    'Country': item.created_on,
                    'Created On': item.updated_on,
                    'Updated On': null
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': 'Commission',
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                })
                for (x in countries) {
                    payoutSummary.push({
                        'Sr': null,
                        'Order Number': countries[x],
                        'Transaction ID': result2.filter((item) => item.country === countries[x]).length,
                        'Card Number': result2.filter((item) => item.country === countries[x]).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Amount': result2.filter((item) => item.country === countries[x]).reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Currency & Geolocation Summary",
                    data: data
                });
            }
            // Transactions
            case 5: {
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                })
                for (x in countries) {
                    depositSummary.push({
                        'Sr': null,
                        'Order Number': countries[x],
                        'Transaction ID': result1.filter((item) => item.currency === countries[x]).length,
                        'Card Number': result1.filter((item) => item.currency === countries[x]).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': 'Payout Summary',
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Method',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    'Method': 'Country',
                    'Country': 'Created On',
                    'Created On': 'Updated On',
                    'Updated On': null
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    'Method': item.country,
                    'Country': item.created_on,
                    'Created On': item.updated_on,
                    'Updated On': null
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': 'Country',
                    'Transaction ID': 'Total Count',
                    'Card Number': 'Total Amount',
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                })
                for (x in countries) {
                    payoutSummary.push({
                        'Sr': null,
                        'Order Number': countries[x],
                        'Transaction ID': result1.filter((item) => item.currency === countries[x]).length,
                        'Card Number': result1.filter((item) => item.currency === countries[x]).reduce((total, current) => { return total += Number(current.amount) }, 0),
                        'Amount': null,
                        'Payin Charge': null,
                        'GST': null,
                        'Currency': null,
                        'Method': null,
                        'Country': null,
                        'Created On': null,
                        'Updated On': null
                    })
                }
                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Transactions Summary",
                    data: data
                });
            }
            // Dispute Reports
            case 6: {
                sql1 += " AND status = 5"
                let result1 = await mysqlcon(sql1);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Country': item.i_country,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': 'Total chargeback Amount',
                    'Amount': result1.reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Country': null,
                    'Created On': null,
                    'Updated On': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Dispute Summary Data",
                    data: data
                });
            }
            // Transaction Status Summary
            case 7: {
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                function sta_tus(item) {
                    if (item.status === 0) { return 'Failed' }
                    else if (item.status === 1) { return 'Success' }
                    else if (item.status === 2) { return 'Waiting' }
                    else if (item.status === 3) { return 'Pending' }
                    else if (item.status === 4) { return 'Refund' }
                    else if (item.status === 5) { return 'Chargeback' }
                }
                let depositSummary = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Status': sta_tus(item),
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Status',
                    'Card Number': "Total Count",
                    'Amount': 'Total Amount',
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Success',
                    'Card Number': result1.filter((item) => item.status === 1).length,
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Failed',
                    'Card Number': result1.filter((item) => item.status === 0).length,
                    'Amount': result1.filter((item) => item.status === 0).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Pending',
                    'Card Number': result1.filter((item) => item.status === 3).length,
                    'Amount': result1.filter((item) => item.status === 3).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Refund',
                    'Card Number': result1.filter((item) => item.status === 4).length,
                    'Amount': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Chargeback',
                    'Card Number': result1.filter((item) => item.status === 5).length,
                    'Amount': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Waiting',
                    'Card Number': result1.filter((item) => item.status === 2).length,
                    'Amount': result1.filter((item) => item.status === 2).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': 'Payout Summary',
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': 'Sr',
                    'Order Number': 'Transaction Number',
                    'Transaction ID': 'UTR Number',
                    'Card Number': 'Method',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Currency': 'Currency',
                    'Method': 'Status',
                    'Status': 'Created On',
                    'Created On': 'Updated On',
                    'Updated On': null
                })
                let payoutSummary = result2.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': item.uniqueid,
                    'Transaction ID': item.utrnumber,
                    'Card Number': item.trx_type,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Currency': item.currency,
                    'Method': item.status,
                    'Status': item.created_on,
                    'Created On': item.updated_on,
                    'Updated On': null
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Status',
                    'Card Number': "Total Count",
                    'Amount': 'Total Amount',
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Success',
                    'Card Number': result2.filter((item) => item.status === 'SUCCESS').length,
                    'Amount': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Failed',
                    'Card Number': result2.filter((item) => item.status === 'FAILED').length,
                    'Amount': result2.filter((item) => item.status === 'FAILED').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Pending',
                    'Card Number': result2.filter((item) => item.status === 'PENDING').length,
                    'Amount': result2.filter((item) => item.status === 'PENDING').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                })

                const data = [...depositSummary, ...payoutSummary]
                return res.status(200).json({
                    status: true,
                    message: "Transaction Status Summary",
                    data: data
                });
            }
            // Refund Transactions
            case 8: {
                sql1 += " AND status = 4 ";
                let result1 = await mysqlcon(sql1);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Status': 'Refund',
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': 'Total Count',
                    'Card Number': result1.length,
                    'Amount': 'Total Refund',
                    'Payin Charge': result1.reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Status': null,
                    'Created On': null,
                    'Updated On': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Refund Transactions Data",
                    data: data
                });
            }
            // Card Brand Summary
            case 9: {
                sql1 += " AND payment_type!= 'CASH' AND payment_type!= 'Wallet' AND payment_type!= 'UPI' AND payment_type!= 'NetBanking' "
                let result1 = await mysqlcon(sql1);
                let data = result1.map((item, index) => ({
                    'Sr': index + 1,
                    'Order Number': ord_num(item),
                    'Transaction ID': item.transaction_id,
                    'Card Number': item.card_4_4,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Currency': item.ammount_type,
                    'Method': item.payment_type,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                data.push({
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': 'Total Debit Card',
                    'Amount': result1.filter((item) => item.payment_type === 'DEBIT CARD').length,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Created On': null,
                    'Updated On': null
                }, {
                    'Sr': null,
                    'Order Number': null,
                    'Transaction ID': null,
                    'Card Number': 'Total Credit Card',
                    'Amount': result1.filter((item) => item.payment_type === 'CREDIT CARD').length,
                    'Payin Charge': null,
                    'GST': null,
                    'Currency': null,
                    'Method': null,
                    'Created On': null,
                    'Updated On': null
                })
                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data",
                    data: data
                });

            }
            // Commission & Charges
            case 10: {
                let result1 = await mysqlcon(sql1);
                let result2 = await mysqlcon(sql2);
                let result3 = await mysqlcon(sql3);
                let depositSummary = result1.filter((item) => item.status === 1).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                depositSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Total Deposit',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created On': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Refund',
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payin Charge',
                    'GST': 'GST',
                    'Created On': 'Created On',
                    'Updated On': 'Updated On',
                })
                let refundSummary = result1.filter((item) => item.status === 4).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                refundSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Total Refund',
                    'Amount': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created On': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Chargeback',
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payin Charge',
                    'GST': 'GST',
                    'Created On': 'Created On',
                    'Updated On': 'Updated On',
                })
                let chargebackSummary = result1.filter((item) => item.status === 5).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.ammount,
                    'Payin Charge': item.payin_charges,
                    'GST': item.gst_charges,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                chargebackSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Total Chargeback',
                    'Amount': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created On': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Payout',
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Amount',
                    'Payin Charge': 'Payout Charge',
                    'GST': 'GST',
                    'Created On': 'Created On',
                    'Updated On': 'Updated On',
                })
                let payoutSummary = result2.filter((item) => item.status === 'SUCCESS').map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.amount,
                    'Payin Charge': item.akonto_charge,
                    'GST': item.gst_amount,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                payoutSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Total Payout',
                    'Amount': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created On': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Settlement',
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Sr',
                    'Amount': 'Requested Amount',
                    'Payin Charge': 'Commission',
                    'GST': 'Settled Amount',
                    'Created On': 'Created On',
                    'Updated On': 'Updated On',
                })
                let settlementSummary = result3.filter((item) => item.status === 1).map((item, index) => ({
                    'Sr': index + 1,
                    'Amount': item.requestedAmount,
                    'Payin Charge': item.charges,
                    'GST': item.settlementAmount,
                    'Created On': item.created_on,
                    'Updated On': item.updated_on
                }))
                settlementSummary.push({
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': 'Total Settlement',
                    'Amount': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                    'Payin Charge': null,
                    'GST': 'Commission',
                    'Created On': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': 'Total Amount & Charges',
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': null,
                    'Payin Charge': null,
                    'GST': null,
                    'Created On': null,
                    'Updated On': null,
                }, {
                    'Sr': null,
                    'Amount': 'Deposit',
                    'Payin Charge': 'Payout',
                    'GST': 'Settlement',
                    'Created On': 'Refund',
                    'Updated On': 'Chargeback',
                    '': 'Total Amount'
                }, {
                    'Sr': 'Amount',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Payin Charge': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0),
                    'GST': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0),
                    'Created On': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    'Updated On': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0),
                    '': result1.filter((item) => item.status === 1 || item.status === 4 || item.status === 5).reduce((total, current) => { return total += Number(current.ammount) }, 0) + result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.amount) }, 0) + result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.requestedAmount) }, 0)
                }, {
                    'Sr': 'Commission',
                    'Amount': result1.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Payin Charge': result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0),
                    'GST': result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                    'Created On': result1.filter((item) => item.status === 4).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    'Updated On': result1.filter((item) => item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0),
                    '': result1.filter((item) => item.status === 1 || item.status === 4 || item.status === 5).reduce((total, current) => { return total += Number(current.gst_charges) + Number(current.payin_charges) }, 0) + result2.filter((item) => item.status === 'SUCCESS').reduce((total, current) => { return total += Number(current.akonto_charge) + Number(current.gst_amount) }, 0) + result3.filter((item) => item.status === 1).reduce((total, current) => { return total += Number(current.charges) }, 0),
                })
                const data = [...depositSummary, ...refundSummary, ...chargebackSummary, ...payoutSummary, ...settlementSummary]

                return res.status(200).json({
                    status: true,
                    message: "Card Brand Summary Data",
                    data: data
                });
            }
            default: {
                res.status(400).json({ status: false, message: 'Provide a value .', data: [] });
            }
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