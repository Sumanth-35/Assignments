import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // load cart on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page">
      <h2>Cart Page</h2>

      {cart.map((item, index) => (
        <div key={index} className="cart-row">
          <img src={item.image} alt={item.title} />

          <div className="cart-info">
            <p><b>{item.title}</b></p>
            <p>Price: ₹{item.price}</p>

            <div className="qty-box">
              <button onClick={() => decreaseQty(index)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(index)}>+</button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>

          <button
            className="purchase-btn"
            onClick={() => {
              const category = cart[0].category;
              if (category === "electronics") {
                navigate("/category/electronics");
              } else {
                navigate("/category/clothing");
              }
            }}
          >
            Purchase More
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;



