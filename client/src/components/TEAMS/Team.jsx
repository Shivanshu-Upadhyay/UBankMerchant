import React, { useState, useEffect } from "react";
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
import baseUrl from "../../components/config/baseUrl";
import axios from 'axios'
import "./team.css";
function Team() {
  const [page, setPage] = useState(1);
  const [tableBodyData, setTableBodyData] = useState([]);
  // const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    tabledatafetch();
  }, []);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("page", page);
      
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/default`, formData, config);
      console.log(result.data.employee);
      setTableBodyData(result.data.employee);
      // setTotalPage(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h4 className="heading">Employee</h4>
      <div className="text-end mx-5 mb-4">
        <TableDialog />
      </div>
      <TeamTable tableBodyData={tableBodyData} />
    </>
  );
}

const TableDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [role,setRole] = useState('1')
  const [email,setEmail] = useState('')
  const [number,setNumber] = useState('')

  console.log(fname,lname,role,email,number)
  const createTeamApi = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("number", number);
      
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createEmployee`, formData, config);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div>
        <button className="buttonteam1" onClick={handleClickOpen}>
          <img
            src="https://www.bankconnect.online/assets/merchants/img/plus.svg"
            alt="Not Found"
            height="18px"
            className=" mx-2"
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
                      <input type="text" style={{textAlign:"center"}} value={fname} onChange={(e)=>setFname(e.target.value)}/>
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center">
                      <label htmlFor="">Last Name</label>
                      <input type="text" style={{textAlign:"center"}} value={lname} onChange={(e)=>setLname(e.target.value)}/>
                    </div>
                    <div className=" col-md-4 d-flex flex-column text-center mb-3 justify-content-center align-items-center">
                      <label htmlFor="">Role</label>
                      <select  onChange={(e)=>setRole(e.target.value)}>
                        <option value="1">Administrator</option>
                        <option value="2">Manager</option>
                        <option value="3">Cashier</option>
                        <option value="4">Reporter</option>
                      </select>
                    </div>

                    <hr />
                    <div className=" col-md-4 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Email Address</label>
                      <input type="text" style={{textAlign:"center"}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="col-md-4 d-flex flex-column text-center mt-2 ">
                      <label htmlFor="">Phone Number</label>
                      <input type="text" style={{textAlign:"center"}} value={number} onChange={(e)=>setNumber(e.target.value)}/>
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
                      {role==="1"?"Administrator":role==="2"?"Manager":role==="3"?"Cashier":"Reporter"}
                    </div>
                    <div style={{ fontSize: "14.5px", color: "#000" }}>

                      {role==="1"?"Full access to UBank Connect. This role allows the same permissions as the Owner, but does not allow access to Owner information. The Admin role should only be assigned to your most trusted and senior employees only.":role==="2"?"Limited access to UBank Connect. As an Owner or Admin, you must grant the Manager role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements, Add Employees only.":role==="3"?"Limited access to UBank Connect. As an Owner or Admin, you must grant the Cashier role access to additional permissions, such as Activity, Virtual Terminal, Invoices, Disputies, Transactions, Payouts, Reports, Statements only.":"Limited access to UBank Connect. As an Owner or Admin, you must grant the Reporter role access to additional permissions, such as Reports, Statements only."}
                     
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
            <button className="buttonteam2" onClick={()=>{handleClose();createTeamApi()}}>
              Create
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const TeamTable = ({ tableBodyData }) => {
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
            {tableBodyData.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mobile_no}</TableCell>
                  <TableCell style={{ fontWeight: "600" }}>
                    {item.role===1?"Administrator":item.role===2?"Manager":item.role===3?"Cashier":"Reporter"}
                  </TableCell>
                  <TableCell>{item.last_login}</TableCell>
                  <TableCell>
                    {item.status ? (
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
