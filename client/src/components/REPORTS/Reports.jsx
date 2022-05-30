import React from "react";
import "./report.css";

function Reports() {
  return (
    <div>
      <h4 className="heading mx-3">Reports</h4>
      <div className="text-end mx-4">
      </div>
      <Block2 />
    </div>
  );
}

const Section1 = ({ heading, discription }) => {
  return (
    <>
      <div className="row  m-3 monthBlock">
        <div className="col-8">
          <h6 style={{ fontWeight: "700", fontSize: "14px" }}>{heading}</h6>
          <p style={{ fontSize: "12px", color: "#666666" }}>{discription}</p>
        </div>

        <div className="col-4 text-end">
          <button className="downloadbtn1">
            <img
              src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
              alt="not"
              width="17px"
              className="mx-2"
            />
            Download Report
          </button>
        </div>
      </div>
      <hr className="border" />
    </>
  );
};

const Block2 = () => {
  return (
    <>
      <div className="containerShadow mx-3 my-4">
        <Section1
          heading="Account Summary"
          discription="A breakdown of gross and net sales by account."
        />
        <Section1
          heading="Payment Type Summary"
          discription="View sales by type of transaction methods i.e. Deposists recieved through online inter bank transfer, cards, e-wallets and alternate payment methods"
        />
        <Section1
          heading="Payout Type Summary"
          discription="View payouts by modes used for payouts i.e. payout to cards, bank accounts, e-wallets."
        />
        <Section1
          heading="Currency & Geolocation Summary"
          discription="View deposits and payouts by type of currency or by country."
        />
        <Section1
          heading="Transactions"
          discription="Export a listing of all transactions in a period."
        />
        <Section1
          heading="Dispute Reports"
          discription="View status of your disputes."
        />
        <Section1
          heading="Transaction Status Summary"
          discription="View transactions based on status for a period i.e. success, pending and failed transactions."
        />
        <Section1
          heading="Refund Transactions"
          discription="View a detailed breakdwon of all refunded transactions in a period."
        />
        <Section1
          heading="Card Brand Summary"
          discription="View sales total transactions by available card brand."
        />
      </div>
    </>
  );
};

export default Reports;
