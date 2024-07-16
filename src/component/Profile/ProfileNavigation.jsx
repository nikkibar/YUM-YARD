import React, { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Notifications", icon: <NotificationsActiveIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(open);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if(item.title === "Logout"){
      dispatch(logout());
      navigate("/")
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
      if (isSmallScreen) {
        setDrawerOpen(false); // Close the drawer after navigation on small screens
      }
    }
     
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="h-full">
      {isSmallScreen && (
        <IconButton
          onClick={handleDrawerToggle}
          className="absolute top-4 left-4 z-50"
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? drawerOpen : true}
        anchor="left"
        sx={{ zIndex: 1 }}
      >
        <div className="w-[75vw] sm:w-[50vw] lg:w-[20vw] h-full flex flex-col justify-start text-xl lg:gap-7 gap-4 p-4 pt-20">
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-4 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
