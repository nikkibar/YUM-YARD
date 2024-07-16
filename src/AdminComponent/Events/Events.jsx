import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../component/State/Restaurant/Action";

const initialValues= {
    image: "",
    location: "",
    name: "",
    startedAt: null,
    endsAt: null,
}

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant} =   useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEventAction)
    // console.log(formValues);
    setFormValues(initialValues);
    // Form submission logic here
  };

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

  return (
    <div>
      <div className="p-10">
        <Button onClick={handleOpen} color="primary" variant="contained">
          Create New Event
        </Button>
        <Modal sx={{mt:"10"}}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props}/>}
                      label="Start Date and Time"
                      value={formValues.startedAt}
                      onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                      fullWidth
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={formValues.endsAt}
                      onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                      fullWidth
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3 }}
                fullWidth={isMobile}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
