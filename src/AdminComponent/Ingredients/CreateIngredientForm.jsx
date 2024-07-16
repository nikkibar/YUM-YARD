import { Button, FormControl,  InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient} from '../../component/State/Menu/Ingredients/Action';

const CreateIngredientForm = () => {
  const dispatch = useDispatch();
  const {restaurant, ingredient} = useSelector(store=>store)
  const [formData, setFormData] = useState({name:"",ingredientCategory:""})
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ingredientName:formData.name,
      categoryId:formData.ingredientCategory,
      restaurantId:restaurant.userRestaurant?.id     
    }
    setFormData({ name: "", ingredientCategory: "" });
    dispatch(createIngredient({data:data}))
    // console.log(data)
  }

  const handleInputChange = (e) => {
    const{name, ingredientCategory, value} = e.target
    setFormData({ 
        ...formData,[name]:value,[ingredientCategory]:value
    })
  }

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
            <TextField
                fullWidth
                required
                id="name"
                name="name"
                label="Ingredient Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
              ></TextField>
              <FormControl fullWidth>
                <InputLabel for="ingredientCategory">
                  Ingredient Category
                </InputLabel>
                <Select 
                  required
                  id="ingredientCategory"
                  value={formData.ingredientCategory}
                  // label="Ingredient Category"
                  onChange={handleInputChange}
                  name="ingredientCategory"
                >
                  {
                    ingredient.category.map((item)=>(
                      <MenuItem value={item?.id}>{item?.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
            Create Ingredient
          </Button>
            </form>
        </div>
        
    </div>
  )
}

export default CreateIngredientForm