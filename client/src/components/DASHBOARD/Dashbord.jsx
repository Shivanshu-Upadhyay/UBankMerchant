import React, { useEffect, useState } from "react";
import Atm from "./Atmcard/Atm";
import ChartBlock from "./ChartBlock1/ChartBlock";
import Diposite from "./Diposite/Diposite";
import Currency from "./Currency/Currency";
import Transition from "./Transition/Transition";
import WeeklyBarGraph from "../../components/REACTGRAPH/WeeklyBarGraph";
import Loader from "../../components/Loader/Loader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MonthlyBarGraph from "../../components/REACTGRAPH/MonthlyBarGraph";
import "./style.css";
import Wave from "react-wavify";
import { card_data, payment_type, success_rate } from "../../Api";

function Dashbord() {
  const [success, setSuccess] = useState("");
  const [atmData, setAtmData] = useState([]);
  const [paymentData, setPaymentData] = useState();
  const [graphval, setGraphVal] = useState("month");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    paymentType();
    cardDetails();
    successRate();
  }, []);

  const successRate = async () => {
    try {
      const { data } = await success_rate();
      setSuccess(data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const cardDetails = async () => {
    try {
      const { data } = await card_data();
      setAtmData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const paymentType = async () => {
    try {
      const { data } = await payment_type();
      setPaymentData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const monthfun = () => {
    setAnchorEl(null);
    setGraphVal("month");
  };
  const weekfun = () => {
    setAnchorEl(null);
    setGraphVal("week");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-4">
          <Atm atmData={atmData} />
        </div>
        <div className="col-1 d-flex  flex-column">
          <div className="liquedblock">
            <Wave
              fill="#1caae8"
              paused={false}
              options={{
                amplitude: 10,
                speed: 0.5,
                points: 3,
              }}
              style={{
                position: "relative",
                height: `${success}%`,
                top: `${100 - success}%`,
              }}
            />
          </div>
          <div className="text-center">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "14px",
                width: "6rem",
                marginTop: "7px",
              }}
            >
              {success}% <br />
              Success Rate
            </h6>
          </div>
        </div>
        <div className="col-6">
          <ChartBlock />
        </div>
        {/* Transaction Overview Deposits*/}
        <div className="col-6 chartblockshdow" style={{ width: "49%" }}>
          <div className="d-flex justify-content-between mb-5">
            <h5 style={{ fontWeight: "600", fontSize: "18px" }}>
              Transaction Overview
            </h5>
            <div>
              <button
                className="mx-2"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  padding: "5px 10px",
                }}
              >
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/download.svg"
                  alt=""
                />
                Download Reports
              </button>
              <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  border: "none",
                  borderRadius: "20px",
                  padding: "5px 10px",
                }}
              >
                <img
                  src="	https://www.bankconnect.online/assets/merchants/img/more.svg"
                  alt=""
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
              >
                <MenuItem onClick={monthfun}>Monthly</MenuItem>
                <MenuItem onClick={weekfun}>Weekly</MenuItem>
              </Menu>
            </div>
          </div>
          {graphval === "month" ? <MonthlyBarGraph /> : <WeeklyBarGraph />}
        </div>
        <div className="col-6 chartblockshdow" style={{ width: "49%" }}>
          <Diposite paymentData={paymentData} />
        </div>
        {/* Deposits By Currency Top Transactions */}
        <div className="col-6 chartblockshdow my-3" style={{ width: "49%" }}>
          <Currency />
        </div>
        <div className="col-6 chartblockshdow my-3" style={{ width: "49%" }}>
          <Transition />
        </div>
      </div>
    </>
  );
}

export default Dashbord;
