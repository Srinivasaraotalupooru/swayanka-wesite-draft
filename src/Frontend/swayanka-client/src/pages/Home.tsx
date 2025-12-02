import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tshirtColor, setTshirtColor] = React.useState('#000000');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTshirtColor(prev => prev === '#000000' ? '#F5F5F5' : '#000000');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-white text-black overflow-hidden relative selection:bg-black selection:text-white flex flex-col">
      {/* Background Grid */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-32">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text Section */}
            <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white shadow-md z-50 relative opacity-100 visible">
                    <Star size={12} className="fill-white text-white" />
                    <span className="text-xs font-bold tracking-widest uppercase">Wear Your Identity</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                    PURE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-black">FORM.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-500 max-w-xl font-light leading-relaxed">
                    We strip away the noise. No logos. No patterns. Just the perfect fit, engineered for your life.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button onClick={() => navigate('/story')} className="h-14 px-8 text-lg rounded-full bg-black text-white hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-2xl shadow-black/20">
                        Start Your Story <ArrowRight className="ml-2" />
                    </Button>
                    <button className="h-14 px-8 text-lg rounded-full border border-gray-200 hover:border-black transition-colors font-medium">
                        View Collection
                    </button>
                </div>
            </div>

            {/* Visual Section */}
            <div className="lg:col-span-5 relative h-[50vh] max-h-[500px] hidden lg:block animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
                <div className="absolute inset-0 rounded-[3rem] -rotate-6 scale-95 opacity-50 bg-gray-200"></div>
                <div className="absolute inset-0 border rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden group bg-gray-100 border-gray-200">
                    
                    {/* Floating Garments */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute w-80 h-80 transition-transform duration-700 group-hover:scale-110">
                             {/* Black T-Shirt Image */}
                             <img 
                                src="/black-tshirt-gray.png" 
                                alt="Black T-Shirt" 
                                className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ${tshirtColor === '#000000' ? 'opacity-100' : 'opacity-0'}`} 
                             />
                             {/* White T-Shirt Image */}
                             <img 
                                src="/white-tshirt-gray.png" 
                                alt="White T-Shirt" 
                                className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ${tshirtColor === '#FFFFFF' || tshirtColor === '#F5F5F5' ? 'opacity-100' : 'opacity-0'}`} 
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer / Trust Indicators */}
        <div className="mt-auto pb-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 animate-in fade-in duration-1000 delay-500 pt-8">
            <p>© 2025 Swayanka. Designed for Purists.</p>
            <div className="flex gap-8">
                <span>Premium Materials</span>
                <span>Ethical Manufacturing</span>
                <span>Carbon Neutral</span>
            </div>
        </div>

      </div>
    </div>
  );
};
