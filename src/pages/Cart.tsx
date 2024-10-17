import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { Trash2, MinusCircle, PlusCircle, CreditCard } from 'lucide-react';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isAuthenticated) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <p>Please sign in to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                  <div className="flex items-center">
                    <img src={`https://source.unsplash.com/random/80x80?${item.name}`} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <MinusCircle className="w-6 h-6" />
                    </button>
                    <span className="mx-2 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Cart Details</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </button>
            <button
              onClick={handleClearCart}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;