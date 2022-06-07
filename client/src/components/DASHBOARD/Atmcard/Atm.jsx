import React, { useEffect, useState } from "react";
import "./atm.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Atm({ atmData }) {
  const [cardflip, setCardflip] = useState(0);
  useEffect(() => {
    AOS.init();
  }, [cardflip]);

  const changeFlip = () => {
    if (cardflip === 6) {
      setCardflip(0);
    } else {
      setCardflip(cardflip + 1);
    }
  };

  const AtmCard = ({ flip, bgImg, name,holderName ,date,amount}) => {
    return (
      <div className="mainAtmDiv">
        <div
          className="atmcard card"
          data-aos={flip}
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        >
          <div className="container">
            <h5
              className="my-3"
              style={{ fontSize: "16px", fontWeight: "700" }}
            >
              {name}
            </h5>
            <div style={{ fontSize: "1.2rem" }}>{amount}</div>
            <br />
            <br />
            <div
              className="text-end  "
              style={{ fontSize: "16px", fontWeight: "700" }}
            >
              * * ** 62
            </div>
            <br />
            <div className="d-flex justify-content-between ">
              <div className="mx-3">
                <div className="holdername">Month Date</div>
                <div>{date}</div>
              </div>
              <div className="mx-5">
                <div className="holdername">Merchant Name</div>
                <div>{holderName}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src="./imges/shadowcard.svg" alt="" className="shadowimg" />
          <img
            src="./imges/changeAtm.svg"
            alt=""
            className=" changeatm "
            onClick={changeFlip}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {cardflip === 0 ? (
        <AtmCard
          bgImg="./imges/greenAtm.svg"
          name="Deposits"
          flip="flip-up"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.deposit}
        />
      ) : cardflip === 1 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/orangAtm.svg"
          name="Payouts"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.payout}
        />
      ) : cardflip === 2 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/darkBlue.svg"
          name="Settelments"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.settlement}
        />
      ) : cardflip === 3 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/purpleAtm.svg"
          name="Comission & Charges"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.charges}
        />
      ) : cardflip === 4 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/redAtm.svg"
          name="Rolling Resever"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.roll_reverse}
        />
      ) : cardflip === 5 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/pinkAtm.svg"
          name="Refund and Checkback"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount='00.00'
        />
      ) : cardflip === 6 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/ligrtBlueAtm.svg"
          name="Available Balance"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.avilable_amt}
        />
      ) : (
        <AtmCard
          bgImg="./imges/atm1.svg"
          flip="flip-up"
          name="Deposits"
          date={atmData.date}
          holderName={atmData.i_flname}
          amount={atmData.deposit}
        />
      )}
    </div>
  );
}

export default Atm;
