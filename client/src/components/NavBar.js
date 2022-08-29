import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import benefitLogo from "../images/benefit-logo.png";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-title">
          <img
            src={benefitLogo}
            alt="logo"
            className="width-4 margin-r-1 green-border-2 border-radius-50-p"
          />
          Benefit
        </Navbar.Brand>
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
              to="/dappInfo"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Dapp info
            </Link>
            <Link
              to="/buy"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Buy
            </Link>
            <Link
              to="/redeem"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Redeem
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
