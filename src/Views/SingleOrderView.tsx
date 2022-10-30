import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { api } from '../api'
import { OrderProductType, OrderType, Status } from '../types/orders'
import useFetchById from '../hooks/useFetchById'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

const SingleOrderView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    error: errorFetching,
  } = useFetchById<OrderType>(`order-${id}`, '/orders', id || '')
  const {
    mutateAsync: editAsync,
    isError: isEditingError,
    isLoading: isEditing,
  } = useMutation((object: OrderType) => {
    return api.patch(`/orders/${id}`, object)
  })

  if (isLoading) return <div>Loading...</div>

  if (errorFetching || !data) return <div>An error occurred</div>

  const handleChange = async (event: SelectChangeEvent) => {
    await editAsync({ ...data, status: event.target.value as Status })

    if (isEditingError) {
      enqueueSnackbar('There was an error updating the order status', {
        variant: 'error',
      })
    } else {
      queryClient.invalidateQueries([`order-${id}`])
      enqueueSnackbar('Status updated successfully!', { variant: 'success' })
    }
  }

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
        <IconButton onClick={() => navigate('/orders')}>
          <ArrowBackIcon />
        </IconButton>
        <Stack direction={'row'} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              disabled={isEditing || data.status === 'processing'}
              value={data?.status}
              label='Status'
              onChange={handleChange}
            >
              <MenuItem disabled value={'processing'}>
                Processing
              </MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'preparing'}>Preparing</MenuItem>
              <MenuItem value={'expedited'}>Expedited</MenuItem>
              <MenuItem value={'delivered'}>Delivered</MenuItem>
              <MenuItem value={'closed'}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Stack spacing={4}>
          <Typography variant={'h4'}>{data?.id}</Typography>
          <Typography variant={'body2'}>{data?.totalPrice}</Typography>
          <Typography fontWeight={500} variant='caption' color='text.secondary'>
            Products
          </Typography>
          <Grid container spacing={2}>
            {data?.products.map((product: OrderProductType) => (
              <Grid key={product.id} item xs={4}>
                <Stack spacing={1}>
                  <img
                    src={product?.imageUrl || PRODUCT_DEFAULT_IMAGE}
                    alt={'Product'}
                    style={{ height: 64, width: 64, objectFit: 'cover' }}
                  />
                  <Typography>{product.name}</Typography>
                  <Typography>Quantity: {product.quantity}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SingleOrderView
