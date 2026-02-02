import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route
          path="/product/:id"
          element={<Product cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;

