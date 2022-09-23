import React, { useEffect, useState } from "react";
import "../DEPOSIT/deposire.css";
import axios from "axios";
import PayoutTable from "./PayoutTable";
import Pagination from "@mui/material/Pagination";
import Search from "../../commonComp/SearchBox/Search";
import FilterDate from "../../commonComp/filterDate/FilterDate";
import Card from "../../commonComp/Card/Card";
import baseUrl from "../../components/config/baseUrl";
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
    XLSX.writeFile(workBook, "Payout.xlsx");
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

function Payout() {
  // CARD DATa
  const [cardData, setCardData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [xlData, setXlData] = useState([]);
  const[message,setMessage]=useState("")
  const { setActive } = useStateContext();

  console.log(cardData)
  
  useEffect(() => {
    setActive(2);
    const auth = localStorage.getItem("user");
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${auth}`,
      },
    };

    axios
      .post(`${baseUrl}/payoutheader`, formData, config)
      .then((res) => {
        setCardData((pre) => (pre = res.data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  // +++++++++++++++++++++Table Data++++++++++++++++++++
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const [orderNumber, setorderNumber] = useState("");
  // Today Yesterday Customise filter
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  console.log(orderNumber);
  useEffect(() => {
    tabledatafetch();
  }, [page, orderNumber, date, to, from]);

  const tabledatafetch = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("page", page);
      formData.append("uniqueid", orderNumber);
      formData.append("Date", date);
      formData.append("to", to);
      formData.append("from", from);

      if (orderNumber) {
        formData.append("filterType", 2);
      }
      else if (date) {
        formData.append("filterType", 3);
      }
      else if (to && from) {
        formData.append("filterType", 4);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/filter`, formData, config);
      let newData = result.data.data.map((item)=>{
        function convertTZ(date, tzString) {
          date.replace('Z',"")
         let dateTime = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString})); 
         dateTime =  dateTime.toDateString() +" "+ dateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,})
           return dateTime
      }
        let data ={...item,created_on:convertTZ(item.created_on,JSON.parse(localStorage.getItem('timeZone')).timeZone)}
       return data
       
      })
      
      setTableBodyData(newData);
      setTotalPage(result.data.totalPage);
      setMessage(result.data.message)
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <h4 className="heading animate__backInDown">Payout Transactions</h4>
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
          <PayoutTable
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

export default Payout;
