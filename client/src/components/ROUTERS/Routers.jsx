import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
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
import { useStateContext } from "../../context/ContextProvider";
function Routers() {
  const { auth, setAuth } = useStateContext();
  setAuth((pre) => (pre = localStorage.getItem("user")));
  const auth2 = localStorage.getItem("user")
  console.log(auth);
  return (
    <>
      <Routes>
        {auth ? (
          <Route path="/" element={<Sidebar />}>
            <Route path="/" element={"Dashboard"} />
            <Route path="/Deposit" element={<Deposit />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Statements" element={<Statements />} />
            <Route path="/Virtual" element={<Virtual />} />
            <Route path="/Teams" element={<Teams />} />
            <Route path="/BusinessSetting" element={<BusinessSetting />} />
            <Route path="/Integrations" element={<Integrations />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/InCompleteProfile/:key" element={<InCompleteProfile />} />
        {/* <Route path="*" element={<Error />} /> */}
        
        <Route path="*" element={auth || auth2 ?<Navigate to='/'/>:<Navigate to='/login'/>} />
      </Routes>
    </>
  );
}

export default Routers;
