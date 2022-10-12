import React, { useEffect, useState } from "react";
import TableComp from "./TableComp";
import Pagination from "@mui/material/Pagination";
import AddIcon from '@mui/icons-material/Add';


const Footer = ({ setPage, page, totalPage }) => {
  const pageNumber = (e, p) => {
    setPage(p);
   
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-8">
          <div className="showingdata">Showing 16 from 10 data</div>
        </div>
        <div className="col-4">
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={5}
            siblingCount={0}
            size="large"
            color="primary"
            onChange={pageNumber}
          />
        </div>
      </div>
    </>
  );
};


function SubMerchants() {
  const [tableBodyData, setTableBodyData] = useState([{actype:1,name:"Shiv",id:23432356,status:0,wp:0,ct:"2022-09-30T10:44:45.000Z"}]);
  const [page, setPage] = useState(1);

  return (
    <>
      <h4 className="heading animate__backInDown">Sub Merchants</h4>
      <div className="d-flex justify-content-end my-3">
        <button className="createNewMerchant"><AddIcon />Create Merchant</button>
      </div>
      <div className="row">
        <div className="col-12">
          <TableComp tableBodyData={tableBodyData}/>
        </div>
      </div>

      <Footer setPage={setPage} page={page}  />
    </>
  );
}

export default SubMerchants