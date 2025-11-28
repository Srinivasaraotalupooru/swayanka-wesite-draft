import React from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { SwayankaLogo } from '../ui/SwayankaLogo';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, user }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-2 group">
          <SwayankaLogo className="h-10 w-auto" />
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors hidden sm:block">
            Restart Story
          </button>
          
          {/* Profile Button */}
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-purple-50 rounded-full transition-colors group" title="Account">
            {user ? (
               <User size={24} className="text-purple-600 fill-purple-100" />
            ) : (
               <User size={24} className="text-gray-700 group-hover:text-purple-600" />
            )}
          </button>

          <button onClick={() => navigate('/cart')} className="relative p-2 hover:bg-purple-50 rounded-full transition-colors group">
            <ShoppingBag size={24} className="text-gray-700 group-hover:text-purple-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-purple-600 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
