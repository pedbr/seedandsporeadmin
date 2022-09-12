import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { ProductType } from '../../types/products'
import ProductCard from '../Products/ProductCard'

const ProductsView = () => {
  const [products, setProducts] = useState<ProductType[]>([])
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
          <Button variant={'contained'}>Create Product</Button>
        </Stack>
      </Box>
      <Grid container spacing={2} p={2}>
        {products.map((product) => (
          <Grid item xs={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProductsView
