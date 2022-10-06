import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashbord from "../DASHBOARD/Dashbord";
import Deposit from "../DEPOSIT/Deposit";
import Virtual from "../VIRTUAlTERMINAL/Virtual";
import Sidebar from "../SIDEBAR/Sidebar";
import Statements from "../STATEMANTS/Statements";
import Reports from "../REPORTS/Reports";
import Teams from "../TEAMS/Team";
import BusinessSetting from "../BUSINESSSETTING/BusinessSetting";
import Integrations from "../INTEGRATIONS/Integrations";
import ChangePassword from "../CHANGEPASSWORD/ChangePass";
import InCompleteProfile from "../SIGNUPANDLOGIN/InCompleteProfile";
import Login from "../SIGNUPANDLOGIN/Login";
import SignUp from "../SIGNUPANDLOGIN/SignUp";
import Payout from "../PAYOUT/Payout";
import Settlement from "../SETTLEMENT/Settlement";
import Invoice from "../INVOICE/Invoice";
import DownloadRep from "../STATEMANTS/DownloadRep";
import CreateInvoice from '../INVOICE/CreateInvoice'
import Error from "../PAGE404/Error";
import { useStateContext } from "../../context/ContextProvider";
import { useState } from "react";
import DownloadSetting from "../BUSINESSSETTING/DownloadSetting";
import Forget from "../SIGNUPANDLOGIN/Forget";


function Routers() {
  const { isLoginUser,setIsLoginUser } = useStateContext();

  useEffect(()=>{
    setIsLoginUser(localStorage.getItem('user')) 
  },[isLoginUser])
  
  return (
    <>
      <Routes>
        {isLoginUser ? (
          <>
            <Route path="/" element={<Sidebar />}>
              <Route path="Dashbord" element={<Dashbord />} />
              <Route path="Deposit" element={<Deposit />} />
              <Route path="payout" element={<Payout />} />
              <Route path="Settlement" element={<Settlement />} />
              <Route path="Reports" element={<Reports />} />
              <Route path="Statements" element={<Statements />} />
              <Route path="Invoice" element={<Invoice />} />
              <Route path="Virtual" element={<Virtual />} />
              <Route path="Teams" element={<Teams />} />
              <Route path="BusinessSetting" element={<BusinessSetting />} />
              <Route path="Integrations" element={<Integrations />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="CreateInvoice" element={<CreateInvoice />} />
            </Route>
            <Route path="DownloadRep" element={<DownloadRep />} />
            <Route path="DownloadSetting" element={<DownloadSetting />} />
          </>
        ) : (
          <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/InCompleteProfile/:key" element={<InCompleteProfile />} />
          <Route path="/forgot-password" element={<Forget />} />
          </>   
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default Routers;
