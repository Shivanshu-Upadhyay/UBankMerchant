import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import "./filter.css";

const CheakboxComp = ({ name,value,onChange }) => {
  return (
    <>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={value} onChange={onChange} />
        <label className="cheackboxlable">{name}</label>
      </div>
    </>
  );
};

function Filter({ methodPayment, setMethodPayment }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show1, setShow1] = React.useState(true);
  const [show2, setShow2] = React.useState(true);
  const [show3, setShow3] = React.useState(true);

  // Cheak Value Status
  const [UPI, setUPI] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = () => {
    setShow1(!show1);
  };
  const handleClick2 = () => {
    setShow2(!show2);
  };
  const handleClick3 = () => {
    setShow3(!show3);
  };




  const cheakValue = (e) => {
    e.preventDefault();
    setMethodPayment(UPI);
    console.log(methodPayment);
   
  };

  return (
    <div>
      <button
        className="filterdeposite "
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/filter.png"
          alt=""
          width="20px"
          className="mx-2"
        />
        Filter
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
        <div
          className="boxcontainer"
          style={{ height: show1 || show2 || show3 ? "47vh" : "" }}
        >
          <div className="row m-4 ">
            <div className="col-4 ">
              <button className="buttondate" onClick={handleClick1}>
                Method
              </button>
            </div>
            <div className="col-4">
              <button className="buttondate" onClick={handleClick2}>
                Status
              </button>
            </div>
            <div className="col-4">
              <button className="buttondate" onClick={handleClick3}>
                Currency
              </button>
            </div>
          </div>

          {show1 || show2 || show3 ? (
            <form className="row m-4  boxcontainer2">
              <div className="col-4  ">
                {show1 ? (
                  <>
                    <CheakboxComp
                      name="UPI / Other Methods"
                      value="UPI"
                      onChange={(e) => setUPI(e.target.value)}
                    />
                    <CheakboxComp name="Net Banking" />
                    <CheakboxComp name="Card" />
                    <CheakboxComp name="E-Wallet" />
                  </>
                ) : null}
              </div>

              <div className="col-4  ">
                {show2 ? (
                  <>
                    <CheakboxComp name="Success" />
                    <CheakboxComp name="Waiting" />
                    <CheakboxComp name="Pending" />
                    <CheakboxComp name="Refund" />
                    <CheakboxComp name="Failed" />
                  </>
                ) : null}
              </div>
              <div className="col-4  ">
                {show3 ? (
                  <>
                    <CheakboxComp name="INR" />
                    <CheakboxComp name="USD" />
                    <CheakboxComp name="CNY" />
                    <CheakboxComp name="MYR" />
                    <CheakboxComp name="THB" />
                    <CheakboxComp name="IDR" />
                    <CheakboxComp name="VND" />
                  </>
                ) : null}
              </div>
              <div style={{ width: "10rem" }}>
                <button className="buttondate my-4" onClick={cheakValue}>
                  Done
                </button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </Menu>
    </div>
  );
}

export default Filter;
