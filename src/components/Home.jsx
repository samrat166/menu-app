import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";

const MenuItem = ({ item, addToCart, alreadyInCart }) => {
  return (
    <Col sm={6} md={4} lg={3} className="p-3">
      <div className="d-flex flex-column border rounded h-100 w-100 m-1 p-2">
        <img
          src={item?.image}
          height={200}
          width={"100%"}
          style={{
            objectFit: "cover",
          }}
          alt="Item"
        />

        <div className="flex-grow-1 d-flex justify-content-between align-items-center border-bottom w-100 p-1">
          <h6 className="fs-5 mb-0">{item?.name}</h6>
          <Badge className="text-white hover" bg="secondary">
            ${item?.price}
          </Badge>
        </div>
        <p className="mb-0">{item?.description}</p>
        <Button
          disabled={alreadyInCart}
          onClick={() => addToCart(item?.itemId)}
          variant={alreadyInCart ? "secondary" : "success text-white"}
          size="sm"
          className="w-100 mt-1"
        >
          {alreadyInCart ? "Added to cart" : "Add to cart"}
        </Button>
      </div>
    </Col>
  );
};

const Home = ({ myCart, setMyCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addToCart = async (cartId) => {
    try {
      const data = await fetch(`http://localhost:4000/add-to-cart/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { response: cart, error } = await data.json();
      if (error) {
        alert(error);
      }
      if (cart) {
        setMyCart(cart);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch("http://localhost:4000/menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuItem();
  }, []);
  return (
    <div>
      <div className="d-flex w-100 justify-content-between">
        <div>
          <h6 className="fw-bold fs-2">Find your best food</h6>
          <h6 className="fs-3">Order & Eat</h6>
        </div>
      </div>

      <Row className="d-flex flex-wrap">
        {menuItems?.map((item, index) => {
          const alreadyInCart = myCart?.find(
            (cart) => cart?.item?.itemId === item?.itemId
          );
          return (
            <MenuItem
              key={index}
              item={item}
              alreadyInCart={alreadyInCart}
              addToCart={addToCart}
            />
          );
        })}
      </Row>
    </div>
  );
};

export default Home;
