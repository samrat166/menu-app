import React from "react";
import { Button, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = ({ myCart }) => {
  return (
    <Navbar expand="sm" className="bg-light border-bottom px-2">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex justify-content-between align-items-center">
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                My Cart
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/past-orders">
                My Past Orders
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="d-flex align-items-center rounded border border-success p-1">
          <BiCart size={20} /> <h6 className="mb-0 ms-1">Cart Item: {myCart?.length}</h6>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
    </Navbar>
  );
};

export default Header;
