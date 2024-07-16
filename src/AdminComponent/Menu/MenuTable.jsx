import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenuItem, getMenuItemByRestaurantId, updateMenuItemAvailability } from "../../component/State/Menu/Action";
import { red } from "@mui/material/colors";

const orders = [1, 1, 1, 1, 1, 1, 1];

const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredient, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const requestData = {
      jwt,
      restaurantId: restaurant?.userRestaurant.id,
      vegetarian: false,
      seasonal: false,
      nonVeg: false,
      food_category: "",
    };
    dispatch(getMenuItemByRestaurantId(requestData));
  }, []);

    // Function to chunk the ingredients array
    const chunkArray = (array, chunkSize) => {
      return array.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!result[chunkIndex]) {
          result[chunkIndex] = []; // start a new chunk
        }
        result[chunkIndex].push(item);
        return result;
      }, []);
    };

    const handleDelete = (foodId)=>{
      dispatch(deleteMenuItem({jwt:jwt, foodId:foodId}))
    }

    const handleUpdateStock = (foodId) => {
      dispatch(updateMenuItemAvailability({jwt:jwt, foodId:foodId}))
    }

  return (
    <Box>
      <Card className="mt-2 mr-2 ml-2">
        <CardHeader
          title={"Menu "}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="settings"
            >
              <CreateIcon />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>id</TableCell> */}
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Availibility</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item.images[0]}/>
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="center">
                  <div>
                      {chunkArray(item.ingredients, 4).map((chunk, chunkIndex) => (
                        <div key={chunkIndex}>
                          {chunk.map((ingredient, ingredientIndex) => (
                            <Chip key={ingredient.id} label={ingredient.name}>
                              {ingredientIndex < chunk.length - 1 ? ", " : ""}
                            </Chip>
                          ))}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="right">₹{item.price}</TableCell>
                  <TableCell align="center">

                    <Button onClick = { ()=> handleUpdateStock(item.id)}
                      style={{
                        color: item?.available ? "green" : "red",
                      }}
                    >
                      {item?.available ? "In_Stock" : "Out_Of_Stock"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton sx={{ color: red[500] }} onClick = { ()=> handleDelete(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
