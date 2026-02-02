import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  return (
    <div className="header">
      <h2>Welcome to Shoppy Page</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/category/electronics">Electronics</Link>
        <Link to="/category/clothing">Clothing</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
    </div>
  );
}

export default Header;


