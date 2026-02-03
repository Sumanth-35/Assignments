import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      ...product,
      quantity: 1   // ✅ VERY IMPORTANT
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="page">
      <h2>{product.title}</h2>

      <div className="product-detail">
        <img src={product.image} alt={product.title} />

        <div>
          <p><b>Price:</b> ₹{product.price}</p>
          <p><b>Category:</b> {product.category}</p>
          <p>{product.description}</p>

          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;


