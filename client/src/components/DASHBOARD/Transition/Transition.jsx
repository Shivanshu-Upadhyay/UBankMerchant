import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import baseUrl from "../../../components/config/baseUrl";
import "../Currency/currency.css";
import "./transition.css";
import axios from "axios";
function Transition() {
  const [tab, setTab] = useState(3);
  const [todayData, setTodayData] = useState([]);
  
  useEffect(() => {
    todayApi();
  }, [tab]);

  const todayApi = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      if(tab===3){
         formData.append("today", 1);
      }else if(tab===2){
        formData.append("week", 1);
      }else{
         formData.append("month", 1);
      }
     
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/top_transaction_today`,
        formData,
        config
      );
      setTodayData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mainblock ">
        <div className="d-flex justify-content-between">
          <h6 className=" headingDiposite d-flex justify-content-between align-items-center">
            Top Transactions
          </h6>
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
    </div>
  );
}

const TableComp = ({ todayData }) => {
  

  return (
    <>
      <TableContainer className="tableblockdash">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {todayData.length >= 1 ? (
              todayData.map((item, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/completed.svg"
                        alt=""
                        width="60px"
                      />
                    </TableCell>
                    <TableCell style={{ fontWeight: "600" }}>
                      {item.name}
                      <br />
                      <span>{item.method}</span>
                    </TableCell>
                    <TableCell style={{ fontWeight: "600" }}>
                      {item.dt}
                      <br />
                      <span>{item.time}</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontWeight: "600" }}>{item.amount}</span>
                      <span
                        className={
                          item.status === "PENDING" || item.status === "3"
                            ? "pendding mx-2"
                            : item.status === "SUCCESS" || item.status === "1"
                            ? "success mx-2"
                            : "waiting mx-2"
                        }
                      >
                        {item.status === "PENDING" || item.status === "3"
                          ? "Pending "
                          : item.status === "SUCCESS" || item.status === "1"
                          ? "Success"
                          : "Waiting"}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableCell style={{ fontWeight: "600" }} align="center">
                <h5>No Data Found</h5>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Transition;
