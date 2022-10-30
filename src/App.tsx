import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Navigation from './components/Navigation/Navigation'
import AccountView from './Views/AccountView'
import CampaignsView from './Views/CampaignsView'
import CategoriesView from './Views/CategoriesView'
import DashboardView from './Views/DashboardView'
import ProductsView from './Views/ProductsView'
import SingleProductView from './Views/SingleProductView'
import OrdersView from './Views/OrdersView'
import SingleOrderView from './Views/SingleOrderView'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
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
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
