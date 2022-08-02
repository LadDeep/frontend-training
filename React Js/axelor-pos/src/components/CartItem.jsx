import React from "react";
import { Button, Stack, Row, Col } from "react-bootstrap";

export const CartItem = ({ item, onAddToCart, onRemoveFromCart }) => {
  return (
    <>
      <Row>
        <Col>
          <h4>{item.name}</h4>
          <Stack direction="horizontal" gap={3}>
            <div>
              <Button variant="danger" onClick={() => onRemoveFromCart(item)}>
                -
              </Button>
            </div>
            <div>{item.quantity} </div>
            <Button variant="success" onClick={() => onAddToCart(item)}>
              +
            </Button>
          </Stack>
        </Col>
        <Col>₹ {item.quantity * item.price}</Col>
      </Row>
    </>
  );
};
