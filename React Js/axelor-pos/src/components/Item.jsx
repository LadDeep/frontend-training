import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Item = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={props.info.imageSrc}
        style={{ minHeight: "100px" }}
      />
      <Card.Body>
        <Card.Title>{props.info.name}</Card.Title>
        <Card.Text>₹ {props.info.price}</Card.Text>
        <Button variant="primary" onClick={() => props.onAddToCart(props.info)}>
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
};
