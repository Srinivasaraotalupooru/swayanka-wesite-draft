import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GarmentSVG } from '../components/ui/GarmentSVG';
import { getCart, removeFromCart, createOrder, clearCart } from '../api';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const userId = 'guest-user';

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const data = await getCart(userId);
    setCart(data);
  };

  const handleRemove = async (index: number) => {
    await removeFromCart(userId, index);
    loadCart();
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;
    
    const total = cart.items.reduce((a: number, c: any) => a + c.unitPrice, 0);
    
    await createOrder({
        userId,
        orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`,
        totalAmount: total,
        status: 'Processing',
        items: cart.items
    });

    await clearCart(userId);
    alert("Order placed successfully!");
    navigate('/profile');
  };

  if (!cart) return <div className="min-h-screen pt-24 flex justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Your Collection</h2>
        {cart.items.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-400">Your story is empty.</p><Button className="mt-4" onClick={() => navigate('/')}>Begin</Button></div>
        ) : (
          <div className="space-y-4">
             {cart.items.map((item: any, idx: number) => (
               <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl p-2"><GarmentSVG type={item.category} color={item.colorHex} className="w-full h-full" /></div>
                  <div className="flex-1"><h3 className="font-bold text-lg">{item.productName}</h3><p className="text-sm text-gray-500">{item.size}</p><p className="text-sm font-semibold mt-1">₹{item.unitPrice}</p></div>
                  <button onClick={() => handleRemove(idx)} className="text-gray-300 hover:text-red-500"><Trash2 /></button>
               </div>
             ))}
             <div className="mt-8 border-t border-gray-200 pt-8">
               <div className="flex justify-between text-xl font-bold mb-8"><span>Total</span><span>₹{cart.items.reduce((a: number, c: any) => a + c.unitPrice, 0)}</span></div>
               <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
