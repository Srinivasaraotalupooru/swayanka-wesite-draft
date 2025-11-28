import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Result } from './pages/Result';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import { getCart } from './api';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const userId = 'guest-user';

  // Simple polling for cart count for demo purposes
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart(userId);
        setCartCount(cart?.items?.length || 0);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCart();
    const interval = setInterval(fetchCart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
        <Navbar cartCount={cartCount} user={{ name: 'Guest' }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/result" element={<Result />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
