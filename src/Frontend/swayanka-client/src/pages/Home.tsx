import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GarmentSVG } from '../components/ui/GarmentSVG';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4 pt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <span className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-4 block">The Swayanka Experience</span>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
          Find Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Perfect Basic</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-xl mx-auto">
          We strip away the noise. Tell us your story, and we'll curate the perfect black or white essential for you.
        </p>
        <Button onClick={() => navigate('/story')}>
          Start Your Story <ArrowRight size={20} />
        </Button>
      </div>
      <div className="mt-20 flex gap-8 opacity-50">
         <GarmentSVG type="t-shirt" color="#111" className="w-24 h-24" />
         <GarmentSVG type="t-shirt" color="#fff" className="w-24 h-24" />
      </div>
    </div>
  );
};
