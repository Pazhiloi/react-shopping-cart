// feature 1
import React, { useState } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

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
