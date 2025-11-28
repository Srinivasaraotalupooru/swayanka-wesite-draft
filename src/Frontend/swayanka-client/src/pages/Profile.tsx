import React, { useEffect, useState } from 'react';
import { Package, Clock, LogOut, ShieldCheck, User } from 'lucide-react';
import { GarmentSVG } from '../components/ui/GarmentSVG';
import { getOrders } from '../api';

export const Profile: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const userId = 'guest-user';

  useEffect(() => {
    const loadOrders = async () => {
        const data = await getOrders(userId);
        setOrders(data);
    };
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Identity Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
           <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-bold border-4 border-white shadow-lg">
              <User size={40} />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Guest User</h2>
              <p className="text-gray-500 mb-4">guest@swayanka.com</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                   <ShieldCheck size={16} /> Verified Account
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 hover:text-red-600 transition-colors">
                   <LogOut size={16} /> Sign Out
                </button>
              </div>
           </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Package className="text-purple-600" /> Order History
           </h3>
           
           {orders.length === 0 ? (
             <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Clock className="mx-auto text-gray-300 mb-3" size={32} />
                <p className="text-gray-500">No orders yet.</p>
             </div>
           ) : (
             <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                     <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-50">
                        <div>
                           <span className="text-sm text-gray-500 block">Order {order.orderNumber}</span>
                           <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center gap-2">
                           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                             {order.status}
                           </span>
                           <span className="font-bold text-lg">₹{order.totalAmount}</span>
                        </div>
                     </div>
                     <div className="flex gap-4 overflow-x-auto pb-2">
                        {order.items.map((item: any, idx: number) => (
                           <div key={idx} className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0" title={item.productName}>
                              <GarmentSVG type={item.category} color={item.colorHex} className="w-full h-full" />
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
