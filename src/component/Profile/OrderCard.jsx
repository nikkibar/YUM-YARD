import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = ({order,  item}) => {
  return (
    <Card className="flex flex-col sm:flex-row justify-between items-center p-5 space-y-4 sm:space-y-0 sm:space-x-5 mx-3 sm:mx-2">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16 object-cover"
          src={item.food.images[0]}
          alt={item.food.name}
        />
        <div>
          <p className="text-lg font-semibold">{item.food.name}</p>
          <p className="text-sm text-gray-500">₹{item.totalPrice}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button variant="contained" className="cursor-not-allowed">
          {order.orderStatus}
        </Button>
      </div>
    </Card>
  );
};
