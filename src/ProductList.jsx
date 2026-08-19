import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night and improves air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters pollutants from indoor air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Purifies the air and removes mold spores.', cost: '$18' },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity and helps remove toxins.', cost: '$20' },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at removing toxins.', cost: '$17' },
      { name: 'Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'A hardy indoor plant that grows easily.', cost: '$10' }
    ]
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop', description: 'Calming scent used in aromatherapy.', cost: '$20' },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop', description: 'Sweet fragrance that promotes relaxation.', cost: '$18' },
      { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Aromatic herb commonly used in cooking.', cost: '$15' },
      { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma used in tea and cooking.', cost: '$12' },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent that promotes relaxation.', cost: '$14' },
      { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Beautiful flowering plant with a fragrant scent.', cost: '$22' }
    ]
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Known for soothing skin.', cost: '$14' },
      { name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'Popular medicinal flowering plant.', cost: '$16' },
      { name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'Refreshing medicinal herb.', cost: '$13' },
      { name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'Traditionally used for relaxation.', cost: '$15' },
      { name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'A medicinal flowering plant.', cost: '$12' },
      { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'Aromatic herb used in food and traditional remedies.', cost: '$9' }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));

    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div>
          <a href="#" onClick={handleHomeClick}>
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </a>
        </div>

        <div>
          <a href="#" onClick={handleHomeClick}>Home</a>
          {' | '}
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          {' | '}
          <a href="#" onClick={handleCartClick}>
            Cart 🛒 ({totalItems})
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>

              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="product-title">{plant.name}</div>
                    <div className="product-price">{plant.cost}</div>
                    <p>{plant.description}</p>

                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name]
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
