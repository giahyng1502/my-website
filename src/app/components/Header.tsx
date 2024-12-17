"use client";
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const router = useRouter();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Hungcy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                router.push("/tiktok");
              }}
            >
              Download
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                router.push("/");
              }}
            >
              Get QR
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
