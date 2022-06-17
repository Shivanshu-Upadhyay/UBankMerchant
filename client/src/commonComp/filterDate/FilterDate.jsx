import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import "./filter.css";
function FilterDate({ setDate, setTo, setFrom }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [todate, SetToDate] = useState("");
  const [fromdate, SetToFromDate] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYesterday = () => {
    let today = new Date();
    today.setDate(today.getDate())
   
    let year =
      today.getFullYear() +
      "-" +
      0 +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() - 1);
    console.log(year);
    setDate(year);
    handleClose();
  };

  const handleToday = () => {
    let today = new Date();
    let year =
      today.getFullYear() +
      "-" +
      0 +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
       console.log(year);

    setDate(year);
    handleClose();
  };

  const filterFun = (e) => {
    e.preventDefault();
    setDate((pre) => (pre = undefined));
    setTo(fromdate);
    setFrom(todate);

    console.log(todate,fromdate);
    handleClose();
    
  };

  return (
    <>
      <button
        className="filterdate"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/calender.svg"
          alt=""
          className="mx-2"
        />
        Filter Date
        <img
          src="https://www.bankconnect.online/assets/merchants/img/cev-down.svg"
          alt=""
          className="mx-2"
        />
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
        <div className="row m-4">
          <div className="col-4">
            <button className="buttondate" onClick={handleYesterday}>
              Yesterday
            </button>
          </div>
          <div className="col-4">
            <button className="buttondate" onClick={handleToday}>
              Today
            </button>
          </div>
          <div className="col-4">
            <button className="buttondate" onClick={() =>setShow(!show)}>
              Customize
            </button>
          </div>
        </div>

        {show ? (
          <form className="row m-4 align-items-center ">
            <div className="col-12 d-flex ">
              <input
                type="date"
                className="dateinput col-5 `"
                value={todate}
                onChange={(e) => SetToDate(e.target.value)}
              />
              <div className="col-2 text-center mt-2">
                <b>To</b>
              </div>
              <input
                type="date"
                className="dateinput col-4"
                value={fromdate}
                onChange={(e) => SetToFromDate(e.target.value)}
              />
            </div>
            <button className="lastbottonfilter mt-5" onClick={filterFun}>
              Filter
            </button>
          </form>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
}

export default FilterDate;
