import { Box } from '@mui/material'
import React from 'react'
import Loader from '../components/Loader/Loader'
import useFetchData from '../hooks/useFetchData'
import { OrderType } from '../types/orders'
import { ProductType } from '../types/products'

const DashboardView = () => {
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

  if (isProductsLoading || isOrdersLoading) return <Loader />

  if (productsError || ordersError) return <Box>{'An error ocurred...'}</Box>
  return <div>Dashboard</div>
}

export default DashboardView
