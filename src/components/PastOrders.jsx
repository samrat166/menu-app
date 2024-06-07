import React, { useMemo } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const OrderSummaryTable = ({ items = [] }) => {
  const totalAmount = useMemo(
    () => items?.reduce((a, b) => a + b.count * b.item.price, 0).toFixed(2),
    [items]
  );
  return (
    <div>
      <Table className="m-0 mb-0" bordered striped>
        <thead>
          <tr>
            <th className="bg-secondary mid text-white">SN</th>
            <th className="bg-secondary mid text-white">Item</th>
            <th className="bg-secondary mid text-white">Price</th>
            <th className="bg-secondary mid text-white">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((cart, index) => (
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
    </div>
  );
};

const OrderCard = ({ order, orderNumber, deleteOrder }) => {
  return (
    <div className="d-flex flex-column border rounded w-100 m-1">
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
        <h5 className="mb-0">Order Number #{orderNumber}</h5>
        <Button
          variant="danger"
          size="sm"
          className="px-1 py-0"
          onClick={() => deleteOrder(order)}
        >
          <span className="smallFont">Delete </span>
        </Button>
      </div>
      <div className="p-2 overflow-auto">
        <OrderSummaryTable items={order?.items} />
      </div>
    </div>
  );
};

const PastOrders = ({ orders, setOrders }) => {
  const deleteOrder = async (order) => {
    try {
      const data = await fetch(`http://localhost:4000/order/${order.id}`, {
        method: "DELETE",
      });
      const { response, error } = await data.json();
      if (response) {
        setOrders(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <div className="w-100">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Row>
            {orders.map((order, index) => (
              <Col sm={6} md={4} lg={3} className="p-3" key={order.id}>
                <OrderCard
                  order={order}
                  orderNumber={index + 1}
                  deleteOrder={deleteOrder}
                />
              </Col>
            ))}
          </Row>
        )}{" "}
      </div>
    </div>
  );
};

export default PastOrders;
