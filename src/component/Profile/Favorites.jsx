import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
  const {auth} = useSelector(store=>store);
  return (
    <div className="mt-5">
      <h1 className="py-5 text-2xl font-semibold text-center">My Favorites</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {auth.favorites.map((item) => (
          <RestaurantCard item={item}/>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
