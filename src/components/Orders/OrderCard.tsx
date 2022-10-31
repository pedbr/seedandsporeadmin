import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { OrderType } from '../../types/orders'

const OrderCard = ({
  id,
  totalPrice,
  status,
  createdAt,
  orderWeight,
}: Partial<OrderType>) => {
  const navigate = useNavigate()
  return (
    <Stack>
      <Typography variant='body1'>{id}</Typography>
      <Typography variant='body2'>{totalPrice}</Typography>
      <Typography variant='caption'>{status}</Typography>
      <Typography variant='caption'>Created At {createdAt}</Typography>
      <Typography variant='caption'>Total Weight {orderWeight}</Typography>
      <Button onClick={() => navigate(`/orders/${id}`)} variant='outlined'>
        Open
      </Button>
    </Stack>
  )
}

export default OrderCard
