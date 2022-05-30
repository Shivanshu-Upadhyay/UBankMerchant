import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Currency/currency.css";
import "./transition.css";
function Transition() {
    const [tab, setTab] = useState(3);
  return (
    <div>
      <div className="mainblock ">
        <div className="d-flex justify-content-between">
          <h6 className="heading">Top Transactions</h6>
          <div style={{ background: "#fff" }}>
            <button
              className={tab === 1 ? "btn1 active" : "btn1"}
              onClick={() => setTab(1)}
            >
              Monthly
            </button>
            <button
              className={tab === 2 ? "btn1 active" : "btn1"}
              onClick={() => setTab(2)}
            >
              Weekly
            </button>
            <button
              className={tab === 3 ? "btn1 active" : "btn1"}
              onClick={() => setTab(3)}
            >
              Today
            </button>
          </div>
        </div>

        <TableComp />
      </div>
    </div>
  );
}

const TableComp = () => {
  const tData = [
    {
      img: "https://www.bankconnect.online/assets/merchants/img/currency/rupee.png",
      Currency: "INR",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "https://www.bankconnect.online/assets/merchants/img/currency/CNY.jpeg",
      Currency: "CNY",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "	https://www.bankconnect.online/assets/merchants/img/currency/indo.png",
      Currency: "IDR",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "https://www.bankconnect.online/assets/merchants/img/currency/baht.png",
      Currency: "THB",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "	https://www.bankconnect.online/assets/merchants/img/currency/dong.png",
      Currency: "VND",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "https://www.bankconnect.online/assets/merchants/img/currency/dollar.png",
      Currency: "USD",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "https://www.bankconnect.online/assets/merchants/img/currency/php.png",
      Currency: "PHP",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
    {
      img: "	https://www.bankconnect.online/assets/merchants/img/currency/myr.jpeg",
      Currency: "MYR",
      Deposit: "11.00",
      Payout: "0.00",
      Settlement: "0.00",
      netbalance: "11.00",
    },
  ];

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
             
             
             
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tData.map((item, index) => {
              return (
                <>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      <img src={item.img} alt="" width="60px" />
                    </TableCell>
                    <TableCell>{item.Currency}</TableCell>
                    <TableCell>{item.Deposit}</TableCell>
                    <TableCell>{item.Payout}</TableCell>
                    
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};



export default Transition;
