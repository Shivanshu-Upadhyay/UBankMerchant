import React, { useEffect, useState } from "react";
import Atm from "./Atmcard/Atm";
import ChartBlock from "./ChartBlock1/ChartBlock";
import Diposite from "./Diposite/Diposite";
import Currency from "./Currency/Currency";
import Transition from "./Transition/Transition";
import baseUrl from "../../components/config/baseUrl";
import axios from "axios";
import "./style.css";

function Dashbord() {
  const [success,setSuccess]=useState('')
  const [atmData,setAtmData] = useState([])
  const [paymentData,setPaymentData] = useState()
  useEffect(() => {
    paymentType();
    cardDetails();
    successRate();
    
  }, []);

  const successRate = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/success_rate`,
        formData,
        config
      );
      
      setSuccess(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cardDetails = async()=>{
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/card_data`, formData, config);
      
      setAtmData(result.data.data[0]);
      
    } catch (error) {
      console.log(error);
    }
  }

  const paymentType = async()=>{
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/payment_type`,
        formData,
        config
      );
      console.log(result.data.data.upi.total);
      setPaymentData((pre) => pre = result.data.data);
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-4">
          <Atm atmData={atmData} />
        </div>
        <div className="col-1 d-flex  flex-column">
          <div className="liquedblock">
            <div className="waveLiqued" style={{ height: `${success}%` }}></div>
          </div>
          <div className="text-center">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "14px",
                width: "6rem",
                marginTop: "7px",
              }}
            >
              {success}% <br />
              Success Rate
            </h6>
          </div>
        </div>
        <div className="col-6">
          <ChartBlock />
        </div>
        {/* Transaction Overview Deposits*/}
        <div className="col-6 chartblockshdow" style={{ width: "49%" }}></div>
        <div className="col-6 chartblockshdow" style={{ width: "49%" }}>
          <Diposite paymentData={paymentData} />
        </div>
        {/* Deposits By Currency Top Transactions */}
        <div className="col-6 chartblockshdow my-3" style={{ width: "49%" }}>
          <Currency />
        </div>
        <div className="col-6 chartblockshdow my-3" style={{ width: "49%" }}>
          <Transition />
        </div>
      </div>
    </>
  );
}

export default Dashbord;
