import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import Loader from '../components/Loader/Loader'
import useFetchData from '../hooks/useFetchData'
import { OrderType } from '../types/orders'
import { ProductType } from '../types/products'
import PaidIcon from '@mui/icons-material/Paid'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import StoreIcon from '@mui/icons-material/Store'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'

const LOW_STOCK_THRESHOLD = 10

ChartJS.register(ArcElement, Tooltip)

const DashboardView = () => {
  const { palette } = useTheme()
  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useFetchData<ProductType>('products', '/products')

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useFetchData<OrderType>('orders', '/orders')

  const confirmedOrders = ordersData.filter(
    (order) => order.status !== 'processing'
  )

  const totalEarnings = confirmedOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  )

  const ordersBeingProcessed = confirmedOrders.filter(
    (order) => order.status !== 'closed'
  )

  const productsInStock = productsData.filter((product) => product.stock > 0)

  const pendingOrders = ordersData.filter((order) => order.status === 'pending')

  const preparingOrders = ordersData.filter(
    (order) => order.status === 'preparing'
  )

  const expeditedOrders = ordersData.filter(
    (order) => order.status === 'expedited'
  )

  const deliveredOrders = ordersData.filter(
    (order) => order.status === 'delivered'
  )

  const lowStockProducts = productsData.filter(
    (product) => product.stock < LOW_STOCK_THRESHOLD
  )

  const data = {
    labels: ['Pending to handle', 'Preparing', 'Expedited', 'Delivered'],
    datasets: [
      {
        label: 'Orders',
        data: [
          pendingOrders.length,
          preparingOrders.length,
          expeditedOrders.length,
          deliveredOrders.length,
        ],
        backgroundColor: [
          palette.warning.main,
          palette.primary.main,
          palette.info.main,
          palette.success.main,
        ],
      },
    ],
  }

  if (isProductsLoading || isOrdersLoading) return <Loader />

  if (productsError || ordersError) return <Box>{'An error ocurred...'}</Box>
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Paper sx={{ borderRadius: '16px', p: 4, height: 200 }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              fontSize={'48px'}
            >
              <Box>
                <Typography fontSize={'20px'} color={'text.secondary'}>
                  Total earnings
                </Typography>
                <Typography
                  fontSize={'28px'}
                >{`${totalEarnings} EUR`}</Typography>
              </Box>
              <PaidIcon color={'secondary'} fontSize={'inherit'} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ borderRadius: '16px', p: 4, height: 200 }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              fontSize={'48px'}
            >
              <Box>
                <Typography fontSize={'20px'} color={'text.secondary'}>
                  Orders being processed
                </Typography>
                <Typography fontSize={'28px'}>
                  {ordersBeingProcessed.length}
                </Typography>
              </Box>
              <ShoppingBasketIcon color={'primary'} fontSize={'inherit'} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ borderRadius: '16px', p: 4, height: 200 }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              fontSize={'48px'}
            >
              <Box>
                <Typography fontSize={'20px'} color={'text.secondary'}>
                  Products in stock
                </Typography>
                <Typography fontSize={'28px'}>
                  {productsInStock.length}
                </Typography>
              </Box>
              <Inventory2Icon color={'success'} fontSize={'inherit'} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ borderRadius: '16px', p: 4 }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              fontSize={'48px'}
              mb={2}
            >
              <Box>
                <Typography fontSize={'20px'} color={'text.secondary'}>
                  Orders status
                </Typography>
              </Box>
              <StoreIcon color={'info'} fontSize={'inherit'} />
            </Stack>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Stack spacing={4}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box
                    height={25}
                    width={25}
                    borderRadius={'100%'}
                    bgcolor={palette.warning.main}
                  />
                  <Typography>Pending to handle</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box
                    height={25}
                    width={25}
                    borderRadius={'100%'}
                    bgcolor={palette.primary.main}
                  />
                  <Typography>Preparing</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box
                    height={25}
                    width={25}
                    borderRadius={'100%'}
                    bgcolor={palette.info.main}
                  />
                  <Typography>Expedited</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box
                    height={25}
                    width={25}
                    borderRadius={'100%'}
                    bgcolor={palette.success.main}
                  />
                  <Typography>Delivered</Typography>
                </Stack>
              </Stack>
              <Box height={350} width={350}>
                <Pie data={data} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <TableContainer
            sx={{ borderRadius: '16px', padding: 4 }}
            component={Paper}
          >
            <Stack
              direction={'row'}
              mb={2}
              fontSize={'48px'}
              justifyContent={'space-between'}
            >
              <Typography fontSize={'20px'} color={'text.secondary'}>
                Low stock products
              </Typography>
              <RunningWithErrorsIcon color={'warning'} fontSize={'inherit'} />
            </Stack>
            {Boolean(lowStockProducts.length) ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Product Name</TableCell>
                    <TableCell align='left'>Stock</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {lowStockProducts.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        height: 100,
                      }}
                    >
                      <TableCell align='left'>
                        <Typography fontWeight={700}>{row.name?.en}</Typography>
                      </TableCell>
                      <TableCell align='left'>{row.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                my={8}
              >
                <Typography color={'text.secondary'}>
                  No products in low stock at the moment
                </Typography>
              </Box>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardView
