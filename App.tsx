import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Check, Plus, Minus, Trash2, Loader2, Sparkles, RefreshCcw, ArrowLeft, User, LogOut, Package, Clock, ShieldCheck, Mail } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, setDoc, query, orderBy } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'swayanka-enterprise-v1';

// --- Dynamic SVG Garment Engine ---
const GarmentSVG = ({ type, color, className }) => {
  const shadingColor = "rgba(0,0,0,0.1)"; 
  const highlightColor = "rgba(255,255,255,0.1)";

  if (type === 't-shirt') {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-t" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15"/>
          </filter>
        </defs>
        <g filter="url(#shadow-t)">
          <path d="M60,40 C60,40 50,70 30,65 L20,95 L55,105 L55,190 L145,190 L145,105 L180,95 L170,65 C150,70 140,40 140,40 Q100,55 60,40 Z" fill={color} />
          <path d="M20,95 L55,105 L55,100 L30,65 Z" fill={shadingColor} />
          <path d="M180,95 L145,105 L145,100 L170,65 Z" fill={shadingColor} />
          <path d="M60,40 Q100,55 140,40 Q100,65 60,40" fill={shadingColor} opacity="0.5" />
          <path d="M70,100 Q100,120 130,100" fill="none" stroke={shadingColor} strokeWidth="2" opacity="0.3" />
        </g>
      </svg>
    );
  }
  
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="80" fill={color} />
      <text x="100" y="105" textAnchor="middle" fill={color === '#ffffff' ? 'black' : 'white'} fontSize="20">{type}</text>
    </svg>
  );
};

// --- Logo ---
const SwayankaLogo = ({ className }) => (
  <svg viewBox="0 0 330 60" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M35,48 C35,48 10,42 10,20 C10,5 35,5 45,20 C55,35 75,35 75,20 C75,5 55,5 55,25 C55,48 35,55 35,48 Z" fill="url(#logo-gradient)" />
    <text x="85" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="38" letterSpacing="0.02em" fill="#111827">SWAYANKA</text>
  </svg>
);

// --- Inventory ---
const INITIAL_PRODUCTS = [
  { id: "m-cotton-w", name: "The Daily Cotton", gender: "Men", fabric: "Cotton", category: "t-shirt", color: { name: "Canvas White", hex: "#ffffff" }, price: 1299, description: "Breathable organic cotton. Your daily armor." },
  { id: "m-cotton-b", name: "The Daily Cotton", gender: "Men", fabric: "Cotton", category: "t-shirt", color: { name: "Midnight Black", hex: "#111111" }, price: 1299, description: "Breathable organic cotton. Stealth mode engaged." },
  { id: "m-kash-w", name: "Kashmiri Luxe", gender: "Men", fabric: "Kashmiri", category: "t-shirt", color: { name: "Snow White", hex: "#ffffff" }, price: 2999, description: "Hand-sourced Kashmiri blends. Unmatched softness." },
  { id: "m-kash-b", name: "Kashmiri Luxe", gender: "Men", fabric: "Kashmiri", category: "t-shirt", color: { name: "Onyx Black", hex: "#000000" }, price: 2999, description: "Hand-sourced Kashmiri blends. Darker than night." },
  { id: "w-cotton-w", name: "The Essential Tee", gender: "Women", fabric: "Cotton", category: "t-shirt", color: { name: "Pure White", hex: "#ffffff" }, price: 1299, description: "A relaxed cut for effortless elegance. 100% Organic." },
  { id: "w-cotton-b", name: "The Essential Tee", gender: "Women", fabric: "Cotton", category: "t-shirt", color: { name: "Jet Black", hex: "#111111" }, price: 1299, description: "A relaxed cut. The Little Black Tee you need." },
  { id: "w-kash-w", name: "Kashmiri Silk-Blend", gender: "Women", fabric: "Kashmiri", category: "t-shirt", color: { name: "Ivory White", hex: "#fafafa" }, price: 3299, description: "Woven in the valleys. A fabric that drapes like water." },
  { id: "w-kash-b", name: "Kashmiri Silk-Blend", gender: "Women", fabric: "Kashmiri", category: "t-shirt", color: { name: "Obsidian", hex: "#080808" }, price: 3299, description: "Woven in the valleys. Luxury you can feel." }
];

// --- Components ---

const Button = ({ children, variant = "primary", className, onClick, disabled }) => {
  const baseStyle = "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 tracking-wide text-lg";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
    secondary: "bg-white text-gray-900 border-2 border-gray-100 hover:border-purple-600 hover:text-purple-600",
    outline: "bg-transparent border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900",
    ghost: "text-gray-500 hover:text-gray-900",
    google: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Navbar = ({ cartCount, onViewChange, currentView, user }) => (
  <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
      <div onClick={() => onViewChange('home')} className="cursor-pointer flex items-center gap-2 group">
        <SwayankaLogo className="h-10 w-auto" />
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        {currentView !== 'home' && (
          <button onClick={() => onViewChange('home')} className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors hidden sm:block">
            Restart Story
          </button>
        )}
        
        {/* Profile Button */}
        <button onClick={() => onViewChange('profile')} className="p-2 hover:bg-purple-50 rounded-full transition-colors group" title="Account">
          {user && !user.isAnonymous ? (
             user.photoURL ? 
               <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full border border-gray-200" /> : 
               <User size={24} className="text-purple-600 fill-purple-100" />
          ) : (
             <User size={24} className="text-gray-700 group-hover:text-purple-600" />
          )}
        </button>

        <button onClick={() => onViewChange('cart')} className="relative p-2 hover:bg-purple-50 rounded-full transition-colors group">
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

// --- Main Application ---

export default function SwayankaApp() {
  const [currentView, setCurrentView] = useState('home'); // home, story, result, cart, profile
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Story State
  const [storyStep, setStoryStep] = useState(0);
  const [selections, setSelections] = useState({ gender: null, fabric: null, colorType: null });
  const [matchedProduct, setMatchedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // --- Auth & Data Fetching ---
  useEffect(() => {
    const initAuth = async () => {
      // Use custom token if available (environment), otherwise Guest
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Products
  useEffect(() => {
    if (!user) return;
    const productsRef = collection(db, 'artifacts', appId, 'public', 'data', 'products');
    onSnapshot(productsRef, async (snapshot) => {
      if (snapshot.empty) {
        for (const p of INITIAL_PRODUCTS) await addDoc(productsRef, p);
      } else {
        setProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    });
  }, [user]);

  // Cart
  useEffect(() => {
    if (!user) return;
    const cartRef = collection(db, 'artifacts', appId, 'users', user.uid, 'cart');
    return onSnapshot(cartRef, (snap) => setCart(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [user]);

  // Orders (History)
  useEffect(() => {
    if (!user) return;
    // Note: We use simple collection query due to Firestore index limitations in this env
    const ordersRef = collection(db, 'artifacts', appId, 'users', user.uid, 'orders');
    return onSnapshot(ordersRef, (snap) => {
        // Sort in memory instead of query
        const loadedOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        loadedOrders.sort((a,b) => new Date(b.date) - new Date(a.date));
        setOrders(loadedOrders);
    });
  }, [user]);

  // --- Actions ---

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Auth state change will trigger re-fetches for the new user
    } catch (error) {
      console.error("Login failed", error);
      alert("Login cancelled or not supported in this preview environment.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    await signInAnonymously(auth); // Fallback to guest
  };

  const handleSelection = (key, value) => {
    const newSel = { ...selections, [key]: value };
    setSelections(newSel);
    if (key === 'colorType') {
      const found = products.find(p => 
        p.gender === newSel.gender && 
        p.fabric === newSel.fabric && 
        (newSel.colorType === 'white' ? (p.color.hex === '#ffffff' || p.color.hex === '#fafafa') : (p.color.hex !== '#ffffff' && p.color.hex !== '#fafafa'))
      );
      setMatchedProduct(found);
      setCurrentView('result');
    } else {
      setStoryStep(prev => prev + 1);
    }
  };

  const addToCart = async () => {
    if (!user || !matchedProduct || !selectedSize) return;
    await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'cart'), {
      ...matchedProduct, size: selectedSize, quantity: 1
    });
    setCurrentView('cart');
  };

  const removeFromCart = async (id) => await deleteDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'cart', id));

  const handleCheckout = async () => {
    if (!user) return;
    if (cart.length === 0) return;

    const total = cart.reduce((a,c) => a+c.price, 0);
    
    // 1. Save to Order History
    await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'orders'), {
      items: cart,
      total: total,
      date: new Date().toISOString(),
      status: 'Processing',
      orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`
    });

    // 2. Clear Cart
    cart.forEach(async (item) => {
       await deleteDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'cart', item.id));
    });

    alert("Order placed successfully! Check your profile for details.");
    setCurrentView('profile');
  };

  // --- Views ---

  const ProfileView = () => (
    <div className="min-h-screen pt-24 px-4 bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Identity Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
           <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-bold border-4 border-white shadow-lg">
              {user && user.photoURL ? <img src={user.photoURL} className="w-full h-full rounded-full" /> : <User size={40} />}
           </div>
           <div className="flex-1 text-center md:text-left">
              {user && !user.isAnonymous ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-900">{user.displayName || 'Swayanka Member'}</h2>
                  <p className="text-gray-500 mb-4">{user.email}</p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                       <ShieldCheck size={16} /> Verified Account
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 hover:text-red-600 transition-colors">
                       <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900">Guest User</h2>
                  <p className="text-gray-500 mb-6 max-w-md">Create an account to track your orders, save your sizing preferences, and get early access to limited drops.</p>
                  <Button variant="google" onClick={handleGoogleLogin} className="w-full md:w-auto flex items-center gap-3 py-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    Sign in with Google
                  </Button>
                </>
              )}
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
                {user && user.isAnonymous && <p className="text-sm text-gray-400 mt-1">Sign in to save your history permanently.</p>}
             </div>
           ) : (
             <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                     <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-50">
                        <div>
                           <span className="text-sm text-gray-500 block">Order {order.orderNumber}</span>
                           <span className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center gap-2">
                           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                             {order.status}
                           </span>
                           <span className="font-bold text-lg">₹{order.total}</span>
                        </div>
                     </div>
                     <div className="flex gap-4 overflow-x-auto pb-2">
                        {order.items.map((item, idx) => (
                           <div key={idx} className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0" title={item.name}>
                              <GarmentSVG type={item.category} color={item.color.hex} className="w-full h-full" />
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

  const Hero = () => (
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
        <Button onClick={() => { setStoryStep(0); setSelections({ gender: null, fabric: null, colorType: null }); setCurrentView('story'); }}>
          Start Your Story <ArrowRight size={20} />
        </Button>
      </div>
      <div className="mt-20 flex gap-8 opacity-50">
         <GarmentSVG type="t-shirt" color="#111" className="w-24 h-24" />
         <GarmentSVG type="t-shirt" color="#fff" className="w-24 h-24" />
      </div>
    </div>
  );

  const StoryView = () => {
    // --- Step 1: Gender ---
    if (storyStep === 0) {
      return (
        <div className="h-screen pt-20 pb-4 flex flex-col items-center justify-center bg-gray-50 px-4 animate-in fade-in">
           {/* Header with Nav */}
           <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
             <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-gray-200 rounded-full transition-colors mr-auto"><ArrowLeft size={24} /></button>
             <div className="flex-1 text-center mr-10"><h2 className="text-2xl font-bold mb-1">Chapter 1</h2><p className="text-gray-500 text-sm">Who are we styling today?</p></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl h-full max-h-[600px]">
              <button onClick={() => handleSelection('gender', 'Men')} className="group relative h-full bg-white rounded-3xl p-6 text-left hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col justify-end">
                <div className="absolute right-[-20px] top-[-20px] md:bottom-[-20px] md:top-auto w-48 h-48 bg-gray-900 rounded-full opacity-5 group-hover:scale-150 transition-transform"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">Men</h3>
                  <p className="text-gray-500 text-sm">Structured fits, engineered for daily life.</p>
                </div>
                <div className="absolute top-6 right-6 md:top-auto md:bottom-6 md:right-6"><ArrowRight className="text-gray-300 group-hover:text-gray-900 transition-colors" size={28} /></div>
              </button>
              <button onClick={() => handleSelection('gender', 'Women')} className="group relative h-full bg-white rounded-3xl p-6 text-left hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col justify-end">
                <div className="absolute right-[-20px] top-[-20px] md:bottom-[-20px] md:top-auto w-48 h-48 bg-purple-600 rounded-full opacity-5 group-hover:scale-150 transition-transform"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">Women</h3>
                  <p className="text-gray-500 text-sm">Elegant silhouettes, designed for movement.</p>
                </div>
                <div className="absolute top-6 right-6 md:top-auto md:bottom-6 md:right-6"><ArrowRight className="text-gray-300 group-hover:text-purple-600 transition-colors" size={28} /></div>
              </button>
           </div>
        </div>
      );
    }

    // --- Step 2: Fabric ---
    if (storyStep === 1) return (
      <div className="h-screen pt-20 pb-4 flex flex-col items-center justify-center bg-white px-4 animate-in slide-in-from-right-10">
         <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
           <button onClick={() => setStoryStep(0)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
           <div className="flex-1 text-center"><h2 className="text-2xl font-bold mb-1">Chapter 2</h2><p className="text-gray-500 text-sm">Choose your texture.</p></div><div className="w-10"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl h-full max-h-[600px]">
            <div onClick={() => handleSelection('fabric', 'Cotton')} className="cursor-pointer group rounded-3xl border-2 border-gray-100 hover:border-blue-200 p-6 transition-all hover:bg-blue-50/30 flex flex-col h-full justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600"><span className="font-bold text-lg">Co</span></div>
              <h3 className="text-xl font-bold mb-2">Organic Cotton</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Classic, breathable, and durable. Perfect for the daily grind.</p>
              <ul className="space-y-1 text-xs text-gray-500"><li className="flex items-center gap-2"><Check size={12} /> 220 GSM Weight</li></ul>
            </div>
            <div onClick={() => handleSelection('fabric', 'Kashmiri')} className="cursor-pointer group rounded-3xl border-2 border-gray-100 hover:border-purple-200 p-6 transition-all hover:bg-purple-50/30 relative overflow-hidden flex flex-col h-full justify-center">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">PREMIUM</div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600"><span className="font-bold text-lg">Ka</span></div>
              <h3 className="text-xl font-bold mb-2">Kashmiri Fabric</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">A luxurious blend native to the valleys. Unbelievably soft.</p>
              <ul className="space-y-1 text-xs text-gray-500"><li className="flex items-center gap-2"><Check size={12} /> Hand-loomed</li></ul>
            </div>
         </div>
      </div>
    );

    // --- Step 3: Color ---
    if (storyStep === 2) return (
      <div className="h-screen pt-20 pb-4 flex flex-col items-center justify-center bg-gray-50 px-4 animate-in zoom-in-95">
         <div className="mb-4 w-full max-w-4xl flex items-center shrink-0">
           <button onClick={() => setStoryStep(1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowLeft size={24} /></button>
           <div className="flex-1 text-center"><h2 className="text-2xl font-bold mb-1">The Final Chapter</h2><p className="text-gray-500 text-sm">Day or Night?</p></div><div className="w-10"></div>
         </div>
         <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl h-full max-h-[500px]">
            <button onClick={() => handleSelection('colorType', 'white')} className="flex-1 h-full bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-sm hover:shadow-xl group p-4">
              <GarmentSVG type="t-shirt" color="#fff" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
              <span className="mt-4 md:mt-8 text-lg font-bold text-gray-900">The Light</span>
            </button>
            <button onClick={() => handleSelection('colorType', 'black')} className="flex-1 h-full bg-gray-900 border border-gray-800 rounded-3xl flex flex-col items-center justify-center hover:scale-105 transition-transform shadow-xl group relative overflow-hidden p-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-gray-700 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <GarmentSVG type="t-shirt" color="#111" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 relative z-10" />
              <span className="mt-4 md:mt-8 text-lg font-bold text-white relative z-10">The Dark</span>
            </button>
         </div>
      </div>
    );
    return null;
  };

  const ResultView = () => (
    matchedProduct ? (
      <div className="min-h-screen pt-24 pb-12 bg-white px-4 animate-in fade-in slide-in-from-bottom-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[3rem] bg-gray-50 aspect-square flex items-center justify-center p-12 overflow-hidden shadow-inner">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-70"></div>
             <GarmentSVG type={matchedProduct.category} color={matchedProduct.color.hex} className="w-full h-full drop-shadow-2xl animate-in zoom-in duration-1000" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wide">Your Match</span><span className="text-gray-400 text-sm">{matchedProduct.gender} • {matchedProduct.fabric}</span></div>
            <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">{matchedProduct.name}</h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed border-l-4 border-purple-500 pl-6">{matchedProduct.description}</p>
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Select Size</h3>
              <div className="flex gap-4">{['S', 'M', 'L', 'XL'].map(size => (<button key={size} onClick={() => setSelectedSize(size)} className={`w-16 h-16 rounded-2xl text-lg font-bold flex items-center justify-center transition-all border-2 ${selectedSize === size ? 'border-purple-600 bg-purple-600 text-white shadow-lg transform scale-110' : 'border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600'}`}>{size}</button>))}</div>
            </div>
            <div className="flex items-center gap-6 border-t border-gray-100 pt-8">
               <div className="text-3xl font-bold text-gray-900">₹{matchedProduct.price}</div>
               <Button onClick={addToCart} disabled={!selectedSize} className="flex-1">{selectedSize ? 'Add to Collection' : 'Select Size'}</Button>
            </div>
            <button onClick={() => { setStoryStep(0); setCurrentView('story'); setSelectedSize(null); }} className="mt-6 text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2"><RefreshCcw size={14} /> Start a new story</button>
          </div>
        </div>
      </div>
    ) : null
  );

  const CartView = () => (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Your Collection</h2>
        {cart.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-400">Your story is empty.</p><Button className="mt-4" onClick={() => setCurrentView('home')}>Begin</Button></div>
        ) : (
          <div className="space-y-4">
             {cart.map(item => (
               <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl p-2"><GarmentSVG type={item.category} color={item.color.hex} className="w-full h-full" /></div>
                  <div className="flex-1"><h3 className="font-bold text-lg">{item.name}</h3><p className="text-sm text-gray-500">{item.gender} • {item.fabric} • {item.size}</p><p className="text-sm font-semibold mt-1">₹{item.price}</p></div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 /></button>
               </div>
             ))}
             <div className="mt-8 border-t border-gray-200 pt-8">
               <div className="flex justify-between text-xl font-bold mb-8"><span>Total</span><span>₹{cart.reduce((a,c) => a+c.price, 0)}</span></div>
               <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      <Navbar cartCount={cart.length} onViewChange={setCurrentView} currentView={currentView} user={user} />
      {currentView === 'home' && <Hero />}
      {currentView === 'story' && <StoryView />}
      {currentView === 'result' && <ResultView />}
      {currentView === 'cart' && <CartView />}
      {currentView === 'profile' && <ProfileView />}
    </div>
  );
}
