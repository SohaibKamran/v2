import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from './store'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ProductDashboard from './pages/ProductDashboard'
import Cart from './pages/Cart'
import EditProduct from './pages/EditProduct'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='flex h-screen bg-gray-100'>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route
                path='*'
                element={
                  <>
                    <Sidebar />
                    <div className='flex-1 overflow-auto'>
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                          path='/products'
                          element={<ProductDashboard />}
                        />
                        <Route path='/cart' element={<Cart />} />
                      </Routes>
                    </div>
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
