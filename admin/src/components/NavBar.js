/* import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-title fc-gold">Benefit</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
 */

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
            <Nav.Link>
              <Link
                to="/"
                className="decoration-none margin-l-2 fc-white navbar-link"
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/info"
                className="decoration-none margin-l-2 fc-white navbar-link"
              >
                Info
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/beginSold"
                className="decoration-none margin-l-2 fc-white navbar-link"
              >
                Begin sold
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
