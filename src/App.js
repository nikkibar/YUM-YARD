import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
// import CustomerRoute from "./Routers/CustomerRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import { findCart } from "./component/State/Cart/Action";
import Routers from "./Routers/Routers";
import { getRestaurantByUserId } from "./component/State/Restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  // const id = localStorage.getItem("id");
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(jwt));
    }
  }, [auth.jwt]);

  useEffect(()=>{
  
      dispatch(getRestaurantByUserId((auth.jwt || jwt)));

  },[])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers /> 
    </ThemeProvider>
  );
}

export default App;
