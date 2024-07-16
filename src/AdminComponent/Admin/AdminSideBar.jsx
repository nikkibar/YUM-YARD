import React, { useState } from "react";
import {
  Dashboard,
  ShoppingBag,
  ShopTwo as ShopTwoIcon,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  Event as EventIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentication/Action";
import MenuIcon from "@mui/icons-material/Menu";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Event", icon: <EventIcon />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      {isSmallScreen && (
        <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? drawerOpen : true}
        onClose={handleClose}
        anchor="left"
        sx={{ zIndex: 1200 }}
      >
        <div
          className=" lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]"
        >
          {menu.map((item, i) => (
            <div key={item.title}>
              <div onClick={() => handleNavigate(item)} className="px-10 flex items-center gap-5 lg:p-3 cursor-pointer">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
