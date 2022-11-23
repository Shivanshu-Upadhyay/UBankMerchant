import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
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
import DownloadSetting from "../BUSINESSSETTING/DownloadSetting";
import Forget from "../SIGNUPANDLOGIN/Forget";
import SubMerchants from "../SubMerchants/SubMerchants";

function Routers() {
  const { isLoginUser,setIsLoginUser,setAccoutType,accoutType } = useStateContext();
  const location = useLocation();
  const reactNavigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('user')){
      const { exp } = jwtDecode(localStorage.getItem('user'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear(); 
        reactNavigate('/login')
        return;
      }
    }
    setIsLoginUser(localStorage.getItem('user')) 
    setAccoutType(localStorage.getItem('accoutType')) 

  },[setIsLoginUser,location.pathname])
  
  return (
    <>
      <Routes>
        {isLoginUser ? (
          <>
            {Number(accoutType)===2?<Route path="/" element={<Sidebar />}>
              <Route path="Dashbord" element={<Dashbord />} />            
              <Route path="Deposit" element={<Deposit />} />
              <Route path="payout" element={<Payout />} />             
              <Route path="Reports" element={<Reports />} />
              <Route path="Statements" element={<Statements />} />  
              <Route path="Invoice" element={<Invoice />} />           
              <Route path="Virtual" element={<Virtual />} />
              <Route path="Teams" element={<Teams />} />            
              <Route path="ChangePassword" element={<ChangePassword />} />
            </Route>:<Route path="/" element={<Sidebar />}>
              <Route path="Dashbord" element={<Dashbord />} />
              <Route path="SubMerchants" element={<SubMerchants />} />
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
            </Route> }
            <Route path="/" element={<Sidebar />}>
              <Route path="Dashbord" element={<Dashbord />} />
              <Route path="SubMerchants" element={<SubMerchants />} />
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
        <Route path="*" element={isLoginUser?<Error />:<Login />} />
      </Routes>
    </>
  );
}

export default Routers;
