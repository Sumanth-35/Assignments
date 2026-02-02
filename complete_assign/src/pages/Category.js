import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Electronics → single API call
    if (name === "electronics") {
      fetch("https://fakestoreapi.com/products/category/electronics")
        .then(res => res.json())
        .then(data => setProducts(data));
    }

    // Clothing → combine men's + women's clothing
    if (name === "clothing") {
      Promise.all([
        fetch("https://fakestoreapi.com/products/category/men's clothing").then(res => res.json()),
        fetch("https://fakestoreapi.com/products/category/women's clothing").then(res => res.json())
      ]).then(([men, women]) => {
        setProducts([...men, ...women]);
      });
    }

  }, [name]);

  return (
    <div className="page">
      <h2>Welcome to {name} Page</h2>

      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Category;

