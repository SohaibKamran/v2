import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className='text-center'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to E-Shop</h1>
      <p className='text-xl mb-8'>Discover amazing products at great prices!</p>
      <Link
        to='/products'
        className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300'
      >
        Shop Now
      </Link>
    </div>
  )
}

export default Home
