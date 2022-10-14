import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateSubMer from "./CreateSubMer";
function TableComp({ tableBodyData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <TableContainer className="tablecontainer2 ">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Type</TableCell>
            <TableCell> Name</TableCell>
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
                <TableCell>
                  {item.account_type === 0 ? (
                    <div className="normail">Normal</div>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>{item.fname + item.lname}</TableCell>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell>
                  {item.status === 1 ? (
                    <div className="approved">Approve</div>
                  ) : (
                    <div className="approved">Approve</div>
                  )}
                </TableCell>
                <TableCell>
                  {item.allow_webpayment === 1 ? <div className="approved">Approve</div> :  <div className="approved">Not Approve</div>}
                </TableCell>
                <TableCell>{item.created_on}</TableCell>
                <TableCell>
                  <div aria-describedby={id} onClick={handleClick}>
                    <MoreVertIcon style={{ cursor: "pointer" }} />
                  </div>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose2}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                  >
                  
                  <CreateSubMer ReadOnlyVal={true} formData={item} />
                  
                    
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComp;
