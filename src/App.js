// feature 1
import React, { useState } from 'react'
import Products from './components/Products';
import data from './data.json'
function App() {
  const [products, setproducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');
  return (
    <div className="grid-container">
      <header>
        {/* <Link to="/">React Shopping Cart</Link>
        <Link to="/admin">Admin</Link> */}
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>

      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
