import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-title">Benefit</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Home
            </Link>
            <Link
              to="/info"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Info
            </Link>
            <Link
              to="/beginSold"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Begin sold
            </Link>
            <Link
              to="/buy"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Buy
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
