import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {

  const {restaurant} = useSelector(store=>store);
  console.log("Restaurant = ",restaurant.userRestaurant);
  
  return (
    <div>
        <Routes>
          
            <Route path="/*" element={!restaurant.userRestaurant?<CreateRestaurantForm />:<Admin/>}>

            </Route>
        </Routes>
    </div>
  )
}
