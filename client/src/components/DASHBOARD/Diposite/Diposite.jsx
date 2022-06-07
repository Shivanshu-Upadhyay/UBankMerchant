import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./diposite.css";
function Diposite({ paymentData }) {
  return (
    <>
      <div className="row mx-3 pb-5 maincontainer">
        <div className="col-2">
          <h4 className="headingDepo my-3">Deposits</h4>
          <div className="Baged ">
            <span className="mx-3 textDepoDash">UPI/APM</span>
            <div className="mx-3 text-bottom text2">
              
              {/* {paymentData.upi.total?paymentData.upi.total:"00.00"} */}
            </div>
          </div>
          <div className="Baged my-3" style={{ background: "#41d4a8" }}>
            <span className="mx-3 textDepoDash">Net Banking</span>
            <div className="mx-3 text-bottom text2">
              {/* {paymentData.netbanking.total?paymentData.netbanking.total:"00.00"} */}
            </div>
          </div>
          <div className="Baged my-3" style={{ background: "#1EB6E7" }}>
            <span className="mx-3 textDepoDash">Wallet</span>
            <div className="mx-3 text-bottom text2">
              {/* {paymentData.wallet.total?paymentData.wallet.total:"00.00"} */}
            </div>
          </div>
          <div className="Baged my-3" style={{ background: "#471EE8" }}>
            <span className="mx-3 textDepoDash">Card</span>
            <div className="mx-3 text-bottom text2">
              {/* {paymentData.card.total?paymentData.card.total:"00.00"} */}
            </div>
          </div>
        </div>
        <div className="col-8 row  block2 align-items-center my-3 ">
          <div className="col-6 text-center">
            <div className="firstProgress">
              <CircularProgressbar
                value={66}
                text={"55%"}
                styles={buildStyles({
                  textColor: "white",
                })}
              />
              <h6 className="downtext">UPI/APM</h6>
            </div>
          </div>
          <div className="col-6  text-center">
            <div className="secondProgress">
              <CircularProgressbar
                value={66}
                text={"55%"}
                styles={buildStyles({
                  textColor: "white",
                })}
              />
              <h6 className="downtext">Net Banking</h6>
            </div>
          </div>
          <div className="col-6 text-center">
            <div className="thirdProgress">
              <CircularProgressbar
                value={66}
                text={"55%"}
                styles={buildStyles({
                  textColor: "black",
                })}
              />
              <h6 className="downtext" style={{ color: "black" }}>
                Wallet
              </h6>
            </div>
          </div>
          <div className="col-6 text-center">
            <div className="foreProgress">
              <CircularProgressbar
                value={66}
                text={"55%"}
                styles={buildStyles({
                  textColor: "white",
                })}
              />
              <h6 className="downtext">Card</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Diposite;
