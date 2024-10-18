import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from './store'

// PrivateRoute component to restrict access
const PrivateRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  // If not authenticated, redirect to SignIn page
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
