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
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
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
  // necessary for content to be below app bar
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
  const { active, setActive } = useStateContext();
  const { setIsLoginUser } = useStateContext();
  

  const logout = () => {
    localStorage.clear("user");
    setIsLoginUser(false);
  };

  
  
  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/dashboard.svg",
      path: "/",
    },
    {
      name: "Deposit",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/transactions.svg",
      path: "/Deposit",
    },
    {
      name: "Payout",
      iconUrl: "https://www.bankconnect.online/assets/merchants/img/payout.svg",
      path: "/payout",
    },
    {
      name: "Settlement",
      iconUrl:
        "	https://www.bankconnect.online/assets/merchants/img/sattlement.svg",
      path: "/Settlement",
    },
    {
      name: "Reports",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/reports.svg",
      path: "/Reports",
    },

    {
      name: "Statements",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/statements.svg",
      path: "/Statements",
    },
    {
      name: "Invoice",
      iconUrl:
        "	https://www.bankconnect.online/assets/merchants/img/billing.svg",
      path: "/Invoice",
    },
    {
      name: "Virtual Terminal",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
      path: "/Virtual",
    },
    {
      name: "Teams",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/employes.svg",
      path: "/Teams",
    },
    {
      name: "Business Setting",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/business-settings.svg",
      path: "/BusinessSetting",
    },
    {
      name: "Integrations",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/developerImg.png",
      path: "/Integrations",
    },
    {
      name: "Change Password",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
      path: "/ChangePassword",
    },
    {
      name: "Logout",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/log-out.svg",
      path: "/login",
    },
  ];

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
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src="https://www.bankconnect.online/assets/merchants/img/logo.png"
                alt=""
                width="40px"
              />
            ) : (
              <img src="./imges/fav-icon.png" alt="" width="36px" />
            )}
          </Typography>
          <div className=" navLeft">
            <Badge badgeContent={4} color="primary" className="mx-3">
              <MailIcon color="action" />
            </Badge>
            <div className="mx-2">
              <span style={{ fontSize: "12px" }}>Hello,</span>
              <span className="username">Amit Singh</span>
            </div>
            <div>
              <img
                src="https://www.bankconnect.online/assets/merchants/img/profile.jpg"
                alt=""
                width="40px"
                style={{ borderRadius: "20px" }}
              />
              <Badge badgeContent="!" color="error" className="mx-3">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/setting.svg"
                  alt=""
                  width="40px"
                />
              </Badge>
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
                <div
                  className={
                    active === index
                      ? "iconcontainer mx-3 iconActive"
                      : " iconcontainer mx-3"
                  }
                >
                  <Link to={item.path} onClick={() => setActive(index)}>
                    <img src={item.iconUrl} alt="" className="iconstyle" />
                  </Link>
                </div>
                <div>
                  <Link
                    to={item.path}
                    className={
                      active === index ? "linkNAme activeClass" : "linkNAme"
                    }
                    onClick={() =>
                      item.name === "Logout" ? logout() : setActive(index)
                    }
                  >
                    {item.name}
                  </Link>
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
