import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Modal,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientOfRestaurant,
  updateStockOfIngredient,
} from "../../component/State/Menu/Ingredients/Action";

const IngredientsTable = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { restaurant, ingredient } = useSelector((store) => store);

  useEffect(() => {
    console.log({ id: restaurant.userRestaurant.id, jwt: jwt });
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(
        getIngredientOfRestaurant({
          id: restaurant.userRestaurant.id,
          jwt: jwt,
        })
      );
    }
  }, []);

  const handleUpdateStock = (id) => {
    console.log(id);
    dispatch(updateStockOfIngredient({id: id, jwt: jwt}));
  }
  const isMobile = useMediaQuery("(max-width:600px)");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"Ingredients"}
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
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.ingredients ? (
                ingredient.ingredients.map((item, i) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{i + 1}</TableCell>
                    <TableCell align="right">{item?.name || "N/A"}</TableCell>
                    <TableCell align="right">
                      {item?.category?.name || "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleUpdateStock(item.id)}
                       style={{
                        color: item?.inStock ? "green" : "red"
                      }}  
                      >
                        {item?.inStock ? "In_Stock" : "Out_Of_Stock"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No ingredients found
                  </TableCell>
                </TableRow>
              )}
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
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientsTable;
