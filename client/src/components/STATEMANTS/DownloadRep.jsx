import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const FirstTable = ({downloadStatement}) => {
  return (
    <>
      
      <table className="table" style={{ border: "2px solid #e8f1f9" }}>
        <thead>
          <tr style={{ background: "#e8f1f9" }}>
            <th scope="col" colSpan={4}>
              <b>Finnacial Statement December - (2022)</b>
            </th>
            <th scope="col" className="text-end">
              <b>Amount in USD</b>
            </th>
          </tr>
        </thead>
        <tbody style={{ border: "2px solid #e8f1f9" }}>
          <tr>
            <td colSpan={4}>Beginning Balance</td>
            <td className="text-end">144.38</td>
          </tr>
          <tr>
            <td colSpan={4}>Ending Balance</td>
            <td className="text-end">1632.12</td>
          </tr>

          <tr style={{ background: "#f9f9f9" }} className="text-end">
            <td colSpan={3}></td>
            <td>
              <h6 style={{fontWeight:"800"}}>Debit</h6>
            </td>
            <td>
              <h6 style={{fontWeight:"800"}}>Credit</h6>
            </td>
          </tr>
          <tr style={{ background: "#e8f1f9" }}>
            <td colSpan={4} >
              <h6 style={{fontWeight:"800"}}>Deposits</h6>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].depositSum:null}</td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Refunds Amount</td>
            </td>
            <td className="text-end" >{downloadStatement.deposits? downloadStatement.deposits[0].refundsAmount:null}</td>
           <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Refund Fees</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].refundFees:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Chargeback Amount</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].chargebackAmount:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Chargeback Fees</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].chargebackFees:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Account Fees/ Setup Fees</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].accountFees:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Deposit Commissions</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].depositCommissions:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Any Other Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.deposits[0].anyotherCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr style={{ background: "#e8f1f9" }}>
            <td colSpan={4} >
              <h6 style={{fontWeight:"800"}}>Payouts</h6>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.payouts[0].payouts:null}</td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Payout Commissions</td>
            </td>
            <td className="text-end" >{downloadStatement.deposits? downloadStatement.payouts[0].payoutCommissions:null}</td>
           <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Bank Account Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.payouts[0].bankaccountCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr style={{ background: "#e8f1f9" }}>
            <td colSpan={4} >
              <h6 style={{fontWeight:"800"}}>Settlements</h6>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.settlements[0].settlements:null}</td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Settlement Charges</td>
            </td>
            <td className="text-end" >{downloadStatement.deposits? downloadStatement.settlements[0].settlementCharges:null}</td>
           <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Net Settlement</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.settlements[0].netSettlement:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Any Other Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.settlements[0].anyotherCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr style={{ background: "#e8f1f9" }}>
            <td colSpan={4} >
              <h6 style={{fontWeight:"800"}}>Commissions and Charges</h6>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].commissions:null}</td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Ubank Connect Deposits Charges</td>
            </td>
            <td className="text-end" >{downloadStatement.deposits? downloadStatement.cac[0].ubankconnectDepositsCharges:null}</td>
           <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Ubank Connect Refund Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].ubankconnectRefundCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Ubank Connect Chargeback Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].ubankconnectChargebackCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Ubank Connect Payout Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].ubankconnectPayoutCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Ubank Connect Other Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].ubankconnectOtherCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Bank Charges</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].bankCharges:null}</td>
            <td colSpan={1}></td>
          </tr>
          <tr >
            <td colSpan={3} >
              <td>Tax & Vat</td>
            </td>
            <td className="text-end">{downloadStatement.deposits? downloadStatement.cac[0].tax:null}</td>
            <td colSpan={1}></td>
          </tr>
          
         
          
          
         
          
        </tbody>
      </table>
    </>
  );
};

const CommonTable = ({ downloadStatement, name }) => {
  return (
    <>
      <h4>{name}</h4>
      <table className="table" style={{ border: "2px solid #e8f1f9" }}>
        <thead>
          <tr style={{ background: "#e8f1f9" }} className="text-center">
            <th scope="col">
              <b>Currency</b>
            </th>
            <th scope="col ">
              <b>Amount</b>
            </th>
            <th scope="col">
              <b>Charges</b>
            </th>
            <th scope="col">
              <b>Net Amount</b>
            </th>
            <th scope="col">
              <b>Settlement Amount(USD)</b>
            </th>
          </tr>
        </thead>
        <tbody style={{ border: "2px solid #e8f1f9" }}>
          {downloadStatement
            ? downloadStatement.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>{item.currency}</td>
                    <td>{item.Amount}</td>
                    <td>{item.charges}</td>
                    <td>{item.NetAmount}</td>
                    <td>{item.SettlementAmount}</td>
                  </tr>
                );
              })
            : ""}

          <tr style={{ background: "#e8f1f9" }} className="text-center">
            <td colSpan={3}></td>
            <td>Total</td>
            <td>
              {downloadStatement
                ? downloadStatement.reduce(
                    (total, num) => total + num.SettlementAmount,
                    0
                  )
                : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const CommonTable2 = ({ downloadStatement, name }) => {
  return (
    <>
      <h4>{name}</h4>
      <table className="table" style={{ border: "2px solid #e8f1f9" }}>
        <thead>
          <tr style={{ background: "#e8f1f9" }} className="text-center">
            <th scope="col">
              <b>Currency</b>
            </th>
            <th scope="col ">
              <b>Deposit amount</b>
            </th>
            <th scope="col">
              <b>Deposit charges</b>
            </th>
            <th scope="col">
              <b>Payout amount</b>
            </th>
            <th scope="col">
              <b>Payout charges</b>
            </th>
            <th scope="col">
              <b>Settlement amount</b>
            </th>
            <th scope="col">
              <b>Settlement charges</b>
            </th>
            <th scope="col">
              <b>Other charges</b>
            </th>
            <th scope="col">
              <b>Total Amount(USD)</b>
            </th>
            <th scope="col">
              <b></b>
            </th>
          </tr>
        </thead>
        <tbody style={{ border: "2px solid #e8f1f9" }}>
          {downloadStatement
            ? downloadStatement.map((item, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>{item.currency}</td>
                    <td>{item.DepositAmount}</td>
                    <td>{item.DepositCharges}</td>
                    <td>{item.PayoutAmount}</td>
                    <td>{item.PayoutCharges}</td>
                    <td>{item.SettlementAmount}</td>
                    <td>{item.SettlementCharges}</td>
                    <td>{item.OtherCharges}</td>
                    <td>{item.TotalAmount}</td>
                  </tr>
                );
              })
            : ""}

          <tr style={{ background: "#e8f1f9" }} className="text-center">
            <td colSpan={7}></td>
            <td>Total</td>
            <td>
              {downloadStatement
                ? downloadStatement.reduce(
                    (total, num) => total + num.TotalAmount,
                    0
                  )
                : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

function DownloadRep() {
  const { downloadStatement } = useStateContext();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="row containerdownlodSett my-4">
        <div className="col-12">
          <img
            src="https://www.bankconnect.online/assets/merchants/img/logo.png"
            alt=""
          />
        </div>
        <div className="col-12 my-3 d-flex justify-content-between">
          <h5 style={{ width: "20%" }}>
            Fastpay Test Fastpay Test shyammilan.wie@gmail.com ewfef, , , 1
          </h5>
          <div>
            <button
              className="printbuttonstatement"
              onClick={() => window.print()}
            >
              🖶 Print
            </button>
            <button className="mx-3 printbuttonstatement">
              <Link to="/Statements" style={{ color: "black" }}>
                Back
              </Link>
            </button>
          </div>
        </div>
        <div className="col-12">
          <FirstTable downloadStatement={downloadStatement} />
          <CommonTable
            downloadStatement={downloadStatement.dbc}
            name="Deposit by Currency"
          />
          <CommonTable
            downloadStatement={downloadStatement.rbc}
            name="Refunds by Currency"
          />
          <CommonTable
            downloadStatement={downloadStatement.cbc}
            name="Chargeback by Currency"
          />
          <CommonTable
            downloadStatement={downloadStatement.pbc}
            name="Payout by Currency"
          />
          <CommonTable
            downloadStatement={downloadStatement.sbc}
            name="Settlement by Currency"
          />
          <CommonTable2
            downloadStatement={downloadStatement.ccc}
            name="Commission and Charges by Currency"
          />
        </div>
        <div className="col-12 text-center mt-4">
          <p>
            Ubank Connect <br /> Customer support - Email:
            support@ubankconnect.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default DownloadRep;
