import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase! 🌿 Your plants are on their way!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>🌱 Your cart is empty. Go pick some plants!</p>
          <br />
          <button className="get-started-btn" onClick={onContinueShopping}>
            Browse Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})</h2>

      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)} each</p>
            </div>

            {/* Quantity controls */}
            <div className="cart-item-controls">
              <button
                className="qty-btn"
                onClick={() => handleDecrement(item)}
                title="Decrease quantity"
              >
                −
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleIncrement(item)}
                title="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Item subtotal */}
            <div className="cart-item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove button */}
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
              title="Remove item"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Total: ${totalCost.toFixed(2)}</h3>
        <div>
          <button className="continue-btn" onClick={onContinueShopping}>
            ← Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
