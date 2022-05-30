import React, { useEffect, useState } from "react";
import "./atm.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Atm() {
  const [cardflip, setCardflip] = useState(0);
  useEffect(() => {
    AOS.init();
  }, [cardflip]);

  const changeFlip = () => {
    if (cardflip === 5) {
      setCardflip(0);
    } else {
      setCardflip(cardflip + 1);
    }

    console.log(cardflip);
  };

  const AtmCard = ({ flip, bgImg, name }) => {
    return (
      <div className="main">
        <div
          className="atmcard card m-3 "
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
            <div style={{ fontSize: "1.2rem" }}>0.00</div>
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
                <div>05/22</div>
              </div>
              <div className="mx-5">
                <div className="holdername">Month Date</div>
                <div>Katerina Katerina</div>
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
        <AtmCard bgImg="./imges/atm1.svg" name="Deposits" flip="flip-up" />
      ) : cardflip === 1 ? (
        <AtmCard flip="flip-up" bgImg="./imges/atm2.svg" name="Payouts" />
      ) : cardflip === 2 ? (
        <AtmCard flip="flip-up" bgImg="./imges/atm3.svg" name="Settelments" />
      ) : cardflip === 3 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/atm4.svg"
          name="Comission & Charges"
        />
      ) : cardflip === 4 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/atm5.svg"
          name="Rolling Resever"
        />
      ) : cardflip === 5 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/atm6.svg"
          name="Refund and Checkback"
        />
      ) : cardflip === 6 ? (
        <AtmCard
          flip="flip-up"
          bgImg="./imges/atm7.svg"
          name="Available Balance"
        />
      ) : (
        <AtmCard bgImg="./imges/atm1.svg" flip="flip-up" name="Deposits" />
      )}
    </div>
  );
}

export default Atm;
