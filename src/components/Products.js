import React, { useState } from "react";
import formatCurrency from "../util";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal";
const Products = ({ products, addToCart }) => {
  const [product, setModalProduct] = useState(null);

  const openModal = (product) => {
    setModalProduct(product);
  };
  const closeModal = () => {
    setModalProduct(null);
  };
  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-pride">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>
                  {product.description}
                </p>
                <p>
                  Available Sizes: {" "}
                  {product.availableSizes.map(x => (
                    <span> {" "} <button className="button">{x}</button> </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>
                    {formatCurrency(product.price)}
                  </div>
                  <button onClick={() => {
                    addToCart(product)
                    closeModal()
                  }} className="button primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
