import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateTime } from 'luxon'
import Loader from '../components/Loader/Loader'
import StatusChip from '../components/StatusChip/StatusChip'
import useFetchData from '../hooks/useFetchData'
import { OrderType } from '../types/orders'

const ProductsView = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useFetchData<OrderType>(
    'orders',
    '/orders'
  )

  const [filteredData, setFilteredData] = useState<OrderType[]>([])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  if (isLoading) return <Loader />

  if (error) return <Box>{'An error ocurred...'}</Box>

  const onChangeSearchById = (value: string) => {
    if (!value || value === '' || value === undefined) {
      setFilteredData(data)
      return
    }
    const newDataSet = data.filter((item) =>
      item.id.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredData(newDataSet)
  }

  const onChangeSearchByStatus = (value: string) => {
    if (!value || value === '' || value === undefined) {
      setFilteredData(data)
      return
    }
    const newDataSet = data.filter((item) => item.status === value)
    setFilteredData(newDataSet)
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} p={2}>
        <Typography variant='h1'>Orders</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} p={2} spacing={2}>
        <Typography>Filters</Typography>
        <Box width={'1px'} height={'40px'} bgcolor={'text.secondary'} />
        <TextField
          label={'Search by ID'}
          onChange={(e) => onChangeSearchById(e.target.value)}
        />
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Search by status</InputLabel>
          <Select
            label={'Search by status'}
            onChange={(event) =>
              onChangeSearchByStatus(event.target.value as string)
            }
          >
            <MenuItem sx={{ height: 50 }} value={''}>
              <Typography>None</Typography>
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'processing'}>
              <StatusChip size={'small'} status='processing' />
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'pending'}>
              <StatusChip size={'small'} status='pending' />
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'preparing'}>
              <StatusChip size={'small'} status='preparing' />
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'expedited'}>
              <StatusChip size={'small'} status='expedited' />
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'delivered'}>
              <StatusChip size={'small'} status='delivered' />
            </MenuItem>
            <MenuItem sx={{ height: 50 }} value={'closed'}>
              <StatusChip size={'small'} status='closed' />
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <TableContainer
        sx={{ borderRadius: '16px', padding: 2 }}
        component={Paper}
      >
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Total Price</TableCell>
              <TableCell align='left'>Status</TableCell>
              <TableCell align='left'>Total Weight</TableCell>
              <TableCell align='left'>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  height: 100,
                }}
              >
                <TableCell>
                  <Button
                    onClick={() => navigate(`/orders/${row.id}`)}
                    variant={'contained'}
                  >
                    Open
                  </Button>
                </TableCell>
                <TableCell align='left'>
                  <Typography fontWeight={700}>{row.id}</Typography>
                </TableCell>
                <TableCell align='left'>{row.totalPrice} EUR</TableCell>
                <TableCell align='left'>
                  <StatusChip status={row.status} />
                </TableCell>
                <TableCell align='left'>{row.orderWeight}g</TableCell>
                <TableCell align='left'>
                  {DateTime.fromISO(row.createdAt).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProductsView
