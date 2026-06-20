import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';

const plantData = [
  {
    id: 1,
    category: 'Tropical Houseplants',
    name: 'Monstera Deliciosa',
    description: 'Bold split leaves bring a jungle vibe to any room. Thrives in bright indirect light.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
  },
  {
    id: 2,
    category: 'Tropical Houseplants',
    name: 'Bird of Paradise',
    description: 'Statement floor plant with dramatic paddle leaves. Loves sun and warmth.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 3,
    category: 'Tropical Houseplants',
    name: 'Peace Lily',
    description: 'Elegant white blooms and lush foliage. Excellent air purifier.',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7b8a?w=400&q=80',
  },
  {
    id: 4,
    category: 'Tropical Houseplants',
    name: 'Philodendron Brasil',
    description: 'Trailing vines with green-and-yellow variegation. Easy-care and fast-growing.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1587334207408-9bed6a26e626?w=400&q=80',
  },
  {
    id: 5,
    category: 'Tropical Houseplants',
    name: 'Rubber Plant',
    description: 'Deep burgundy leaves with a glossy finish. Tolerates low light and neglect.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
  },
  {
    id: 6,
    category: 'Tropical Houseplants',
    name: 'ZZ Plant',
    description: 'Nearly indestructible waxy stems. Perfect for low-light corners and beginners.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1572688484438-313a6a50be7d?w=400&q=80',
  },
  {
    id: 7,
    category: 'Succulents & Cacti',
    name: 'Echeveria Lola',
    description: 'Rosette-shaped lavender-pink succulent. Minimal water needs, maximum charm.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80',
  },
  {
    id: 8,
    category: 'Succulents & Cacti',
    name: 'Golden Barrel Cactus',
    description: 'Classic ball cactus with golden spines. Thrives in bright sun and sandy soil.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
  },
  {
    id: 9,
    category: 'Succulents & Cacti',
    name: 'Aloe Vera',
    description: "Nature's first-aid plant. Soothing gel inside, striking form outside.",
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&q=80',
  },
  {
    id: 10,
    category: 'Succulents & Cacti',
    name: 'Haworthia Zebra',
    description: 'Compact striped succulent ideal for desks and windowsills. Drought-tolerant.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=400&q=80',
  },
  {
    id: 11,
    category: 'Succulents & Cacti',
    name: 'Prickly Pear Cactus',
    description: 'Flat paddle segments with colorful spines. Surprisingly easy to grow indoors.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=400&q=80',
  },
  {
    id: 12,
    category: 'Succulents & Cacti',
    name: 'String of Pearls',
    description: 'Cascading bead-like leaves perfect for hanging baskets. Unique and eye-catching.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&q=80',
  },
  {
    id: 13,
    category: 'Air-Purifying Plants',
    name: 'Snake Plant',
    description: 'NASA-approved air purifier. Architectural upright leaves, nearly indestructible.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7b8a?w=400&q=80',
  },
  {
    id: 14,
    category: 'Air-Purifying Plants',
    name: 'Spider Plant',
    description: 'Fast-growing, pet-safe, and brilliant at removing toxins. Cheerful arching leaves.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&q=80',
  },
  {
    id: 15,
    category: 'Air-Purifying Plants',
    name: 'Golden Pothos',
    description: 'Hardy trailing vine that filters formaldehyde and CO. Great for shelves.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1620127807580-990bf7d8e49b?w=400&q=80',
  },
  {
    id: 16,
    category: 'Air-Purifying Plants',
    name: 'Bamboo Palm',
    description: 'Elegant tropical palm that removes benzene and trichloroethylene from air.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1616500450373-bff6fc82aafc?w=400&q=80',
  },
];

const grouped = plantData.reduce((acc, plant) => {
  if (!acc[plant.category]) acc[plant.category] = [];
  acc[plant.category].push(plant);
  return acc;
}, {});

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (id) => cartItems.some((item) => item.id === id);
  const handleAdd = (plant) => dispatch(addItem(plant));

  return (
    <div className="product-list-page">
      {totalCount > 0 && (
        <div style={{ textAlign: 'right', padding: '1rem 2rem 0' }}>
          <button className="get-started-btn" onClick={onCartClick} style={{ fontSize: '0.95rem' }}>
            🛒 View Cart ({totalCount})
          </button>
        </div>
      )}
      <h2>Our Plant Collection</h2>
      {Object.entries(grouped).map(([category, plants]) => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="plant-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.image} alt={plant.name} />
                <div className="plant-card-body">
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <div className="plant-price">${plant.price.toFixed(2)}</div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAdd(plant)}
                    disabled={isInCart(plant.id)}
                  >
                    {isInCart(plant.id) ? '✅ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;