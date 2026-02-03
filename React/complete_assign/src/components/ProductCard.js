import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </h4>
    </div>
  );
}

export default ProductCard;
