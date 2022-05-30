import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./team.css";
function Team() {
  return (
    <>
      <h4 className="heading">Employee</h4>
      <div className="text-end mx-5 mb-4">
        {/* <button className="button1">
          <img
            src="https://www.bankconnect.online/assets/merchants/img/plus.svg"
            alt="Not Found"
            height="18px"
            className="mx-2"
          />
          Create Team
        </button> */}
        <TableDialog />
      </div>
      <TeamTable />
    </>
  );
}

const TableDialog = () => {
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
        <button className="button1" onClick={handleClickOpen}>
          <img
            src="https://www.bankconnect.online/assets/merchants/img/plus.svg"
            alt="Not Found"
            height="18px"
            className="mx-2"
          />
          Create Team
        </button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="md"
          
        >
          <DialogTitle>
            <h4 className="heading">Create Team</h4>
          </DialogTitle>
          <DialogContent className="dialog1">
            <DialogContentText id="alert-dialog-slide-description">
              <div className="row">
                <div className="col-12 dialogBlock1 mb-3 ">
                  <form action="" className="row">
                    <div className=" col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">First Name</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">Last Name</label>
                      <input type="text" />
                    </div>
                    <div className=" col-md-4 d-flex flex-column text-center mb-3 justify-content-center align-items-center">
                      <label htmlFor="">Role</label>
                      <select>
                        <option value="Administrator">Administrator</option>
                        <option value="Manager">Manager</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Reporter">Reporter</option>
                      </select>
                    </div>

                    <hr />
                    <div className=" col-md-4 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Email Address</label>
                      <input type="text" />
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Phone Number</label>
                      <input type="text" />
                    </div>
                  </form>
                </div>
                <div className="col-12 dialogBlock1">
                  <div className="mx-3">
                    <h5 style={{ fontSize: "24px", color: "#000" }}>
                      Description
                    </h5>
                    <div
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Administrator
                    </div>
                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      Full access to UBank Connect. This role allows the same
                      permissions as the Owner, but does not allow access to
                      Owner information. The Admin role should only be assigned
                      to your most trusted and senior employees only.
                    </div>
                    <br />
                    <div style={{ fontWeight: "600", color: "black" }}>
                      Note
                    </div>

                    <div style={{ fontSize: "14.5px", color: "#000" }}>
                      Activating a New Employee Account <br /> New employees
                      will receive a link via email to activate their account.{" "}
                      <br /> Account: Active
                    </div>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="button2" onClick={handleClose}>
              Create
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const TeamTable = () => {
  const tableData = [
    {
      EmployeeId: "1",
      Name: "John Doe",
      Email: "ABC@GMAIL.COM",
      Phone: "1234567890",
      Role: "Admin",
      LastLogin: "12/12/2020",
      Status: true,
    },
    {
      EmployeeId: "1",
      Name: "John Doe",
      Email: "ABC@GMAIL.COM",
      Phone: "1234567890",
      Role: "Admin",
      LastLogin: "12/12/2020",
      Status: true,
    },
    {
      EmployeeId: "1",
      Name: "John Doe",
      Email: "ABC@GMAIL.COM",
      Phone: "1234567890",
      Role: "Admin",
      LastLogin: "12/12/2020",
      Status: false,
    },
    {
      EmployeeId: "1",
      Name: "John Doe",
      Email: "ABC@GMAIL.COM",
      Phone: "1234567890",
      Role: "Admin",
      LastLogin: "12/12/2020",
      Status: true,
    },
    {
      EmployeeId: "1",
      Name: "John Doe",
      Email: "ABC@GMAIL.COM",
      Phone: "1234567890",
      Role: "Admin",
      LastLogin: "12/12/2020",
      Status: false,
    },
  ];

  return (
    <>
      <TableContainer className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>{item.EmployeeId}</TableCell>
                  <TableCell>{item.Name}</TableCell>
                  <TableCell>{item.Email}</TableCell>
                  <TableCell>{item.Phone}</TableCell>
                  <TableCell style={{ fontWeight: "800" }}>
                    {item.Role}
                  </TableCell>
                  <TableCell>{item.LastLogin}</TableCell>
                  <TableCell>
                    {item.Status ? (
                      <button className="enable">Enabled</button>
                    ) : (
                      <button className="disable">Disabled</button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="tableBottomMsg">Showing 16 from 46 data</p>
    </>
  );
};

export default Team;
