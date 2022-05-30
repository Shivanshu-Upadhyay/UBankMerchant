import React, { useState } from "react";
import "./statements.css";
function Statements() {
  return (
    <>
      <h4 className="heading mx-3">Statements</h4>
      <Block1 />
      <br />
      <Block2 />
    </>
  );
}

const Block1 = () => {
  const date = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
  const [activ, setActive] = useState(2022);

  const increment = () => {
    setActive(activ + 1);
  };
  const deccrement = () => {
    setActive(activ - 1);
  };

  return (
    <>
      <h6 className="mx-3">Statements Years</h6>
      <div className="containerShadow mx-3 d-flex  ">
        <div className=" d-flex secondDiv">
          <div className="firstArr">
            <img
              src="https://www.bankconnect.online/assets/merchants/img/previous.svg"
              height="37px"
              onClick={deccrement}
              alt="not found"
            />
            
          </div>
          {date.map((item, index) => {
            return (
              <div
                key={index}
                className={activ === item ? "yearblock active" : "yearblock"}
                onClick={() => setActive(item)}
              >
                {item}
              </div>
            );
          })}
          <div className="secondArr">
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/next.svg"
              alt=""
              height="37px"
              onClick={increment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Month = ({ name }) => {
  return (
    <>
      <div className="d-flex justify-content-between m-3 monthBlock">
        <h6>{name}</h6>
        <button className="download">
          <img
            src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
            alt="not"
            width="17px"
            className="mx-2"
          />
          Download Reporst
        </button>
      </div>
      <hr className="border" />
    </>
  );
};

const Block2 = () => {
  return (
    <>
      <div className="containerShadow mx-3 my-4">
        <Month name="January" />
        <Month name="February" />
        <Month name="March" />
        <Month name="April" />
        <Month name="May" />
        <Month name="June" />
        <Month name="July" />
        <Month name="August" />
        <Month name="September" />
        <Month name="October" />
        <Month name="November" />
        <Month name="December" />
      </div>
    </>
  );
};

export default Statements;
