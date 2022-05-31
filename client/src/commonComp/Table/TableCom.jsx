import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./table.css";


const ButtonBox = ({name})=>{
  return (
    <>
      <button
        className={
          name === "Failed"
            ? "tablestatusbuttonFail"
            : name === "Success"
            ? "tablestatusbuttonComp"
            : "tablestatusbuttonWait"
        }
      >
        {name}
      </button>
    </>
  );
} 


export default function TableComp({ tableBodyData }) {
  const [selectall,setSelectAll]=useState(false);
  // console.log("table"+tableBodyData);
  return (
    <TableContainer className="tablecontainer2 ">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={() => setSelectAll(!selectall)}
              />
            </TableCell>
            <TableCell>Order Id</TableCell>
            <TableCell> Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell align="center">Method</TableCell>
            <TableCell>Settled Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData.map((item, index) => {
            return (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={index}
              >
                <TableCell>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.order_no}
                    checked={selectall}
                  />
                </TableCell>
                <TableCell className="tablebold">{item.order_no}</TableCell>
                <TableCell>{item.created_on}</TableCell>
                <TableCell className="tablebold">{item.i_flname}</TableCell>
                <TableCell align="center" className="tablebold">
                  {item.ammount}
                </TableCell>
                <TableCell align="center">{item.ammount_type}</TableCell>
                <TableCell className="tablebold">
                  <img
                    src="https://www.bankconnect.online/assets/merchants/img/green-down.svg"
                    alt=""
                    className="mx-1"
                  />
                  {item.payment_type}
                </TableCell>
                <TableCell align="center">{item.settle_amount}</TableCell>
                <TableCell className="statusblock">
                  <div className="d-flex justify-content-between">
                    {item.status === 0 ? (
                      <ButtonBox name="Failed" />
                    ) : item.status === 1 ? (
                      <ButtonBox name="Success" />
                    ) : item.status === 2 ? (
                      <ButtonBox name="Waiting" />
                    ) : item.status === 3 ? (
                      <ButtonBox name="Pending" />
                    ) : (
                      <ButtonBox name="Refund" />
                    )}

                    <img
                      src="https://www.bankconnect.online/assets/merchants/img/more-v.svg"
                      alt=""
                      className="mx-2"
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
