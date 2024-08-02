import Container from "react-bootstrap/Container";
import logo from "./assets/logo.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiThMenuOutline } from "react-icons/ti";
import { TiThMenu } from "react-icons/ti";

function Header({ onClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="d-flex justify-content-between mt-3">
      <div>
        <Button variant="light" onClick={handleShow}>
          Menu <TiThMenu />
        </Button>

        <Offcanvas className="w-25" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title onClick={()=>window.location.reload()}>
              <img
                style={{ width: "40%", height: "40%" }}
                src={logo}
                alt="main Logo"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <a onClick={onClick}>Favourits</a>
            <hr />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <img onClick={()=>window.location.reload()} style={{ width: "40%", height: "40%" }} src={logo} alt="main Logo" />
      <div>
        <Button variant="warning">Login/Signin</Button>
      </div>
    </Container>
  );
}

export default Header;
