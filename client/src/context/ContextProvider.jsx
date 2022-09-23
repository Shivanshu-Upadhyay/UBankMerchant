import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

function ContextProvider({ children }) {
  const [downloadStatement, setDownloadStatement] = useState([]);
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [active, setActive] = React.useState(0);
  const [timeZoneVal,setTimeZoneVal] = useState('')
  return (
    <StateContext.Provider
      value={{
        downloadStatement,
        setDownloadStatement,
        isLoginUser,
        setIsLoginUser,
        active, setActive,timeZoneVal,setTimeZoneVal
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
