import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'
import ProductCard from '../components/Products/ProductCard'
import ProductForm from '../components/Products/ProductForm'
import Loader from '../components/Loader/Loader'
import Drawer from '../components/Drawer/Drawer'

const ProductsView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const { data, isLoading, error } = useFetchData<ProductType>(
    'products',
    '/products'
  )

  if (isLoading) return <Loader />

  if (error) return <Box>{'An error ocurred...'}</Box>

  return (
    <>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} p={2}>
          <Typography variant='h1'>Products</Typography>
          <Button onClick={() => toggleDrawer()} variant={'contained'}>
            Create Product
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={6} p={2}>
        {data?.map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Drawer open={isDrawerOpen} onClose={() => toggleDrawer()}>
        <ProductForm onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default ProductsView
