import { Box, Button, Drawer, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import useStore from '../store'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'
import ProductCard from '../components/Products/ProductCard'
import ProductForm from '../components/Products/ProductForm'

const ProductsView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const refetchProducts = useStore((state) => state.refetchProducts)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const { data, isFetching, error } = useFetchData<ProductType>(
    'products',
    refetchProducts
  )

  if (isFetching) return <Box>{'Loading...'}</Box>

  if (error) return <Box>{'An error ocurred...'}</Box>

  return (
    <>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} p={2}>
          <Typography variant='h5'>ProductsView</Typography>
          <Button onClick={() => toggleDrawer()} variant={'contained'}>
            Create Product
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={2} p={2}>
        {data.map((product) => (
          <Grid item xs={12} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={() => toggleDrawer()}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 2,
          '.MuiPaper-root': {
            width: '400px',
          },
        })}
      >
        <ProductForm onSubmit={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default ProductsView
