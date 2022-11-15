import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Form from "react-bootstrap/Form";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./sidebar.css";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const { setTimeZoneVal } = useStateContext();
  const { setIsLoginUser } = useStateContext();
  const [dateState, setDateState] = React.useState(new Date());
  const navigate = useNavigate()
  React.useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  const timeZoneFun = (e) => {
    setTimeZoneVal(JSON.parse(e.target.value).timeZone);
    localStorage.setItem("timeZone", e.target.value);
  };
  let timeZoneValShow = JSON.parse(localStorage.getItem("timeZone"))?.timeZone;
  const logout = () => {
    localStorage.clear("user");
    setIsLoginUser(undefined);
    navigate('login')
  };

  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl: "https://www.payoway.com/web/assets/admin/icons/dashboard.svg",
      path: "/Dashbord",
    },
    {
      name: "Sub Merchants",
      iconUrl:"https://www.payoway.com/web/assets/merchants/img/merchant.svg",
      path: "SubMerchants",
    },
    {
      name: "Deposit",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/transactions.svg",
      path: "Deposit",
    },
  
    {
      name: "Payout",
      iconUrl: "https://www.bankconnect.online/assets/merchants/img/payout.svg",
      path: "payout",
    },
    {
      name: "Settlement",
      iconUrl:
        "	https://www.bankconnect.online/assets/merchants/img/sattlement.svg",
      path: "Settlement",
    },
    {
      name: "Reports",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/reports.svg",
      path: "Reports",
    },

    {
      name: "Statements",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/statements.svg",
      path: "Statements",
    },
    {
      name: "Invoice",
      iconUrl:
        "	https://www.bankconnect.online/assets/merchants/img/billing.svg",
      path: "Invoice",
    },
    {
      name: "Virtual Terminal",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
      path: "Virtual",
    },
    {
      name: "Teams",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/employes.svg",
      path: "Teams",
    },
    {
      name: "Business Setting",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/business-settings.svg",
      path: "BusinessSetting",
    },
    {
      name: "Integrations",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/developerImg.png",
      path: "Integrations",
    },
    {
      name: "Change Password",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
      path: "ChangePassword",
    },
    {
      name: "Logout",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/log-out.svg",
      path: "login",
    },
  ];

  function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
   
  
    return (
      <div>
        <Badge
          className="mx-3"
          style={{ cursor: "pointer" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img
            src="https://www.bankconnect.online/assets/merchants/img/setting.svg"
            alt=""
            width="40px"
          />
        </Badge>
  
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem  > <Link to='BusinessSetting' onClick={handleClose} style={{color:"#212529",fontWeight:"500",fontSize:"13px"}}> Account Setting</Link> </MenuItem>
          <MenuItem>  <Link to='ChangePassword' onClick={handleClose} style={{color:"#212529",fontWeight:"500",fontSize:"13px"}}> Change Password</Link> </MenuItem>
          <MenuItem>  <div onClick={()=>{handleClose();logout();}} style={{color:"#212529",fontWeight:"500",fontSize:"13px"}}> Logout</div> </MenuItem>
          
          
        </Menu>
      </div>
    );
  }
  







  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose" : "openClose2"}
      >
        <img
          src="	https://www.bankconnect.online/assets/merchants/img/quick-previous.svg"
          alt=""
          width="40px"
          style={{ position: "fixed", cursor: "pointer" }}
        />
      </div>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar className="appBarcom">
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="d-flex align-items-center"
          >
            {open ? (
              <img
                src="https://www.bankconnect.online/assets/merchants/img/logo.png"
                alt=""
                width="200px"
              />
            ) : (
              <img src="./imges/fav-icon.png" alt="" width="36px" />
            )}
          </Typography>
          <div className="d-flex align-items-center ms-5 justify-content-center">
            <div
              style={{ color: "black" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="d-flex justify-content-between align-items-center">
                <CalendarMonthIcon className="mx-1" />
                {dateState.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: timeZoneValShow ? timeZoneValShow : "Asia/Kolkata",
                })}
                <ScheduleIcon className="mx-1" />
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: timeZoneValShow ? timeZoneValShow : "Asia/Kolkata",
                })}
              </div>
            </div>
            <div>
              <Form.Select
                aria-label="Default select example"
                className="mx-3"
                onChange={(e) => timeZoneFun(e)}
                value={localStorage.getItem("timeZone")}
              >
                <option
                  value={JSON.stringify({
                    name: "India",
                    timeZone: "Asia/Kolkata",
                  })}
                >
                  India
                </option>
                <option
                  value={JSON.stringify({
                    name: "China",
                    timeZone: "Asia/Shanghai",
                  })}
                >
                  China
                </option>
                <option
                  value={JSON.stringify({
                    name: "Indonesia",
                    timeZone: "Asia/Jakarta",
                  })}
                >
                  Indonesia
                </option>
                <option
                  value={JSON.stringify({
                    name: "Philippines",
                    timeZone: "Asia/Shanghai",
                  })}
                >
                  Philippines
                </option>
                <option
                  value={JSON.stringify({
                    name: "Thailand",
                    timeZone: "Asia/Jakarta",
                  })}
                >
                  Thailand
                </option>
                <option
                  value={JSON.stringify({
                    name: "Malaysia",
                    timeZone: "Asia/Shanghai",
                  })}
                >
                  Malaysia
                </option>
                <option
                  value={JSON.stringify({
                    name: "Vietanam",
                    timeZone: "Asia/Jakarta",
                  })}
                >
                  Vietanam
                </option>
              </Form.Select>
            </div>
          </div>

          <div className=" navLeft">
            <Badge badgeContent={4} color="primary" className="mx-3">
              <MailIcon color="action" />
            </Badge>
            <div className="mx-2">
              <span style={{ fontSize: "12px" }}>Hello,</span>
              <span className="username">
                {localStorage.getItem("userName")}
              </span>
            </div>
            
              <Link to="BusinessSetting">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/profile.jpg"
                  alt=""
                  width="40px"
                  style={{ borderRadius: "20px" }}
                />
              </Link>
              
           
            <div>

              <BasicMenu />
              </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sidebarLink.map((item, index) => {
            return (
              <div className="sidebarcontainer mb-3 " key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? " iconcontainer mx-3 iconActive"
                      : " iconcontainer mx-3"
                  }
                >
                  <img
                    src={item.iconUrl}
                    alt="not found"
                    className="iconstyle"
                  />
                </NavLink>

                <div>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                    }
                    onClick={() => (item.name === "Logout" ? logout() : null)}
                  >
                    {item.name}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="mainBlockSideBar"
      >
        <DrawerHeader />
        <div className="bdcolor">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

