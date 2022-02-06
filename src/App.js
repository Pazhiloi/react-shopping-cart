// feature 1
import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
  localStorage.getItem("cartItems") ?  JSON.parse(localStorage.getItem("cartItems")) : []
  );

  const createOrder = (order) => {
    alert('Need to save order for' + order.name)
  }

  const removeFromCart = (product) => {
    const cartItemsSliced = cartItems.slice();
    setCartItems(cartItemsSliced.filter((x) => x._id !== product._id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItemsSliced.filter((x) => x._id !== product._id))
    );
  }
  const addToCart = (product) => {
    const cartItemsSliced = cartItems.slice();
    let alreadyInCart = false;
    cartItemsSliced.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true
      }
    });
    if (!alreadyInCart) {
      cartItemsSliced.push({...product, count: 1})
    }
    setCartItems(cartItemsSliced);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsSliced));
  }
  const sortProducts = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };
  const filterProducts = (e) => {
    const target = e.target.value;
    if (target === "") {
      setSize(target);
      setProducts(data.products);
    } else {
      setSize(target);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(target) >= 0
        )
      );
    }
  };
  return (
    <div className="grid-container">
      <header>
        {/* <Link to="/">React Shopping Cart</Link>
        <Link to="/admin">Admin</Link> */}
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products addToCart={addToCart} products={products} />
          </div>
          <div className="sidebar">
            <Cart
              createOrder={createOrder}
              removeFromCart={removeFromCart}
              cartItems={cartItems}
            />
          </div>
        </div>
      </main>

      <footer>All right is reserved.</footer>
    </div>
  );
}

export default App;
