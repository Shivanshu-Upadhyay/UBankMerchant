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
import jsPDF from "jspdf";
import  "jspdf-autotable";
const Footer = ({ setPage, page }) => {
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
            count={10}
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
  tableBodyData
}) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    // doc.text("Deposit Data", 100, 10)
    doc.autoTable({
      theme:"grid",
      columns: [
        { header: "Order Id", dataKey: "order_no" },
        { header: "Date", dataKey: "created_on" },
        { header: "Customer Name", dataKey: "i_flname" },
        { header: "Amount", dataKey: "ammount" },
        { header: "Currency", dataKey: "ammount_type" },
        { header: "Method", dataKey: "payment_type" },
        { header: "Settled Amount", dataKey: "settle_amount" },
        
      ],
      body: tableBodyData,
    });
    doc.save("table.pdf");
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
          />
        </div>
        <div className="col-3 ">
          <button className="downloadDeposite" onClick={downloadPdf}>
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
  const [cardData, setCardData] = useState([]);

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

    axios
      .post(`${baseUrl}/show_all`, formData, config)
      .then((res) => {
        setTableBodyData((pre) => (pre = res.data.data.deposits));
      })
      .catch((err) => console.log(err));
  }, [page, orderNumber]);

  // Today Yesterday Customise filter
  const [date, setDate] = useState("");
  const [tabledata2, settableData2] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  //Filter CheackBox

  const [methodPayment, setMethodPayment] = useState("UPI");

  useEffect(() => {
    const auth = localStorage.getItem("user");

    let formData = new FormData();
    formData.append("date", date);
    formData.append("to", to);
    formData.append("from", from);
    // formData.append("methodPayment", methodPayment);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/searchDateFilter`, formData, config)
      .then((res) => {
        settableData2((pre) => (pre = res.data.data.deposits));
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [date, to, from]);

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
            tableBodyData={date || to || from ? tabledata2 : tableBodyData}
          />
        </div>
        <div className="col-12">
          <TableComp
            tableBodyData={date || to || from ? tabledata2 : tableBodyData}
          />
        </div>
      </div>

      <Footer setPage={setPage} page={page} />
    </>
  );
}

export default Deposit;
