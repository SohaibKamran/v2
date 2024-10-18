import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setProducts } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'
import { Star } from 'lucide-react'
import { Product } from '../types/Products'

const ProductDashboard: React.FC = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.products)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  useEffect(() => {
    const dummyProducts = [
      {
        id: '1',
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 99.99,
        image: 'https://source.unsplash.com/random/300x300?running-shoes',
        rating: 4,
      },
      {
        id: '2',
        name: 'Training Shoes',
        description: 'Versatile shoes for various workouts',
        price: 89.99,
        image: 'https://source.unsplash.com/random/300x300?training-shoes',
        rating: 5,
      },
      {
        id: '3',
        name: 'Casual Sneakers',
        description: 'Stylish sneakers for everyday wear',
        price: 79.99,
        image: 'https://source.unsplash.com/random/300x300?sneakers',
        rating: 4,
      },
      {
        id: '4',
        name: 'Walking Shoes',
        description: 'Comfortable shoes for long walks',
        price: 69.99,
        image: 'https://source.unsplash.com/random/300x300?walking-shoes',
        rating: 3,
      },
      {
        id: '5',
        name: 'Hiking Boots',
        description: 'Durable boots for outdoor adventures',
        price: 129.99,
        image: 'https://source.unsplash.com/random/300x300?hiking-boots',
        rating: 5,
      },
    ]
    dispatch(setProducts(dummyProducts))
  }, [dispatch])

  const handleAddToCart = (product: Product) => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      )
    } else {
      alert('Please sign in to add items to your cart')
    }
  }

  return (
    <div className='p-8'>
      <h2 className='text-3xl font-bold mb-8'>Essential Items</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map(product => (
          <div
            key={product.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
              <p className='text-gray-600 mb-2'>{product.description}</p>
              <div className='flex justify-between items-center'>
                <span className='text-2xl font-bold text-purple-600'>
                  ${product.price.toFixed(2)}
                </span>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill='currentColor'
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className='mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDashboard
