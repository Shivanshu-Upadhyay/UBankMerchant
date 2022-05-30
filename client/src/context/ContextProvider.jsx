import React,{createContext,useContext,useState} from 'react'


const StateContext = createContext();


function ContextProvider({children}) {
    const [auth,setAuth] = useState('')
  return( <StateContext.Provider value={{
      auth,
      setAuth
  }}>
{children}
  </StateContext.Provider>)
}
export default ContextProvider;
export  const useStateContext =()=> useContext(StateContext)