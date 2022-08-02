import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { aisleData } from "../utils/data";
import { Item } from "./Item";

export const ItemList = ({ onAddToCart }) => {
  const [items, setItems] = useState(aisleData);

  useEffect(() => {
    //fetching to be done here;
  }, []);

  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Col key={item.id}>
            <Item info={item} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
