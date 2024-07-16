import React, {  useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import {  useSelector } from "react-redux";
// import { getRestaurantCategory } from "../../component/State/Restaurant/Action";


const FoodCategoryTable = () => {
  const{restaurant} = useSelector(store=>store)
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const token = localStorage.getItem("jwt");


  // useEffect(()=>{

  //   dispatch(getRestaurantCategory({
  //     jwt: token,
  //     restaurantId: restaurant.userRestaurant?.id
  //   }))
  // },[])
   
    

  // Use MUI's useMediaQuery hook to check screen size
  const isMobile = useMediaQuery("(max-width:600px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? '90%' : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  return (
    <Box>
      <Card className="mt-2 mr-2 ml-2">
        <CardHeader
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" align="left">
                  Id
                </TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant?.categories.map((item, i) => (
                <TableRow
                  key={i}  // Changed key to i since row.name is not available
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i+1}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
