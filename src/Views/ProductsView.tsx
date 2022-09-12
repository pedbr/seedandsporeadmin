import { Box, Button, Drawer, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { ProductType } from '../types/products'
import ProductCard from '../components/Products/ProductCard'
import ProductForm from '../components/Products/ProductForm'

const ProductsView = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select()
    console.log(data)
    console.log(error)
    setProducts(data as ProductType[])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
        {products.map((product) => (
          <Grid item xs={3}>
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
        <ProductForm />
      </Drawer>
    </>
  )
}

export default ProductsView
