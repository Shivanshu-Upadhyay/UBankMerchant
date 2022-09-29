import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

function ContextProvider({ children }) {
  const [downloadStatement, setDownloadStatement] = useState([]);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [timeZoneVal,setTimeZoneVal] = useState('')
  return (
    <StateContext.Provider
      value={{
        downloadStatement,
        setDownloadStatement,
        isLoginUser,
        setIsLoginUser,
        timeZoneVal,setTimeZoneVal
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
