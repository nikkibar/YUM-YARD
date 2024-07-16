import {
  Box,
  Card,
  CardHeader,
  Avatar,
  AvatarGroup,
  Chip,
  Menu,
  MenuItem,
  Button,
  TableCell,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantOrders, updateOrderStatus } from '../../component/State/Restaurant Order/Action'

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.userRestaurant?.id) {
      dispatch(
        fetchRestaurantOrders({
          jwt: token,
          restaurantId: restaurant.userRestaurant.id,
        })
      );
    }
  }, [dispatch, restaurant.userRestaurant?.id, token]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateOrder = (id, status) => {
    // console.log(id, status);
    dispatch(updateOrderStatus({ orderId: id, orderStatus: status }));
    handleClose();
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="center">ingredients</TableCell>
                <TableCell align="left">status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderitem) => (
                        <Avatar key={orderitem.food.id} src={orderitem.food.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderitem) => (
                      <p key={orderitem.food.id}>{orderitem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderitem) =>
                      orderitem.ingredients.map((orderingredient, index) => (
                        <Chip key={index} label={orderingredient} />
                      ))
                    )}
                  </TableCell>
                  <TableCell align="left">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={selectedOrderId === item.id ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={selectedOrderId === item.id ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={selectedOrderId === item.id}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateOrder(item.id, status.value)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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

export default OrderTable;
