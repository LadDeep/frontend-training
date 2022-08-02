import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { CartItem } from "./CartItem";

export const CartList = ({ cartItems, onAddToCart, onRemoveFromCart }) => {
  const [items, setItems] = useState(cartItems);
  const [totalAmount, setTotalAmount] = useState();
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);
  if (cartItems.length === 0) {
    return <Alert variant="primary">Cart is Empty</Alert>;
  }
  return (
    items &&
    items.map((item, index) => (
      <CartItem
        key={index}
        item={item}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    ))
  );
};
