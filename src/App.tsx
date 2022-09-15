import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import Navigation from './components/Navigation/Navigation'
import AccountView from './Views/AccountView'
import CampaignsView from './Views/CampaignsView'
import CategoriesView from './Views/CategoriesView'
import DashboardView from './Views/DashboardView'
import ProductsView from './Views/ProductsView'
import SingleProductView from './Views/SingleProductView'

const App = () => {
  return (
    <div>
      <SnackbarProvider>
        <BrowserRouter>
          <Navigation>
            <Routes>
              <Route path='/' element={<DashboardView />} />
              <Route path='/products' element={<ProductsView />} />
              <Route path='/product/:id' element={<SingleProductView />} />
              <Route path='/categories' element={<CategoriesView />} />
              <Route path='/campaigns' element={<CampaignsView />} />
              <Route path='/account' element={<AccountView />} />
            </Routes>
          </Navigation>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  )
}

export default App
