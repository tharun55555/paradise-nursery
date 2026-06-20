import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

function App() {
  // 'landing' | 'products' | 'cart' | 'about'
  const [page, setPage] = useState('landing');

  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Navbar (hidden on landing) */}
      {page !== 'landing' && (
        <nav className="navbar">
          <h2 onClick={() => setPage('landing')} style={{ cursor: 'pointer' }}>
            🌿 Paradise Nursery
          </h2>
          <div className="navbar-right">
            <span
              style={{ cursor: 'pointer', color: '#c8e6c9' }}
              onClick={() => setPage('products')}
            >
              Plants
            </span>
            <span
              style={{ cursor: 'pointer', color: '#c8e6c9' }}
              onClick={() => setPage('about')}
            >
              About Us
            </span>
            <button className="cart-icon-btn" onClick={() => setPage('cart')}>
              🛒
              {totalCount > 0 && (
                <span className="cart-count">{totalCount}</span>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Pages */}
      {page === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Bring nature home — discover plants that breathe life into every space.</p>
            <button className="get-started-btn" onClick={() => setPage('products')}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {page === 'products' && (
        <ProductList onCartClick={() => setPage('cart')} />
      )}

      {page === 'cart' && (
        <CartItem onContinueShopping={() => setPage('products')} />
      )}

      {page === 'about' && <AboutUs />}
    </div>
  );
}

export default App;
