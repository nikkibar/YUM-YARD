import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};
export const LoginForm = () => {
  
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
    console.log("form value",values)
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            // error={Boolean(<ErrorMessage name="streetAddress" />)}
            // helperText={<ErrorMessage name="streetAddress" />}
          />
          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            type="password"
            variant="outlined"
            margin="normal"
            // error={Boolean(<ErrorMessage name="streetAddress" />)}
            // helperText={<ErrorMessage name="streetAddress" />}
          />
          
          <Button sx={{mt:2, padding:"1rem"}} fullWidth variant="contained" type="submit">Login</Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{mt:3}}>
        Don't Have an Account?
      <Button  size="small" onClick={()=>navigate("/account/register")}>register</Button>
      </Typography>


    </div>
  );
};
