import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../../components/config/baseUrl";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
const CreateSubMer = ({ReadOnlyVal,formData}) => {
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
      {ReadOnlyVal? <div onClick={()=>{handleClickOpen()}} style={{ cursor:"pointer",padding:"10px 20px",fontWeight:"700"}} >View</div> :<button className="createNewMerchant" onClick={handleClickOpen}>
          <AddIcon />
          Create Merchant
        </button>}
        

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
            Settlement Request
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      First Name
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Last Name
                    </label>
                    <input type="text" className="input1" />
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Email
                    </label>
                    <input type="email" className="input1" />
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Mobile No
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Settle Currency <span  style={{ fontWeight: "700", fontSize:"10px", color: "#F25961" }}>*Note It's permanent.</span>
                    </label>
                    <div className="d-flex justify-content-center align-items-center">
                    <select
                      className="form-select form-select-sm mb-3 boldOption"
                      required
                      defaultValue={"default"}
                      style={{width:"100px"}}
                    >
                      <option value={"default"} disabled>
                        Select
                      </option>
                      <option value="INR">INR</option>
                      <option value="CNY">CNY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="THB">THB</option>
                      <option value="VND">VND</option>
                      <option value="PHP">PHP</option>
                      <option value="MYR">MYR</option>
                      <option value="IDR">IDR</option>
                      <option value="KRW">KRW</option>
                    </select>
                    </div>
                    
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Business name
                    </label>
                    <input type="text" className="input1" />
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "800", color: "#000" }}
                    >
                     Business location
                    </label>
                    <input type="email" className="input1" />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Job title
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                     Website
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Annual Processing Volume
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <div className="col-md-4 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Average Transaction Amount
                    </label>
                    <input type="email" className="input1" />
                  </div>
                  
                  <hr style={{ width: "95%" }} />
                  <div className=" col-md-6 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      What is your current charge back percentage?
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <div className="col-md-6 d-flex flex-column text-center">
                    <label
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Currencies Require
                    </label>
                    <input type="text" className="input1" />
                  </div>
                  <hr style={{ width: "95%" }} />
             <div className="d-flex justify-content-end">
              <button className="createNewMerchant2" onClick={handleClickOpen} type='submit'>
                Create 
              </button>
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

export default CreateSubMer;
