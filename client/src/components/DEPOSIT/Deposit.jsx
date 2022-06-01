import React, { useEffect, useState } from "react";
import "./deposire.css";
import axios from "axios";
import TableComp from "../../commonComp/Table/TableCom";
import Pagination from "@mui/material/Pagination";
import Search from "../../commonComp/SearchBox/Search";
import FilterDate from "../../commonComp/filterDate/FilterDate";
import Filter from "../../commonComp/filter/Filter";
import Card from "../../commonComp/Card/Card";
import baseUrl from "../../components/config/baseUrl";
import * as XLSX from "xlsx";
const Footer = ({ setPage, page, totalPage }) => {
  const pageNumber = (e, p) => {
    setPage(p);
    console.log(p);
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">Showing 16 from 10 data</div>
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
  methodPayment,
  setMethodPayment,
  currencyPayment,
  setCurrencyPayment,
  statusPayment,
  setStatusPayment,
  tableBodyData,
}) => {
  const downloadExl = () => {
    const workSheet = XLSX.utils.json_to_sheet(tableBodyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, "Deposit.xlsx");
  };
  return (
    <>
      <div className="row justify-content-around  my-5 align-items-center">
        <div className="col-4 ">
          <Search orderNumber={orderNumber} setorderNumber={setorderNumber} />
        </div>
        <div className="col-3 ">
          <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
        </div>
        <div className="col-2 ">
          <Filter
            methodPayment={methodPayment}
            setMethodPayment={setMethodPayment}
            currencyPayment={currencyPayment}
            setCurrencyPayment={setCurrencyPayment}
            statusPayment={statusPayment}
            setStatusPayment={setStatusPayment}
          />
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

function Deposit() {
  // CARD DATA
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/statusResult`, formData, config)
      .then((res) => {
        setCardData((pre) => (pre = res.data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  // +++++++++++++++++++++Table Data++++++++++++++++++++
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  console.log(orderNumber);
  useEffect(() => {
    tabledatafetch();
  }, [page, orderNumber]);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("page", page);
      formData.append("orderNumber", orderNumber);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/show_all`, formData, config);
      setTableBodyData(result.data.data.deposits);
      setTotalPage(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  // Today Yesterday Customise filter
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  //Filter CheackBox

  let [methodPayment, setMethodPayment] = useState([]);
  let [status, setStatusPayment] = useState([]);
  let [currency, setCurrencyPayment] = useState([]);
  // console.log(methodPayment);
  console.log(date, from, to, methodPayment);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    let formData = new FormData();

    if (date) {
      formData.append("date", date);
    } else if (from && to) {
      formData.append("from", from);
      formData.append("to", to);
    } else if (
      methodPayment.length > 0 &&
      status.length > 0 &&
      currency.length > 0
    ) {
      formData.append("methodPayment[]", methodPayment);
      formData.append("status[]", status);
      formData.append("currency[]", currency);
    } else if (methodPayment.length > 0 && status.length > 0) {
      formData.append("methodPayment[]", methodPayment);
      formData.append("status[]", status);
    } else if (status.length > 0 && currency.length > 0) {
      formData.append("status[]", status);
      formData.append("currency[]", currency);
    } else if (methodPayment.length > 0 && currency.length > 0) {
      formData.append("methodPayment[]", methodPayment);
      formData.append("currency[]", currency);
    } else if (methodPayment.length > 0) {
      formData.append("methodPayment[]", methodPayment);
    } else if (status.length > 0) {
      formData.append("status[]", status);
    } else if (currency.length > 0) {
      formData.append("currency[]", currency);
    }else{

    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/searchDateFilter`, formData, config)
      .then((res) => {
        setTotalPage(res.data.data.totalPages);
        console.log(res);
        setTableBodyData((pre) => (pre = res.data.data.deposits));
      })
      .catch((err) => console.log(err));
  }, [date, to, from, methodPayment, page, status, currency]);

  // Search

  return (
    <>
      <h4 className="heading animate__backInDown">Deposit Transactions</h4>
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
            methodPayment={methodPayment}
            setMethodPayment={setMethodPayment}
            currencyPayment={currency}
            setCurrencyPayment={setCurrencyPayment}
            statusPayment={status}
            setStatusPayment={setStatusPayment}
            tableBodyData={tableBodyData}
          />
        </div>
        <div className="col-12">
          <TableComp tableBodyData={tableBodyData} />
        </div>
      </div>

      <Footer setPage={setPage} page={page} totalPage={totalPage} />
    </>
  );
}

export default Deposit;
