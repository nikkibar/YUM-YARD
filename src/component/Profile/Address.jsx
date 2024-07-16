import React from "react";
import { AddressCard } from "../Cart/AddressCard";
import { useSelector } from "react-redux";

const Address = () => {

  const { auth } = useSelector((store) => store);

  return (
    <div className="mt-5">
      <h1 className="py-5 text-2xl font-semibold gap-5 text-center">Address</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {auth.user?.addresses.map((item) => (
          <AddressCard item={item}/>
        ))}
      </div>
    </div>
  );
};

export default Address;
