import { Box, Button, Drawer, Grid, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { ProductType } from '../types/products'
import ProductCard from '../components/Products/ProductCard'
import ProductForm from '../components/Products/ProductForm'
import useStore from '../store'
import { useSnackbar } from 'notistack'

const ProductsView = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const refetchProducts = useStore((state) => state.refetchProducts)
  const { enqueueSnackbar } = useSnackbar()

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('products').select()
      if (error) {
        console.log(error)
        enqueueSnackbar('There was an error fetching products', {
          variant: 'error',
        })
        return
      }
      setProducts(data as ProductType[])
    } catch (error) {
      console.log(error)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchProducts()
  }, [refetchProducts, fetchProducts])

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
          <Grid item xs={12}>
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
