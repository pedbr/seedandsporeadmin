import { Box, Grid, Stack, Typography } from '@mui/material'
import useFetchData from '../hooks/useFetchData'
import { OrderType } from '../types/orders'

const ProductsView = () => {
  const { data, isLoading, error } = useFetchData<OrderType[]>(
    'orders',
    '/orders'
  )

  if (isLoading) return <Box>{'Loading...'}</Box>

  if (error) return <Box>{'An error ocurred...'}</Box>

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} p={2}>
        <Typography variant='h5'>Orders View</Typography>
      </Stack>
      <Grid container spacing={2} p={2}>
        {data?.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Stack>
              <Typography variant='body1'>{order.id}</Typography>
              <Typography variant='body2'>{order.totalPrice}</Typography>
              <Typography variant='caption'>{order.status}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProductsView
