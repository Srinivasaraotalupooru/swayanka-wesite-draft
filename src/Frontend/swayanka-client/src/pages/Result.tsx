import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GarmentSVG } from '../components/ui/GarmentSVG';
import { addToCart } from '../api';

export const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    navigate('/story');
    return null;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    // Hardcoded user for demo
    await addToCart('guest-user', { 
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: 1,
        size: selectedSize,
        colorHex: product.colorHex,
        category: product.category
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white px-4 animate-in fade-in slide-in-from-bottom-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-[3rem] bg-gray-50 aspect-square flex items-center justify-center p-12 overflow-hidden shadow-inner">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-70"></div>
           <GarmentSVG type={product.category} color={product.colorHex} className="w-full h-full drop-shadow-2xl animate-in zoom-in duration-1000" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-6"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wide">Your Match</span><span className="text-gray-400 text-sm">{product.gender} • {product.fabric}</span></div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-8 leading-relaxed border-l-4 border-purple-500 pl-6">{product.description}</p>
          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Select Size</h3>
            <div className="flex gap-4">{['S', 'M', 'L', 'XL'].map(size => (<button key={size} onClick={() => setSelectedSize(size)} className={`w-16 h-16 rounded-2xl text-lg font-bold flex items-center justify-center transition-all border-2 ${selectedSize === size ? 'border-purple-600 bg-purple-600 text-white shadow-lg transform scale-110' : 'border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600'}`}>{size}</button>))}</div>
          </div>
          <div className="flex items-center gap-6 border-t border-gray-100 pt-8">
             <div className="text-3xl font-bold text-gray-900">₹{product.price}</div>
             <Button onClick={handleAddToCart} disabled={!selectedSize} className="flex-1">{selectedSize ? 'Add to Collection' : 'Select Size'}</Button>
          </div>
          <button onClick={() => navigate('/story')} className="mt-6 text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2"><RefreshCcw size={14} /> Start a new story</button>
        </div>
      </div>
    </div>
  );
};
