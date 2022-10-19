import React, { useEffect, useState } from "react";
import TableComp from "./TableComp";
import Pagination from "@mui/material/Pagination";
import CreateSubMer from "./CreateSubMer";
import { subMerchant } from "../../Api";


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
  const [tableBodyData, setTableBodyData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData= async()=>{
    const {data} =  await subMerchant()
    console.log(data);
    setTableBodyData(data.data);
    }
  useEffect(()=>{
    fetchData()
  },[])

 
  return (
    <>
      <h4 className="heading animate__backInDown">Sub Merchants</h4>
      <div className="d-flex justify-content-end my-3">
      <CreateSubMer />
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