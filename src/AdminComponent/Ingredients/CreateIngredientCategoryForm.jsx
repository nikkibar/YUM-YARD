import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredientCategory } from '../../component/State/Menu/Ingredients/Action'

const CreateIngredientCategoryForm = () => {
  const{restaurant} = useSelector(store=>store)
  const dispatch = useDispatch();
  // const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({name:""})
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: formData.name,
      restaurantId: restaurant.userRestaurant?.id
    }
    setFormData({ name: ""});
    dispatch(createIngredientCategory({data:data}))
    // console.log(formData)
  }

  const handleInputChange = (e) => {
    const{name, value} = e.target
    setFormData({
        ...formData,[name]:value
    })
  }



  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
            <TextField
                fullWidth
                required
                id="name"
                name="name"
                label="Category"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.categoryName}
              ></TextField>
              <Button variant="contained" color="primary" type="submit">
            Create Category
          </Button>
            </form>
        </div>
        
    </div>
  )
}

export default CreateIngredientCategoryForm