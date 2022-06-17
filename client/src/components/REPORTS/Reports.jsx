import React, { useState } from "react";
import "./report.css";
import Menu from "@mui/material/Menu";
import * as XLSX from "xlsx";
function Reports() {
  const [todate, SetToDate] = useState("");
  const [fromdate, SetToFromDate] = useState("");
  return (
    <div>
      <h4 className="heading mx-3">Reports</h4>
      <div className="text-end ">
        <FilterDate
          todate={todate}
          SetToDate={SetToDate}
          fromdate={fromdate}
          SetToFromDate={SetToFromDate}
        />
      </div>
      <div className="text-end mx-4"></div>
      <Block2 todate={todate}  fromdate={fromdate}  />
    </div>
  );
}

function FilterDate({ todate, SetToDate, fromdate, SetToFromDate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        className="filterdate"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ width: "200px" }}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/calender.svg"
          alt=""
          className="mx-2"
        />
        Filter Date
        <img
          src="https://www.bankconnect.online/assets/merchants/img/cev-down.svg"
          alt=""
          className="mx-2"
        />
      </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="my-3"
      >
        <form className="row m-4 align-items-center">
          <div className="col-12 d-flex " style={{ width: "38rem" }}>
            <input
              type="date"
              className="dateinput col-5 `"
              value={todate}
              onChange={(e) => SetToDate(e.target.value)}
            />
            <div className="col-2 text-center mt-2">
              <b>To</b>
            </div>
            <input
              type="date"
              className="dateinput col-4"
              value={fromdate}
              onChange={(e) => SetToFromDate(e.target.value)}
            />
          </div>
        </form>
      </Menu>
    </>
  );
}

const Section1 = ({ heading, discription, xlData,todate,fromdate }) => {
  
  const downloadExl = () => {
    const workSheet = XLSX.utils.json_to_sheet([{ name: "abc" }]);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");

    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, "Settlement.xlsx");
    console.log(todate,fromdate);
  };
  return (
    <>
      <div className="row  m-3 monthBlock">
        <div className="col-8">
          <h6 style={{ fontWeight: "700", fontSize: "14px" }}>{heading}</h6>
          <p style={{ fontSize: "12px", color: "#666666" }}>{discription}</p>
        </div>

        <div className="col-4 text-end">
          <button className="downloadbtn1" onClick={downloadExl}>
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

const Block2 = ({todate, fromdate, }) => {
  return (
    <>
      <div className="containerShadow mx-3 my-4">
        <Section1
          heading="Account Summary"
          discription="A breakdown of gross and net sales by account."
          todate={todate} fromdate={fromdate}
          
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
