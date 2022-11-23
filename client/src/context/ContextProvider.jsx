import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

function ContextProvider({ children }) {
  const [downloadStatement, setDownloadStatement] = useState([]);
  const [isLoginUser, setIsLoginUser] = useState(localStorage.getItem('user'));
  const [timeZoneVal,setTimeZoneVal] = useState('')
  const [accoutType,setAccoutType] = useState('')
  return (
    <StateContext.Provider
      value={{
        downloadStatement,
        setDownloadStatement,
        isLoginUser,
        setIsLoginUser,
        timeZoneVal,setTimeZoneVal,setAccoutType,accoutType
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
