import React, { useEffect, useState } from "react";
import "../DEPOSIT/deposire.css";
import axios from "axios";
import SettlementTable from "./SettlementTable";
import Pagination from "@mui/material/Pagination";
import Search from "../../commonComp/SearchBox/Search";
import FilterDate from "../../commonComp/filterDate/FilterDate";
import Card from "../../commonComp/Card/Card";
import baseUrl from "../../components/config/baseUrl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateContext } from "../../context/ContextProvider";
import * as XLSX from "xlsx";
const Footer = ({ setPage, page, totalPage, message }) => {
  const pageNumber = (e, p) => {
    setPage(p);
    console.log(p);
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">{message}</div>
        </div>
        <div className="col-4">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={5}
            siblingCount={0}
            size="large"
            color="primary"
            onChange={pageNumber}
          />
        </div>
      </div>
    </>
  );
};

const SecondBlock = ({
  orderNumber,
  setorderNumber,
  setDate,
  setFrom,
  setTo,
  xlData,
  setXlData,
}) => {
  const downloadExl = () => {
    console.log(xlData);
    const workSheet = XLSX.utils.json_to_sheet(xlData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, "Settlement.xlsx");
  };
  return (
    <>
      <div className="row justify-content-around  my-5 align-items-center">
        <div className="col-3 ">
          <Search orderNumber={orderNumber} setorderNumber={setorderNumber} />
        </div>
        <div className="col-2 ">
          <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
        </div>

        <div className="col-3 ">
          <DialogOpenModel />
        </div>
        <div className="col-3 ">
          <button className="downloadDeposite" onClick={downloadExl}>
            <img
              src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
              alt=""
              width="20px"
              className="mx-2"
            />
            Download Reports
          </button>
        </div>
      </div>
    </>
  );
};

// Dialog +++++++++++++++++++++++++++++++++++++++++++++=

const DialogOpenModel = () => {
  const [open, setOpen] = React.useState(false);
  const [settelmentId, setSettelmentId] = React.useState(
    Math.trunc(Math.random() * 1000000)
  );
  const [settleType, setSettleType] = React.useState("");
  const [fromCurrency, setFromCurrency] = React.useState("");
  const [toCurrency, setToCurrency] = React.useState("USDT");
  const [walletAdd, setWalletAdd] = React.useState("");
  const [accountN, setAccountN] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [branchName, setBranchName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [swift, setSwift] = React.useState("");
  const [requestedAmount, setRequestedAmount] = React.useState("");
  const [fees, setFees] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RequestSettlement = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("settelmentId", settelmentId);
      formData.append("settleType", settleType);
      formData.append("currency", fromCurrency);
      formData.append("toCurrency", toCurrency);
      formData.append("walletAddress", walletAdd);
      formData.append("accountNumber", accountN);
      formData.append("bankName", bankName);
      formData.append("branchName", branchName);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("swiftCode", swift);
      formData.append("requestedAmount", requestedAmount);
      formData.append("fees", fees);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

       await axios.post(
        `${baseUrl}/requestSettlement`,
        formData,
        config
      );

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

 
  return (
    <>
      <div>
        <button className="downloadDeposite" onClick={handleClickOpen}>
          <img
            src="https://www.bankconnect.online/assets/merchants/img/sattlement.svg"
            alt=""
            width="20px"
            className="mx-2"
          />
          Request a Settlement
        </button>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={false}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "700", fontSize: "20px" }}
          >
            Settlement Request
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 dialogBlock1">
                <form action="" className="row justify-content-around">
                  <div className=" col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Settlement ID
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={settelmentId}
                      onChange={(e) => {
                        setSettelmentId(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Settlement Type
                    </label>
                    <select
                      className="form-select form-select-sm mb-3 boldOption"
                      required
                      defaultValue={"default"}
                      onChange={(e) => setSettleType(e.target.value)}
                    >
                      <option value={"default"} disabled>
                        Select
                      </option>
                      <option value="FIAT">FIAT</option>
                      <option value="CRYPTO">CRYPTO</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      From Currency
                    </label>
                    <select
                      className="form-select form-select-sm mb-3 boldOption"
                      required
                      defaultValue={"default"}
                      onChange={(e) => setFromCurrency(e.target.value)}
                    >
                      <option value={"default"} disabled>
                        Select
                      </option>
                      <option value="CNY">CNY</option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="VND">VND</option>
                      <option value="IDR">IDR</option>
                      <option value="THB">THB</option>
                      <option value="MYR">MYR</option>
                      <option value="PHP">PHP</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      To Currency
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={toCurrency}
                      disabled
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={walletAdd}
                      onChange={(e) => setWalletAdd(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={accountN}
                      onChange={(e) => setAccountN(e.target.value)}
                    />
                  </div>
                  <hr style={{ width: "95%" }} />
                  {settleType === "CRYPTO" ? null : (
                    <>
                      <div className=" col-md-2 d-flex flex-column text-center  ">
                        <label
                          htmlFor=""
                          className="forminputDeposite"
                          style={{ fontWeight: "700", color: "#000" }}
                        >
                          Bank Name
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      </div>
                      <div className=" col-md-4 d-flex flex-column text-center  ">
                        <label
                          htmlFor=""
                          className="forminputDeposite"
                          style={{ fontWeight: "700", color: "#000" }}
                        >
                          Branch Name
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={branchName}
                          onChange={(e) => setBranchName(e.target.value)}
                        />
                      </div>
                      <div className=" col-md-2 d-flex flex-column text-center  ">
                        <label
                          htmlFor=""
                          className="forminputDeposite"
                          style={{ fontWeight: "700", color: "#000" }}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className=" col-md-2 d-flex flex-column text-center  ">
                        <label
                          htmlFor=""
                          className="forminputDeposite"
                          style={{ fontWeight: "700", color: "#000" }}
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2 d-flex flex-column text-center  ">
                        <label
                          htmlFor=""
                          className="forminputDeposite"
                          style={{ fontWeight: "700", color: "#000" }}
                        >
                          SWIFT/SEPA Code
                        </label>
                        <input
                          type="text"
                          className="input1"
                          value={swift}
                          onChange={(e) => setSwift(e.target.value)}
                        />
                      </div>

                      <hr style={{ width: "95%" }} />
                    </>
                  )}

                  {/* lOGICAL AREA */}

                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Requested Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={requestedAmount}
                      onChange={(e) => setRequestedAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Fees/Charges(%)
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Total Charges
                    </label>
                    <input type="text" className="input1" value={fees / 10} />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Net Amount
                    </label>
                    <input
                      type="text"
                      className="input1"
                      value={requestedAmount - fees / 10}
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column text-center  ">
                    <label
                      htmlFor=""
                      className="forminputDeposite"
                      style={{ fontWeight: "700", color: "#000" }}
                    >
                      Exchange Rate
                    </label>
                    <input type="text" className="input1" />
                  </div>

                  <hr style={{ width: "95%" }} />
                  <div className="col-md-3">
                    <div
                      
                      className="dilogfirstbutton d-flex  align-items-center justify-content-center"
                    >
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                        alt=""
                        width="35px"
                      />
                      <div className="mx-2 w-100">
                        <h6
                          style={{
                            color: "#000009",
                            fontSize: "10px",
                            fontWeight: "600",
                          }}
                        >
                          Settlement Amount
                        </h6>
                        <h6
                          style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "10px",
                          }}
                        >
                          {requestedAmount - fees / 10}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex align-items-center justify-content-end">
                    <div>
                      <span
                        onClick={() => {
                          RequestSettlement();
                          
                        }}
                        className="downloadDeposite px-4"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src="https://www.bankconnect.online/assets/merchants/img/send.png"
                          alt=""
                          width="20px"
                          className="mx-2"
                        />
                        Submit Request
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

// Dialog +++++++++++++++++++++++++++++++++++++++++++++= End+++++++

function Settlement() {
  // CARD DATa
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [xlData, setXlData] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tableBodyData, setTableBodyData] = useState([]);
  const { setActive } = useStateContext();

  // +++++++++++++++++++++Table Data++++++++++++++++++++

  useEffect(() => {
    tabledatafetch();
    setActive(3)
  }, [page, orderNumber, date, to, from]);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      if (date) {
        formData.append("date", date);
        formData.append("page", page);
      } else if (from && to) {
        formData.append("from", from);
        formData.append("to", to);
        formData.append("page", page);
      } else if (orderNumber) {
        formData.append("settlementId", orderNumber);
        formData.append("page", page);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/settlemetnt_Trans`,
        formData,
        config
      );

      setCardData(result.data.card);
      setTableBodyData(result.data.data);
      setTotalPage(result.data.totalPage);
      setMessage(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4 className="heading animate__backInDown">Settlement Transactions</h4>
      <div className="row">
        <div className="col-12">
          <Card carddata={cardData} />
        </div>
        <div className="col-12">
          <SecondBlock
            orderNumber={orderNumber}
            setorderNumber={setorderNumber}
            setDate={setDate}
            setFrom={setFrom}
            setTo={setTo}
            tableBodyData={tableBodyData}
            xlData={xlData}
            setXlData={setXlData}
          />
        </div>
        <div className="col-12">
          <SettlementTable
            tableBodyData={tableBodyData}
            xlData={xlData}
            setXlData={setXlData}
          />
        </div>
      </div>

      <Footer
        setPage={setPage}
        page={page}
        totalPage={totalPage}
        message={message}
      />
    </>
  );
}

export default Settlement;
