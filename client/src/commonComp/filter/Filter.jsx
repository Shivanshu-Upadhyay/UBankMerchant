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

function Filter({
  methodPayment,
  setMethodPayment,
  currencyPayment,
  setCurrencyPayment,
  statusPayment,
  setStatusPayment,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show1, setShow1] = React.useState(true);
  const [show2, setShow2] = React.useState(true);
  const [show3, setShow3] = React.useState(true);

  // Cheak Value Status
  const [methordData,setMethordData] = useState([])
  
  // Status
  const [statusData,setStatusData]=useState([])

  // Currency
  const [currencyData,setCurrencyData]=useState([])
  

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
    setMethodPayment(methordData);
    setStatusPayment(statusData);
    setCurrencyPayment(currencyData);
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
                      onChange={(e) =>
                        setMethordData([...methordData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Net Banking"
                      value="NETBANKING"
                      onChange={(e) =>
                        setMethordData([...methordData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Card"
                      value="CARD"
                      onChange={(e) =>
                        setMethordData([...methordData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="E-Wallet"
                      value="EWALLET"
                      onChange={(e) =>
                        setMethordData([...methordData, e.target.value])
                      }
                    />
                  </>
                ) : null}
              </div>

              <div className="col-4  ">
                {show2 ? (
                  <>
                    <CheakboxComp
                      name="Success"
                      value={1}
                      onChange={(e) =>
                        setStatusData([...statusData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Waiting"
                      value={2}
                      onChange={(e) =>
                        setStatusData([...statusData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Pending"
                      value={3}
                      onChange={(e) =>
                        setStatusData([...statusData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Refund"
                      value={4}
                      onChange={(e) =>
                        setStatusData([...statusData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="Failed"
                      value={0}
                      onChange={(e) =>
                        setStatusData([...statusData, e.target.value])
                      }
                    />
                  </>
                ) : null}
              </div>
              <div className="col-4  ">
                {show3 ? (
                  <>
                    <CheakboxComp
                      name="INR"
                      value="INR"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="USD"
                      value="USD"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="CNY"
                      value="CNY"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="MYR"
                      value="MYR"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="THB"
                      value="THB"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="IDR"
                      value="IDR"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
                    <CheakboxComp
                      name="VND"
                      value="VND"
                      onChange={(e) =>
                        setCurrencyData([...currencyData, e.target.value])
                      }
                    />
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
