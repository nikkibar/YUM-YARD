import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

export const AddressCard = ({ item, showButton, handleSelectAddress}) => {
   
  return (
    <Card className="flex gap-5  w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 to-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>
          {item?.streetAddress}, {item?.city}, {item?.stateProvince}, {item?.postalCode}, {item.country}
        </p>
        {showButton && (
          <Button variant="outlined" fullWidth  onClick={() => handleSelectAddress(item)}>Select</Button>
        )}
      </div>
    </Card>
  );
};
