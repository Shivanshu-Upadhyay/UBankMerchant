import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./table.css";

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

export default function TableComp({ tableBodyData, xlData, setXlData }) {
  const [users, setUsers] = useState([]);
  
  function convertTZ(date, tzString) {
    date.replace('Z',"")
   let dateTime = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString})); 
   dateTime =  dateTime.toDateString() +" "+ dateTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,})
     return dateTime
}


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
        user.order_no === name ? { ...user, isChecked: checked } : user
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
              <TableCell>Order Id</TableCell>
              <TableCell > Date</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="center">Method</TableCell>
              <TableCell>Settled Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.order_no}
                      checked={item?.isChecked || false}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell className="tablebold">{item.order_no}</TableCell>
                  <TableCell style={{width:"500px"}}>{ convertTZ(item.created_on,JSON.parse(localStorage.getItem('timeZone')).timeZone) }</TableCell>
                  <TableCell className="tablebold">{item.i_flname}</TableCell>
                  <TableCell align="center" className="tablebold">
                    {item.ammount}
                  </TableCell>
                  <TableCell align="center">{item.ammount_type}</TableCell>
                  <TableCell className="tablebold" align="center">
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

                      <PopUp formData={item} />
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

const PopUp = ({ formData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div>
        <img
          src="https://www.bankconnect.online/assets/merchants/img/more-v.svg"
          alt=""
          className="mx-2"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <div style={{ padding: "10px 20px" }}>
            <DialogOpenModel formData={formData} />
          </div>
        </Popover>
      </div>
    </>
  );
};

const DialogOpenModel = ({ formData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <h6
          onClick={handleClickOpen}
          style={{ cursor: "pointer", fontWeight: "700", marginTop: "10px" }}
        >
          View Details
        </h6>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            Transactions View
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      ID Invoice
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.order_no}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Telephone
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_number}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Email
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_email}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Name
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.i_flname}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Payment Method
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payment_type}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Transaction Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.created_on}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label htmlFor="" className="forminputDeposite">
                      Settled Date
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settlement_on}
                    />
                  </div>

                  <hr style={{ width: "95%" }} />

                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Gross Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.ammount}
                    />
                  </div>
                  <div className=" col-md-4 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Rolling Reserve Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.rolling_reverse_amount}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Commissions
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payin_charges}
                    />
                  </div>
                  <div className=" col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Net Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settle_amount}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Settled Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.settle_amount}
                    />
                  </div>

                  <hr style={{ width: "95%" }} />

                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Sold By
                    </label>
                    <input type="text" className="input1" value="" />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Card
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.payment_type}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Card No.
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.card_4_4}
                    />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center  ">
                    <label htmlFor="" className="forminputDeposite">
                      Message
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={formData.discription}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className="col-md-3">
                    <div
                      onClick={handleClose}
                      className="dilogfirstbutton d-flex justify-content-center align-items-center"
                    >
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                        alt=""
                        width="45px"
                      />
                      <div className="mx-2">
                        <h6 style={{ color: "#000009" }}>Amount</h6>
                        <h6 style={{ fontWeight: "600", fontSize: "18px" }}>
                          {formData.settle_amount}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    <div>
                      <span onClick={handleClose} className="dilogrefund">
                        Refund Transaction
                      </span>
                      <span onClick={handleClose} className="dilogrefund mx-3">
                        Close
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
