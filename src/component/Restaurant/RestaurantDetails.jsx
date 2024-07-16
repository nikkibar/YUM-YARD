import {
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantCategory } from "../State/Restaurant/Action";
import { getMenuItemByRestaurantId } from "../State/Menu/Action";


const foodTypes = [
  { label: "ALL", value: "all" },
  { label: "Vegetarian Only", value: "veg" },
  { label: "Seasonal", value: "seasonal" },
  { label: "Non-Vegetarian", value: "nonveg" },
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);

  console.log("restaurant", restaurant);

  const {id} = useParams();

  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantCategory({jwt, restaurantId: id }));
  }, []);
 
  useEffect(() => {
    const requestData = {
      jwt,
      restaurantId: id,
      vegetarian: foodType === "veg",
      seasonal: foodType === "seasonal",
      nonVeg: foodType === "nonveg",
      food_category:selectedCategory,
    };
    dispatch(getMenuItemByRestaurantId(requestData));
  }, [selectedCategory, foodType]);
  const handleFoodTypeFilter = (e, value) => {
    setFoodType(value);
    console.log("Food type:", e.target.value, value);
  };

  const handleFilterCategory = (e,value) => {
    setSelectedCategory(value);
    console.log(e.target.value, e.target.name, value);
  };
  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/ { restaurant.restaurant?.address?.country}/ {restaurant.restaurant?.name}/ {id}
        </h3>

        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[1]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[2]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>

        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
          <p className="text-gray-500 mt-1">
           { restaurant.restaurant?.description}.
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>{ restaurant.restaurant?.address?.streetAddress},&nbsp;{ restaurant.restaurant?.address?.city}&nbsp;{ restaurant.restaurant?.address?.stateProvince}
              &nbsp;{ restaurant.restaurant?.address?.postalCode},&nbsp;{ restaurant.restaurant?.address?.country}</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <TodayIcon />
              <span>{restaurant.restaurant?.openingHours}</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <Card className="box space-y-5 lg:sticky top-28 p-5">
            <div className="">
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>

              <FormControl className="py-10 space-y-10" component={"fieldset"}>
                <RadioGroup
                  name="food_type"
                  onChange={handleFoodTypeFilter}
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div className="">
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>

              <FormControl className="py-10 space-y-10" component={"fieldset"}>
                <RadioGroup
                  name="food_category"
                  onChange={handleFilterCategory}
                  value={selectedCategory}
                
                >
                  {restaurant.categories.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </Card>
        </div>

        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems.map((item) => (
            <MenuCard  item={item} auth={auth}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
