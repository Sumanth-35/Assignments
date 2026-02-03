import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <h2>Description about Shoppy</h2>

      <p>
        Shoppy is a simple e-commerce application where you can browse products ,view details and add them to the cart.
      </p>

      <h3>Categories</h3>

      <div className="home-box-container">
        <Link
          to="/category/electronics"
          className="home-box"
        >
          Electronics
        </Link>

        <Link
          to="/category/clothing"
          className="home-box"
        >
          Clothing
        </Link>
      </div>
    </div>
  );
}

export default Home;




