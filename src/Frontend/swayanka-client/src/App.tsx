import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Result } from './pages/Result';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { useEffect, useState } from 'react';
import { getCart } from './api';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';

// Inner component to access AuthContext
const AppContent = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();
  const userId = user ? user.id : 'guest-user';

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
  }, [userId]);

  return (
      <div className="font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
        <Navbar cartCount={cartCount} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/result" element={<Result />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
  );
};

function App() {
  // REPLACE WITH YOUR ACTUAL GOOGLE CLIENT ID
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
