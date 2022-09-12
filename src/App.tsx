import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import AccountView from './Views/AccountView'
import CampaignsView from './Views/CampaignsView'
import CategoriesView from './Views/CategoriesView'
import DashboardView from './Views/DashboardView'
import ProductsView from './Views/ProductsView'

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
