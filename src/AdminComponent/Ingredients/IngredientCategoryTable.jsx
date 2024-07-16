import { Box, Card,  CardHeader, IconButton, Modal, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../component/State/Menu/Ingredients/Action";
 
const IngredientCategoryTable = () => {
  const dispatch = useDispatch();
  const {restaurant, ingredient} = useSelector(store=>store);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    dispatch(getIngredientCategory({id:restaurant.userRestaurant?.id}))
  },[dispatch,restaurant.userRestaurant?.id])

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
      <Card className="mt-1">
        <CardHeader
         title={"Ingredient Category"}
          sx={{ pt: 2, alignItems: "center" }} 
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          />
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 140 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>id</TableCell> */}
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredient.category.map((item,i) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                
                <TableCell align="left">{i+1}</TableCell>
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
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientCategoryTable;
