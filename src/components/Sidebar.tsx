import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Home, Package, Bell, BarChart2, Archive, ShoppingCart } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Products', icon: Package, path: '/products' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Inventory', icon: Archive, path: '/inventory' },
  ];

  return (
    <div className="w-64 bg-white h-full shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{user?.name || 'User'}</p>
            <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 ${
              location.pathname === item.path ? 'bg-purple-50 text-purple-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <Link
        to="/cart"
        className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white hover:bg-purple-700"
      >
        <div className="flex items-center">
          <ShoppingCart className="w-5 h-5 mr-3" />
          Cart
        </div>
        <span className="bg-white text-purple-600 rounded-full px-2 py-1 text-xs font-bold">
          {cartItems.length}
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;