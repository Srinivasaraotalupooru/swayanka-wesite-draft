import React from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 group">
          <img src="/logo_cropped.png" alt="Swayanka Logo" className="h-20 w-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          {location.pathname !== '/' && (
            <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-500 hover:text-black transition-colors hidden sm:block">
              Restart Story
            </button>
          )}
          
          {/* Profile Button */}
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Account">
            {user ? (
               <User size={24} className="text-black fill-gray-100" />
            ) : (
               <User size={24} className="text-gray-700 group-hover:text-black" />
            )}
          </button>

          <button onClick={() => navigate('/cart')} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ShoppingBag size={24} className="text-gray-700 group-hover:text-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
