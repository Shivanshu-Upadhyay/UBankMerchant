import { BrowserRouter } from "react-router-dom";
// import Sidebar from './components/SIDEBAR/Sidebar';
import Routers from "./components/ROUTERS/Routers";

import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
