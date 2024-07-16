import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import Menu from '../Menu/Menu'
import Events from '../Events/Events'
import FoodCategory from '../Food Category/FoodCategory'
import Ingredients from '../Ingredients/Ingredients'
import RestaurantDetails from './RestaurantDetails'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantCategory } from '../../component/State/Restaurant/Action'
import { fetchRestaurantOrders } from '../../component/State/Restaurant Order/Action'


const Admin = () => {
  const dispatch = useDispatch();
  const {restaurant} = useSelector(store=>store);
  // console.log("Restaurant = ",restaurant.userRestaurant);
  const token = localStorage.getItem("jwt");


  useEffect(()=>{

    dispatch(getRestaurantCategory({
      jwt: token,
      restaurantId: restaurant.userRestaurant?.id
    }))
    dispatch(fetchRestaurantOrders({
      jwt: token,
      restaurantId: restaurant.userRestaurant?.id
    }))
  },[dispatch, restaurant.userRestaurant?.id, token])
   
    

  const handleClose = ()=>{

  }
  return (
    <div>
      <div className='lg:flex justify-between'>
          <div>
            <AdminSideBar handleClose={handleClose}/>
          </div>
          <div className='lg:w-[80%] sm:pt-[3rem] lg:pt-0' >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/events" element={<Events/>} />
              <Route path="/category" element={<FoodCategory />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/details" element={<RestaurantDetails />} />
              <Route path="/add-menu" element={<CreateMenuForm />} />
            </Routes>
          </div>
      </div>
    </div>
  )
}

export default Admin