import React from 'react'
import './search.css'
function Search({ orderNumber, setorderNumber }) {
  
 
  return (
    <>
      <div className="serachbox">
        <input
          type="search"
          placeholder="Order Id"
          className="search"
          value={orderNumber}
          onChange={(e) => setorderNumber(e.target.value)}
        />
        <img
          src="https://www.bankconnect.online/assets/merchants/img/search.svg"
          alt=""
          className="icon"
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
}

export default Search