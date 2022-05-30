import React from 'react'
import './virtual.css'
function Virtual() {
  return (
    <>
      <h4 className="heading">Virtual Terminal</h4>
      <VirtualBlock1 />
      <br />
      <VirtualBlock2 />
      <br />
      <VirtualBlock3 />
    </>
  );
}


const VirtualBlock1 = () =>{
  return (
    <>
      <div className="row mx-4">
        <div className="col-12 dialogBlock1 mb-3 ">
          <form action="" className="row justify-content-around">
            <div className=" col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Customer First Name
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Customer Last Name
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Mobile number
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Email Address
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Description
              </label>
              <input type="text" className="input1" />
            </div>

            <hr style={{ width: "95%" }} />
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Billing Street Number
              </label>
              <input type="text" className="input1"  />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Country
              </label>
              <input type="text" className="input1" />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                State
              </label>
              <input type="text" className="input1" />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                City
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Zip
              </label>
              <input type="text" className="input1" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


const VirtualBlock2 = () =>{
  return (
    <>
      <div className="row mx-4">
        <div className="col-12 dialogBlock1 mb-3 ">
          <form action="" className="row justify-content-around">
            <div className=" col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Invoice #
              </label>
              <input
                type="text"
                className="input1"
                value="165242285262"
                style={{ color: "#BFBFBF" }}
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Sales Amount
              </label>
              <input
                type="text"
                className="input1"
                value="0.00"
                style={{ color: "#BFBFBF" }}
              />
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center text-center mb-4">
              <label htmlFor="" className="mb-2">
                Currency
              </label>
              <select style={{ width: "100px" }}>
                <option value="USD">USD</option>
                <option value="CNY">CNY</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div className="col-md-2 d-flex  justify-content-center ">
              <input type="checkbox" className="input1 mt-1 checkbox1" />
              <label htmlFor="" className="mx-1" style={{color:"black"}}>
                Taxable
              </label>
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Tax Rate (0.00%)
              </label>
              <input
                type="text"
                className="input1"
                value="0.00"
                style={{ fontSize: "14px", color: "#BFBFBF" }}
              />
            </div>
            <hr style={{ width: "95%" }} />
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Sale Amount
              </label>
              <input type="text" className="input1" value="0.00" />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Sub Total
              </label>
              <input type="text" className="input1" value="0.00" />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Tax
              </label>
              <input type="text" className="input1" value="0.00" />
            </div>
            <div className=" col-md-2 d-flex flex-column text-center mt-2 mb-2">
              <label htmlFor="" className="mb-2">
                Total
              </label>
              <input type="text" className="input1" value="000" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const VirtualBlock3 = () =>{
  return (
    <>
      <div className="row mx-4">
        <div className="col-12 dialogBlock1 mb-3 ">
          <form action="" className="row justify-content-around">
            <div className=" col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Credit/Debit Card Number
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Month
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                Year
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="col-md-2 d-flex flex-column text-center mb-4">
              <label htmlFor="" className="mb-2">
                CVV
              </label>
              <input type="text" className="input1" />
            </div>
            <div className="text-end">
              <button className="buttonv2">Process Payment</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Virtual