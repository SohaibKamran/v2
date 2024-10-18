import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { clearUser } from '../store/slices/authSlice'
import { ShoppingCart, User, LogOut } from 'lucide-react'

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleLogout = () => {
    dispatch(clearUser())
    localStorage.removeItem('user')
  }

  return (
    <nav className='bg-white shadow-md'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='text-2xl font-bold text-purple-600'>
            E-Shop
          </Link>
          <div className='flex items-center space-x-4'>
            <Link
              to='/products'
              className='text-gray-700 hover:text-purple-600'
            >
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <span className='flex items-center text-gray-700'>
                  <User className='w-5 h-5 mr-1' />
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className='text-gray-700 hover:text-purple-600'
                >
                  <LogOut className='w-5 h-5' />
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/signin'
                  className='text-gray-700 hover:text-purple-600'
                >
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='text-gray-700 hover:text-purple-600'
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to='/cart'
              className='flex items-center text-gray-700 hover:text-purple-600'
            >
              <ShoppingCart className='w-5 h-5 mr-1' />
              <span className='bg-purple-600 text-white rounded-full px-2 py-1 text-xs'>
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
