import React from "react";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
      <Box sx={{ height: 345, overflow: 'hidden' }}>
          <CardMedia
            sx={{
              height: '100%',
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            image="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Box>
        <CardContent>
          <Typography variant="h5">Indian Fast Food</Typography>
          <Typography variant="body2">50% off on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"Delhi-NCR"}</p>
            <p className="text-sm text-blue-500">June 14, 2024 12:00 AM</p>
            <p className="text-sm text-red-500">June 15, 2024 12:00 AM</p>
          </div>
        </CardContent>
       {false && <CardActions className="p-0 mt-0">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
       } 
      </Card>
    </div>
  );
};

export default EventCard;
