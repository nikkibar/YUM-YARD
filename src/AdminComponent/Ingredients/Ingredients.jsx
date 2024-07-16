import { Grid } from '@mui/material'
import React from 'react'
import IngredientsTable from './IngredientsTable'
import IngredientCategoryTable from './IngredientCategoryTable'

const Ingredients = () => {
  return (
    <div className='py-1 px-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <IngredientsTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <IngredientCategoryTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default Ingredients