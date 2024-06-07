import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import MyCart from "./components/MyCart";
import PastOrders from "./components/PastOrders";

function App() {
  const [myCart, setMyCart] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await fetch("http://localhost:4000/cart");
        const { response, error } = await data.json();
        if (response) {
          setMyCart(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPastOrders = async () => {
      try {
        const data = await fetch("http://localhost:4000/orders");
        const { response, error } = await data.json();
        if (response) {
          setOrders(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPastOrders();
    fetchCart();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column">
      <Header myCart={myCart} />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route
            path="/"
            element={<Home myCart={myCart} setMyCart={setMyCart} />}
          />
          <Route
            path="/cart"
            element={
              <MyCart
                myCart={myCart}
                setMyCart={setMyCart}
                setOrders={setOrders}
              />
            }
          />
          <Route
            path="/past-orders"
            element={<PastOrders orders={orders} setOrders={setOrders} />}
          />
          <Route path="*" element={<div className="">Not found</div>} />
        </Routes>{" "}
      </div>
    </div>
  );
}

export default App;
