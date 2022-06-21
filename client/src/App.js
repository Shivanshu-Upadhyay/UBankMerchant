import { BrowserRouter } from "react-router-dom";
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
