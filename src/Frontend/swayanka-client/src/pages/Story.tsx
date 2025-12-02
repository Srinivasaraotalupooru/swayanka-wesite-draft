import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api';

export const Story: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<{ gender: string | null, fabric: string | null, colorType: string | null }>({ gender: null, fabric: null, colorType: null });

  const handleSelection = async (key: string, value: string) => {
    const newSel = { ...selections, [key]: value };
    setSelections(newSel);
    
    if (key === 'colorType') {
      // Find match
      const products = await getProducts();
      const found = products.find((p: any) => 
        p.gender === newSel.gender && 
        p.fabric === newSel.fabric && 
        (newSel.colorType === 'white' ? (p.colorHex === '#ffffff' || p.colorHex === '#fafafa') : (p.colorHex !== '#ffffff' && p.colorHex !== '#fafafa'))
      );
      
      if (found) {
        navigate('/result', { state: { product: found } });
      } else {
        alert("No match found, try different options.");
        setStep(0);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  // Step 1: Gender
  if (step === 0) {
    return (
      <div className="h-screen pt-32 pb-4 flex flex-col items-center justify-center bg-gray-50 px-4 animate-in fade-in">
         <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
           <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-200 rounded-full transition-colors mr-auto"><ArrowLeft size={24} /></button>
           <div className="flex-1 text-center mr-10"><h2 className="text-2xl font-bold mb-1">Chapter 1</h2><p className="text-gray-500 text-sm">Who are we styling today?</p></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl h-full max-h-[600px]">
            <button onClick={() => handleSelection('gender', 'Men')} className="group relative h-full bg-gray-100 rounded-3xl text-left hover:shadow-2xl transition-all border border-gray-200 overflow-hidden flex flex-col justify-end p-6">
              <img src="/men-fashion.png" alt="Men's Fashion" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-1">Men</h3>
                <p className="text-gray-300 text-sm">Structured fits, engineered for daily life.</p>
              </div>
              <div className="absolute top-6 right-6 md:top-auto md:bottom-6 md:right-6"><ArrowRight className="text-white/50 group-hover:text-white transition-colors" size={28} /></div>
            </button>
            <button onClick={() => handleSelection('gender', 'Women')} className="group relative h-full bg-gray-100 rounded-3xl text-left hover:shadow-2xl transition-all border border-gray-200 overflow-hidden flex flex-col justify-end p-6">
              <img src="/women-fashion.png" alt="Women's Fashion" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-1">Women</h3>
                <p className="text-gray-300 text-sm">Elegant silhouettes, designed for movement.</p>
              </div>
              <div className="absolute top-6 right-6 md:top-auto md:bottom-6 md:right-6"><ArrowRight className="text-white/50 group-hover:text-white transition-colors" size={28} /></div>
            </button>
         </div>
      </div>
    );
  }

  // Step 2: Fabric
  if (step === 1) return (
    <div className="h-screen pt-32 pb-4 flex flex-col items-center justify-center bg-white px-4 animate-in slide-in-from-right-10">
       <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
         <button onClick={() => setStep(0)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
         <div className="flex-1 text-center"><h2 className="text-2xl font-bold mb-1">Chapter 2</h2><p className="text-gray-500 text-sm">Choose your texture.</p></div><div className="w-10"></div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl h-full max-h-[600px]">
          <div onClick={() => handleSelection('fabric', 'Cotton')} className="cursor-pointer group rounded-3xl border border-gray-200 hover:border-black p-6 transition-all hover:shadow-xl relative overflow-hidden flex flex-col h-full justify-center">
            <img src="/cotton-texture.png" alt="Cotton Texture" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4"><span className="font-bold text-lg">Co</span></div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Organic Cotton</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Classic, breathable, and durable. Perfect for the daily grind.</p>
                <ul className="space-y-1 text-xs text-gray-500"><li className="flex items-center gap-2"><Check size={12} /> 220 GSM Weight</li></ul>
            </div>
          </div>
          <div onClick={() => handleSelection('fabric', 'Kashmiri')} className="cursor-pointer group rounded-3xl border border-gray-200 hover:border-black p-6 transition-all hover:shadow-xl relative overflow-hidden flex flex-col h-full justify-center">
            <img src="/kashmiri-texture.png" alt="Kashmiri Texture" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-50 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20">PREMIUM</div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mb-4"><span className="font-bold text-lg">Ka</span></div>
                <h3 className="text-xl font-bold mb-2 text-white">Kashmiri Fabric</h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">A luxurious blend native to the valleys. Unbelievably soft.</p>
                <ul className="space-y-1 text-xs text-gray-300"><li className="flex items-center gap-2"><Check size={12} /> Hand-loomed</li></ul>
            </div>
          </div>
       </div>
    </div>
  );

  // Step 3: Color
  if (step === 2) return (
    <div className="h-screen pt-32 pb-4 flex flex-col items-center justify-center bg-gray-50 px-4 animate-in zoom-in-95">
       <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
         <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowLeft size={24} /></button>
         <div className="flex-1 text-center"><h2 className="text-2xl font-bold mb-1">The Final Chapter</h2><p className="text-gray-500 text-sm">Day or Night?</p></div><div className="w-10"></div>
       </div>
       <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl h-full max-h-[500px]">
          <button onClick={() => handleSelection('colorType', 'white')} className="flex-1 h-full bg-gray-100 border border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-sm hover:shadow-xl group p-4 relative overflow-hidden">
            <img src="/white-tshirt-v2.png" alt="White T-Shirt" className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10 mix-blend-multiply" />
            <span className="mt-4 md:mt-8 text-lg font-bold text-gray-900 relative z-10">The Light</span>
          </button>
          <button onClick={() => handleSelection('colorType', 'black')} className="flex-1 h-full bg-gray-900 border border-gray-800 rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl group relative overflow-hidden p-4">
            <img src="/black-tshirt.png" alt="Black T-Shirt" className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 relative z-10" />
            <span className="mt-4 md:mt-8 text-lg font-bold text-white relative z-10">The Dark</span>
          </button>
       </div>
    </div>
  );

  return null;
};
