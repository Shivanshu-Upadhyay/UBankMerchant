import React from "react";
import Menu from "@mui/material/Menu";


const CheakboxComp = ({ name,value,onChange,checkValue }) => {
  return (
    <>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value={value} onChange={onChange} checked={checkValue?"checked":null}/>
        <label className="cheackboxlable">{name}</label>
      </div>
    </>
  );
};

function FilterInvoice({
    setPaid,
    setUnpaid,
    setOverdue,
    setPending,
    paid,
    unpaid,
    overdue,
    pending,
    setSendCheck,
    sendCheck
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show1, setShow1] = React.useState(true);
  

  


  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = () => {
    setShow1(!show1);
  };
  

  const cheakValue = (e) => {
    e.preventDefault();
    setSendCheck(!sendCheck)
    handleClose();
  };

  return (
    <div>
      <button
        className="filterdeposite "
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src="https://www.bankconnect.online/assets/merchants/img/filter.png"
          alt=""
          width="20px"
          className="mx-2"
        />
        Filter
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="my-3"
        style={{width:"22rem",}}
      >
        <div
          className="boxcontainer"
          style={{ height: show1 ? "44vh" : "", }}
        >
          <div className="row">
            <div className="col-3 mx-3">
              <button className="buttondate" onClick={handleClick1}>
                Status
              </button>
            </div>
          </div>

          {show1 ? (
            <form className="row m-4  boxcontainer2">
              <div className="col-4  ">
                {show1 ? (
                  <>
                    <CheakboxComp
                      name="Paid"
                      value="Paid"
                      checkValue={paid?true:false}
                      onChange={(e)=>e.target.checked? setPaid(e.target.value):setPaid(null)}
                    />
                    <CheakboxComp
                      name="Overdue"
                      value="Overdue"
                      checkValue={overdue?true:false}
                        onChange={(e)=>e.target.checked? setOverdue(e.target.value):setOverdue(null)}
                    />
                    <CheakboxComp
                      name="Pending"
                      value="Pending"
                      checkValue={pending?true:false}
                        onChange={(e)=>e.target.checked? setPending(e.target.value):setPending(null)}
                    />
                    <CheakboxComp
                      name="Unpaid"
                      value="Unpaid"
                        checkValue={unpaid?true:false}
                        onChange={(e)=>e.target.checked? setUnpaid(e.target.value):setUnpaid(null)}
                      
                    />
                    <div style={{ width: "10rem" }}>
                <button className="buttondate my-4" onClick={cheakValue}>
                  Done
                </button>
              </div>
                  </>
                ) : null}
              </div>

              
              
              
            </form>
          ) : (
            ""
          )}
        </div>
      </Menu>
    </div>
  );
}

export default FilterInvoice;
