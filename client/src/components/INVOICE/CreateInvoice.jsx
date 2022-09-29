import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../../components/config/baseUrl";
import { useStateContext } from "../../context/ContextProvider";

import { useEffect } from "react";
function CreateInvoice() {
  const todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
 
  
  const [Invoice, setInvoice] = useState(Math.trunc(Math.random() * 100000000000000));
  const [SendDate, setSendDate] = useState(todayDate());
  const [DueDate, setDueDate] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [SaleAmount, setSaleAmount] = useState("");
  const [Currency, setCurrency] = useState("");
  const [TaxRate, setTaxRate] = useState("");
  const [taxtAble, setTaxable] = useState(false);
  let [Tax, setTax] = useState("");
  const[description, setDescription] = useState("");
  

  // Send Api Data to Server
  
  const sendInvoice = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("invoice_no", Invoice);
      formData.append("send_date", SendDate);
      formData.append("due_date", DueDate);
      formData.append("fname", FirstName);
      formData.append("lname", LastName);
      formData.append("email",EmailAddress);
      formData.append("amount", SaleAmount);
      formData.append("currency", Currency);
      formData.append("description", Invoice);
      formData.append("taxable", taxtAble);
      formData.append("tax", TaxRate);

      console.log(Invoice);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/new_invoice`, formData, config);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <h4 style={{ fontWeight: "800" }}>Create New Invoice</h4>
      <div className="row ">
        <div className="col-12 dialogBlock1">
          <form action="" className="row justify-content-around">
            <div className=" col-md-4 d-flex flex-column text-center">
              <label htmlFor="" className="forminputDeposite">
                Invoice No
              </label>
              <input
                type="text"
                className="input1"
                defaultValue={Invoice}
                name="Invoice"
              />
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <label htmlFor="" className="forminputDeposite">
                Send Date
              </label>
              <input
                type="date"
                className="input1"
                value={SendDate}
                name="SendDate"
                onChange={(e) => setSendDate(e.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <label htmlFor="" className="forminputDeposite">
                Due Date
              </label>
              <input
                type="date"
                className="input1"
                value={DueDate}
                name="DueDate"
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <hr style={{ width: "95%" }} />

            <div className=" col-md-4 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                First Name
              </label>
              <input
                type="text"
                className="input1"
                value={FirstName}
                name="FirstName"
                onChange={ (e) => setFirstName(e.target.value) }
              />
            </div>
            <div className=" col-md-4 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                Last Name
              </label>
              <input
                type="text"
                className="input1"
                value={LastName}
                name="LastName"
                onChange={ (e) => setLastName(e.target.value) }
              />
            </div>
            <div className=" col-md-4 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                Email Address
              </label>
              <input
                type="text"
                className="input1"
                value={EmailAddress}
                name="EmailAddress"
                onChange={ (e) => setEmailAddress(e.target.value) }
              />
            </div>

            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                Sale Amount
              </label>
              <input
                type="text"
                className="input1"
                value={SaleAmount}
                name="SaleAmount"
                onChange={ (e) => setSaleAmount(e.target.value) }
              />
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-center align-items-center  ">
              <label htmlFor="" className="forminputDeposite">
                Currency
              </label>
              <select
                className="form-select form-select-sm mb-3 boldOption"
                value={Currency}
                onChange={ (e) => setCurrency(e.target.value) }
                name="Currency"
                style={{ width: "50%" }}
              >
                <option defaultValue={null}>Please Select</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <div className="col-md-2 d-flex text-center">
              <input
                type="checkbox"
                className="input1 mx-1"
                style={{ height: "17px", width: "17px" }}
                checked={taxtAble}
                onChange={() => setTaxable(!taxtAble)}
              />
              <label htmlFor="" className="forminputDeposite">
                Taxable
              </label>
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                Tax Rate (0.00%)
              </label>
              <input
                type="text"
                className="input1"
                value={TaxRate}
                name="TaxRate"
                onChange={ (e) => setTaxRate(e.target.value) }
                placeholder="0.00%"
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label htmlFor="" className="forminputDeposite">
                Tax
              </label>
              <input
                type="text"
                className="input1"
                value={
                  taxtAble
                    ? (Tax =
                        (SaleAmount * TaxRate) / 100)
                    : (Tax = 0)
                }
                name="Tax"
                placeholder="0.00"
              />
            </div>

            <hr style={{ width: "95%" }} />
            <div className="col-md-3">
              <div
                className="dilogfirstbutton d-flex  align-items-center"
                style={{ width: "75%" }}
              >
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                  alt=""
                  width="45px"
                />
                <div className="mx-2">
                  <h6 style={{ color: "#000009" }}>Total Amount</h6>
                  <h6 style={{ fontWeight: "600", fontSize: "18px" }}>
                    {Number(SaleAmount) + Number(Tax)}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-end">
              <div onClick={sendInvoice}>
                <span
                  className="dilogrefund mx-3"
                  style={{ background: "#1EAAE7", color: "#fff" }}
                >
                  <img
                    src="https://www.bankconnect.online/assets/merchants/img/send.png"
                    alt="n"
                    width="25px"
                    className="mx-1"
                  />
                  Send Invoice
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" dialogBlock1 row my-3 ">
        <div className="col-8">
          <h4>
            <b>Invoice Description</b>
          </h4>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="createInvoiceTeaxtArea"
            style={{}}
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, unde voluptatem? Explicabo modi facilis at. Magnam reiciendis quod omnis modi magni exercitationem, laboriosam impedit non pariatur veritatis sed fuga eaque.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odio mollitia non dignissimos explicabo molestiae dicta obcaecati quibusdam saepe. Et, quos eaque soluta magnam eos dignissimos sunt maiores necessitatibus alias."
          ></textarea>
        </div>
        <div className="col-4">
          <div className="mainAtmDiv">
            <div
              className="atmcard card"
              style={{
                backgroundImage: `url("https://www.bankconnect.online/assets/merchants/img/card-blue.svg")`,
                height: "17rem",
              }}
            >
              <div className="container">
                <h5
                  className="mt-4"
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  Total Amount
                </h5>
                <div style={{ fontSize: "1.2rem" }}>
                  {Number(SaleAmount) + Number(Tax)}
                </div>
                <br />
                <br />
                <div
                  className="text-end  "
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  {Invoice}
                </div>
                <br />
                <div className="d-flex justify-content-between ">
                  <div className="mx-3">
                    <div className="holdername" style={{ color: "#fff" }}>
                      Due Date
                    </div>
                    <div>
                      {DueDate ? DueDate : "00/00/0000"}
                    </div>
                  </div>
                  <div className="mx-5">
                    <div className="holdername" style={{ color: "#fff" }}>
                      Customer Name
                    </div>
                    <div>
                      {FirstName || LastName
                        ? FirstName + " " + LastName
                        : "xyz"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;
