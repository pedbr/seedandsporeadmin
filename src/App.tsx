import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import AccountView from './components/Views/AccountView'
import CampaignsView from './components/Views/CampaignsView'
import CategoriesView from './components/Views/CategoriesView'
import DashboardView from './components/Views/DashboardView'
import ProductsView from './components/Views/ProductsView'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation>
          <Routes>
            <Route path='/' element={<DashboardView />} />
            <Route path='/products' element={<ProductsView />} />
            <Route path='/categories' element={<CategoriesView />} />
            <Route path='/campaigns' element={<CampaignsView />} />
            <Route path='/account' element={<AccountView />} />
          </Routes>
        </Navigation>
      </BrowserRouter>
    </div>
  )
}

export default App
