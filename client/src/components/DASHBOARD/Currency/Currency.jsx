import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import baseUrl from "../../../components/config/baseUrl";
import "./currency.css";
import axios from "axios";
function Currency() {
  const [tab, setTab] = useState(3);

  const [todayData, setTodayData] = useState([]);

  useEffect(() => {
    todayApi();
  }, [tab]);
  const todayApi = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();

      if (tab === 3) {
        formData.append("today", 1);
      } else if (tab === 2) {
        formData.append("today", 2);
      } else {
        formData.append("today", 3);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/dbycurrency`, formData, config);
      console.log(result.data.data);
      setTodayData(result.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(todayData);
  return (
    <>
      <div className="mainblock ">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="headingDiposite">Deposits By Currency</h6>
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

        <TableComp todayData={todayData} />
      </div>
    </>
  );
}

const TableComp = ({ todayData }) => {
  return (
    <>
      <TableContainer className="tableblockdash">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className="boldword"> Currency</TableCell>
              <TableCell>Deposit</TableCell>
              <TableCell>Payout</TableCell>
              <TableCell>Settlement</TableCell>
              <TableCell>Net Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todayData
              ? todayData.map((item, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell component="th" scope="row">
                        <img
                          src={
                            item.currency === "INR"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/rupee.png"
                              : item.currency === "CNY"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/CNY.jpeg"
                              : item.currency === "IDR"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/indo.png"
                              : item.currency === "THB"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/baht.png"
                              : item.currency === "VND"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/dong.png"
                              : item.currency === "USD"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/dollar.png"
                              : item.currency === "PHP"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/php.png"
                              : item.currency === "MYR"
                              ? "https://www.bankconnect.online/assets/merchants/img/currency/myr.jpeg"
                              : ""
                          }
                          alt=""
                          width="60px"
                        />
                      </TableCell>
                      <TableCell>{item.currency}</TableCell>
                      <TableCell>{item.depositSum}</TableCell>
                      <TableCell>{item.payoutSum}</TableCell>
                      <TableCell>{item.settlementSum}</TableCell>
                      <TableCell>{item.net}</TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Currency;
