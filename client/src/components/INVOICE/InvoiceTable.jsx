import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const ButtonBox = ({ name }) => {
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
};

export default function InvoiceTable({ tableBodyData, xlData, setXlData }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(tableBodyData);
  }, [tableBodyData]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
      console.log(tempUser);
      setXlData(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.invoice_no === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
      setXlData(tempUser.filter((item) => item.isChecked));
      console.log(xlData);
    }
  };

  return (
    <>
      <TableContainer className="tablecontainer2 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="allSelect"
                  checked={!users.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell> Send Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Tax Amount	</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.invoice_no}
                      checked={item?.isChecked || false}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell className="tablebold">{item.invoice_no}</TableCell>
                  <TableCell>{item.send_date}</TableCell>
                  <TableCell className="tablebold">{item.due_date}</TableCell>
                  <TableCell align="center" className="tablebold">
                    {item.email}
                  </TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell className="tablebold" align="center">
                    
                    {item.tax_amount}
                  </TableCell>
                 
                  <TableCell className="statusblock">
                    <div className="d-flex justify-content-between">
                      { item.pay_status === 1 ? (
                        <ButtonBox name="Paid" />
                      ) : item.pay_status === 2 ? (
                        <ButtonBox name="Overdue" />
                      ) : item.pay_status === 3 ? (
                        <ButtonBox name="Pending" />
                      ) : (
                        <ButtonBox name="UnPaid" />
                      )}

                      
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


