import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddlocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {  Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: '90%', // width for extra small screens (mobile)
    sm: 400,   // width for small screens and up (desktop)
  },
  bgcolor: "background.paper",
  outlined: "none",
  boxShadow: 24,
  p: 4,

};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.number()
    .required("Pincode is required")
    .typeError("Pincode must be a number"),
  city: Yup.string().required("City is required"),
});



const Cart = () => {
  const {cart,auth} = useSelector(store=>store);
  const createOrderUsingSelectedAddress = (e) => {
    const data={
      jwt:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant.id,
        deliveryAddress:{
          fullName:auth.user?.fullName,
          streetAddress:e.streetAddress,
          city:e.city,
          stateProvince:e.stateProvince,
          postalCode:e.postalCode,
          country:"India"
        }
      }
    }
    dispatch(createOrder(data))
  };
  const handleOpenAddressModel = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data={
      jwt:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant.id,
        deliveryAddress:{
          fullName:auth.user?.fullName,
          streetAddress:values.streetAddress,
          city:values.city,
          stateProvince:values.state,
          postalCode: values.pincode,
          country:"India"
        }
      }
    }
    dispatch(createOrder(data))
    // console.log("form value", values);
  }
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10 pb-8">
          {cart.cartItems.map((item) => (
            <CartItem item={item}/>
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>₹21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Plateform Fee</p>
                <p>₹5</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Pay</p>
                <p>₹{cart.cart?.total+33+21+5}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex flex-wrap gap-5 justify-center">
              {auth.user?.addresses.map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5  w-64 h-[100%] p-5">
                <AddlocationAltIcon />
                <div className="space-y-3 to-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    {" "}
                    Add New Address
                  </h1>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleOpenAddressModel}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    // error={Boolean(<ErrorMessage name="streetAddress" />)}
                    // helperText={<ErrorMessage name="streetAddress" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    // error={Boolean(<ErrorMessage name="state" />)}
                    // helperText={<ErrorMessage name="state" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    type="number"
                    name="pincode"
                    label="Pin Code"
                    fullWidth
                    variant="outlined"
                    // error={Boolean(<ErrorMessage name="pincode" />)}
                    // helperText={<ErrorMessage name="pincode" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={Boolean(<ErrorMessage name="city" />)}
                    // helperText={<ErrorMessage name="city" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
