import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

const CreateFoodCategoryForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({categoryName:"",restaurantId:""})
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        name:formData.categoryName,
    };
    dispatch(createCategoryAction({reqData:data, jwt:token}))
    // setFormData({categoryName:"",restaurantId:""})

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
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
            <TextField
                fullWidth
                required
                id="categoryName"
                name="categoryName"
                label="Category Name"
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

export default CreateFoodCategoryForm