import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({userData: values,navigate}))
    console.log("form value",values)
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
            // error={Boolean(<ErrorMessage name="streetAddress" />)}
            // helperText={<ErrorMessage name="streetAddress" />}
          />
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
            variant="outlined"
            margin="normal"
            type="password"
            // error={Boolean(<ErrorMessage name="streetAddress" />)}
            // helperText={<ErrorMessage name="streetAddress" />}
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel id="rolelabel">Role</InputLabel>
            <Field
              as={Select}
              labelId="rolelabel"
              name="role"
              //value={initialValues.role}
              label="Role"
              //onChange={handleChange}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>
          </FormControl>
          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        If you Have an Account already?
        <Button size="small" onClick={() => navigate("/account/login")}>
          login
        </Button>
      </Typography>
    </div>
  );
};
