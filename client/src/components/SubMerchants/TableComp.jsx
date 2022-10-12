import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from '@mui/icons-material/MoreVert';
function TableComp({tableBodyData}) {
  return (
    <TableContainer className="tablecontainer2 ">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Account Type</TableCell>
          <TableCell > Name</TableCell>
          <TableCell>Sub Merchant Id</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Web Payment</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Action</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {tableBodyData?.map((item, index) => {
          return (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={index}
            >
              <TableCell>{item.actype===1?<div className='normail'>Normal</div>:''}</TableCell>
              <TableCell >{ item.name }</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {item.status===0?<div className='approved'>Normal</div>:''}
              </TableCell>
              <TableCell>{item.wp===0?<div className='approved'>Normal</div>:''}</TableCell>
              <TableCell >
                {item.ct}
              </TableCell>
              <TableCell><MoreVertIcon /></TableCell>
              
              
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableComp