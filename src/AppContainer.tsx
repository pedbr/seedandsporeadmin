import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import AccountView from './Views/AccountView'
import CampaignsView from './Views/CampaignsView'
import CategoriesView from './Views/CategoriesView'
import DashboardView from './Views/DashboardView'
import ProductsView from './Views/ProductsView'
import SingleProductView from './Views/SingleProductView'
import OrdersView from './Views/OrdersView'
import SingleOrderView from './Views/SingleOrderView'

import LoginView from './Views/LoginView'
import { AuthContext } from './context/AuthContext'
import Loader from './components/Loader/Loader'

const AppContainer = () => {
  const user = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <LoginView />
  }
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path='/' element={<DashboardView />} />
          <Route path='/products' element={<ProductsView />} />
          <Route path='/product/:id' element={<SingleProductView />} />
          <Route path='/orders' element={<OrdersView />} />
          <Route path='/orders/:id' element={<SingleOrderView />} />
          <Route path='/categories' element={<CategoriesView />} />
          <Route path='/campaigns' element={<CampaignsView />} />
          <Route path='/account' element={<AccountView />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  )
}

export default AppContainer
