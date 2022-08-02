import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CartList } from "./components/CartList";
import { ItemList } from "./components/ItemList";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const onAddToCart = (itemToBeAdded) => {
    setCartItems((cartItems) => {
      const index = cartItems.findIndex((item) => item.id === itemToBeAdded.id);
      if (index === -1) {
        return [...cartItems, { ...itemToBeAdded, quantity: 1 }];
      } else {
        return cartItems.map((item, i) => ({
          ...item,
          quantity: index === i ? item.quantity + 1 : item.quantity,
        }));
      }
    });
  };
  const onRemoveFromCart = (itemToBeRemoved) => {
    setCartItems((cartItems) => {
      if (itemToBeRemoved.quantity !== 1) {
        return [
          ...cartItems,
          { ...itemToBeRemoved, quantity: itemToBeRemoved.quantity - 1 },
        ];
      } else {
        return cartItems.filter((item) => item.id !== itemToBeRemoved.id);
      }
    });
  };
  return (
    <Row>
      <Col xs={7} md={9}>
        <ItemList onAddToCart={onAddToCart} />
      </Col>
      <Col>
        <CartList
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      </Col>
    </Row>
  );
}

export default App;
