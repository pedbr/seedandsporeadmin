import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'

import { DateTime } from 'luxon'
import { useState } from 'react'
import { api } from '../api'
import ConfirmDialog from '../components/Dialogs/ConfirmDialog'
import Loader from '../components/Loader/Loader'
import StatusChip from '../components/StatusChip/StatusChip'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useFetchById from '../hooks/useFetchById'
import { OrderProductType, OrderType, Status } from '../types/orders'

const SingleOrderView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const {
    data,
    isLoading,
    error: errorFetching,
  } = useFetchById<OrderType>(`order-${id}`, '/orders', id || '')
  const {
    mutateAsync: editAsync,
    isError: isEditingError,
    isLoading: isEditing,
  } = useMutation((object: { status: Status }) => {
    return api.patch(`/orders/${id}`, object)
  })

  if (isLoading) return <Loader />

  if (errorFetching || !data) return <div>An error occurred</div>

  const submitStatusUpdate = async () => {
    await editAsync({ status: newStatus as Status })

    if (isEditingError) {
      enqueueSnackbar('There was an error updating the order status', {
        variant: 'error',
      })
    } else {
      queryClient.invalidateQueries([`order-${id}`])
      enqueueSnackbar('Status updated successfully!', { variant: 'success' })
      setNewStatus('')
      setIsConfirmDialogOpen(false)
    }
  }

  const handleChange = async (event: SelectChangeEvent) => {
    setNewStatus(event.target.value)
    setIsConfirmDialogOpen(true)
  }

  const totalProducts = data?.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  )

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
        <IconButton onClick={() => navigate('/orders')}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      <Paper sx={{ borderRadius: '16px', padding: 4 }}>
        <Stack direction={'row'}>
          <Stack spacing={4} width={'100%'}>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant={'h1'}>Order ID: {data?.id}</Typography>
              <FormControl sx={{ width: 250 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  disabled={isEditing || data.status === 'processing'}
                  value={data?.status}
                  label='Status'
                  onChange={handleChange}
                >
                  <MenuItem sx={{ height: 65 }} disabled value={'processing'}>
                    <StatusChip status='processing' />
                  </MenuItem>
                  <MenuItem sx={{ height: 65 }} value={'pending'}>
                    <StatusChip status='pending' />
                  </MenuItem>
                  <MenuItem sx={{ height: 65 }} value={'preparing'}>
                    <StatusChip status='preparing' />
                  </MenuItem>
                  <MenuItem sx={{ height: 65 }} value={'expedited'}>
                    <StatusChip status='expedited' />
                  </MenuItem>
                  <MenuItem sx={{ height: 65 }} value={'delivered'}>
                    <StatusChip status='delivered' />
                  </MenuItem>
                  <MenuItem sx={{ height: 65 }} value={'closed'}>
                    <StatusChip status='closed' />
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Grid container>
              <Grid item xs={3}>
                <Stack
                  spacing={2}
                  bgcolor={'secondary.main'}
                  p={2}
                  borderRadius={'12px'}
                  textAlign={'right'}
                  mx={2}
                >
                  <Typography color={'common.black'}>Order price</Typography>
                  <Typography color={'common.black'} variant={'h3'}>
                    {data?.totalPrice}EUR
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack
                  spacing={2}
                  bgcolor={'secondary.main'}
                  p={2}
                  borderRadius={'12px'}
                  textAlign={'right'}
                  mx={2}
                >
                  <Typography color={'common.black'}>Shipping Cost</Typography>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='end'
                    spacing={1}
                  >
                    <Typography color={'common.black'} variant={'h3'}>
                      {data?.shippingCost}EUR
                    </Typography>
                    <Chip
                      label={data?.shippingCost > 0 ? 'Premium' : 'Standard'}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack
                  spacing={2}
                  bgcolor={'secondary.main'}
                  p={2}
                  borderRadius={'12px'}
                  textAlign={'right'}
                  mx={2}
                >
                  <Typography color={'common.black'}>Total products</Typography>
                  <Typography color={'common.black'} variant={'h3'}>
                    {totalProducts}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack
                  spacing={2}
                  bgcolor={'secondary.main'}
                  p={2}
                  borderRadius={'12px'}
                  textAlign={'right'}
                  mx={2}
                >
                  <Typography color={'common.black'}>Order weight</Typography>
                  <Typography color={'common.black'} variant={'h3'}>
                    {data?.orderWeight}g
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack
                  spacing={2}
                  bgcolor={'secondary.main'}
                  p={2}
                  borderRadius={'12px'}
                  textAlign={'right'}
                  mx={2}
                >
                  <Typography color={'common.black'}>
                    Order created at
                  </Typography>
                  <Typography color={'common.black'} variant={'h3'}>
                    {DateTime.fromISO(data?.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label={'Client name'}
                  value={data?.orderFullName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label={'Client email'}
                  value={data?.orderEmail}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label={'Client phone number'}
                  value={data?.orderPhoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={'Delivery address'}
                  value={data?.orderDeliveryAddress}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label={'Delivery post code'}
                  value={data?.orderDeliveryPostCode}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label={'Delivery location'}
                  value={data?.orderDeliveryLocation}
                />
              </Grid>
              {data?.orderBillingAddress && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={'Billing address'}
                    value={data?.orderBillingAddress}
                  />
                </Grid>
              )}
            </Grid>
            <Typography variant='h2'>Products</Typography>
            <Grid container spacing={2}>
              {data?.products.map((product: OrderProductType) => (
                <Grid
                  key={product.id}
                  item
                  xs={3}
                  bgcolor={'primary.main'}
                  borderRadius={'12px'}
                  pb={2}
                  mr={2}
                >
                  <Stack spacing={2} direction={'row'}>
                    <img
                      src={product?.imageUrl || PRODUCT_DEFAULT_IMAGE}
                      alt={'Product'}
                      style={{
                        height: 64,
                        width: 64,
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <Stack spacing={1}>
                      <Typography variant={'h5'} color={'common.white'}>
                        {product.name}
                      </Typography>
                      <Typography variant={'body2'} color={'common.white'}>
                        Price: {product.price}EUR
                      </Typography>
                      <Typography variant={'body2'} color={'common.white'}>
                        Quantity: {product.quantity}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Paper>
      <ConfirmDialog
        open={isConfirmDialogOpen}
        title={'Are you sure you want to edit this status?'}
        body={`The status will be changed to ${newStatus}. The customer will receive the corresponding email.`}
        onConfirm={submitStatusUpdate}
        isLoading={isEditing}
        toggleDialog={() => setIsConfirmDialogOpen(!isConfirmDialogOpen)}
      />
    </Box>
  )
}

export default SingleOrderView
