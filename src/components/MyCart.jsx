import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Col, Row, Table } from "react-bootstrap";

const CartSummaryTable = ({ myCart, onCheckoutClick }) => {
  const totalAmount = useMemo(
    () => myCart?.reduce((a, b) => a + b.count * b.item.price, 0).toFixed(2),
    [myCart]
  );
  return (
    <div>
      <Table bordered striped>
        <thead>
          <tr>
            <th className="bg-secondary mid text-white">SN</th>
            <th className="bg-secondary mid text-white">Item</th>
            <th className="bg-secondary mid text-white">Price</th>
            <th className="bg-secondary mid text-white">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {myCart.map((cart, index) => (
            <tr key={cart?.item?.itemId}>
              <td className="mid">{index + 1}</td>
              <td className="mid">{cart.item.name}</td>
              <td className="mid">${cart.item.price}</td>
              <td className="mid">{cart.count}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} align="right">
              Total
            </td>
            <td>${totalAmount}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        size="sm"
        variant="success"
        className="w-100"
        onClick={onCheckoutClick}
      >
        Place an Order (${totalAmount})
      </Button>
    </div>
  );
};

const CartItem = ({ cartItem, decreaseCount, increaseCount, removeItem }) => {
  const { item, count } = cartItem;
  return (
    <div className="card mb-3">
      <Row className="g-0">
        <Col md={4} className="">
          <img
            src={item.image}
            className="rounded-start"
            height={180}
            width={"100%"}
            style={{
              objectFit: "cover",
            }}
            alt={item.name}
          />
        </Col>
        <Col md={8} className="d-flex flex-column p-2">
          <div className="flex-grow-1 m-1">
            <h5 className="fw-bold card-title">{item.name}</h5>
            <p className="card-text">{item.description}</p>
            <Badge className="text-white hover" bg="success">
              ${item?.price}
            </Badge>
          </div>

          <div className="d-flex flex-wrap align-items-center">
            <div
              style={{ height: 25 }}
              className="d-flex align-items-center border border-success border-2"
            >
              <Button
                size="sm"
                variant="success"
                className="py-0 rounded-0 d-flex align-items-center"
                disabled={cartItem?.count <= 1}
                onClick={() => decreaseCount(cartItem)}
              >
                -
              </Button>
              <span className="mx-2 mb-0">{count}</span>
              <Button
                size="sm"
                variant="success"
                className="py-0 rounded-0 d-flex align-items-center"
                onClick={() => increaseCount(cartItem)}
              >
                +
              </Button>
            </div>
            <Button
              size="sm"
              variant="danger"
              className="m-1 py-0 d-flex align-items-center"
              onClick={() => removeItem(item.itemId)}
            >
              Remove
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const MyCart = ({ myCart, setMyCart, setOrders }) => {

  const increaseCount = async (item) => {
    const updatedItem = { ...item, count: item.count + 1 };
    try {
      const data = await fetch(`http://localhost:4000/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(updatedItem),
      });
      const { response, error } = await data.json();
      if (response) {
        setMyCart(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCount = async (item) => {
    const updatedItem = { ...item, count: item.count - 1 };
    try {
      const data = await fetch(`http://localhost:4000/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(updatedItem),
      });
      const { response, error } = await data.json();
      if (response) {
        setMyCart(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const data = await fetch(`http://localhost:4000/cart/${itemId}`, {
        method: "DELETE",
      });
      const { response, error } = await data.json();
      if (response) {
        setMyCart(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckoutClick = async () => {
    try {
      const data = await fetch(`http://localhost:4000/order`, {
        method: "POST",
      });
      const { response, error } = await data.json();
      if (response) {
        setMyCart(response.cart);
        setOrders(response.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2">
      <Row>
        <Col className="m-0 p-0" md={6}>
          <div className="">
            <h2>My Cart</h2>
            {myCart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="overflow-auto" style={{ height: '75vh' }}>
                {myCart.map((cartItem) => (
                  <CartItem
                    key={cartItem.item.itemId}
                    cartItem={cartItem}
                    decreaseCount={decreaseCount}
                    increaseCount={increaseCount}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            )}{" "}
          </div>
        </Col>
        <Col className="m-0 p-0" md={6}>
          <div className="px-2">
            <h2>Cart Summart</h2>
            {myCart.length === 0 ? (
              <p>Nothing to show</p>
            ) : (
              <CartSummaryTable
                myCart={myCart}
                onCheckoutClick={onCheckoutClick}
              />
            )}{" "}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyCart;
