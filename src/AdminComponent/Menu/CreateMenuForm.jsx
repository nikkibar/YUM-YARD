import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AddPhotoAlternate } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudaniry } from "../util/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../component/State/Menu/Action";
import { getIngredientOfRestaurant } from "../../component/State/Menu/Ingredients/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
};

const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredient } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);  

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

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const menu = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        images: values.images,
        restaurantId: restaurant?.userRestaurant.id,
        vegetarian: values.vegetarian,
        seasonal: values.seasonal,
        ingredients: values.ingredients,
      };
      dispatch(createMenuItem({menu:menu,jwt:jwt}));
      formik.setValues = initialValues;
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudaniry(file);
    console.log("image", image);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleChange = (event) => {
    const selectedValues = event.target.value;
    const parsedValues = selectedValues.map((value) => JSON.parse(value));
    formik.setFieldValue('ingredients', parsedValues);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                accept="image/"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex
                items-center justify-center p-3 border 
                rounded-md border-gray-600"
                >
                  <AddPhotoAlternate classNametext-white />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt=""
                    />

                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                type="number"
                required
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Food Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Food Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                  {restaurant?.categories.map((item) => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  required
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients.map((item) =>
                    JSON.stringify(item)
                  )}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const item = JSON.parse(value);
                        return <Chip key={item.id} label={item.name} />;
                      })}
                    </Box>
                  )}
                >
                  {ingredient.ingredients.map((item) => (
                    <MenuItem key={item.id} value={JSON.stringify(item)}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Vegetarian
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  label="Vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  label="Vegetarian"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Create Menu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
