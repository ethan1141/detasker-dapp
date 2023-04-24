import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { metadata } from "../metadata";
import { ILink, generateLink } from "./interfaces/ILink";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback } from "react";
function BNavbar(props: { links: ILink[] }) {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">{metadata.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.links.map((e) => (
              <Nav.Link href={generateLink(e)} key={e.name.toLowerCase()}>
                {e.name}
              </Nav.Link>
            ))}
          </Nav>
          <div className="my-3 my-lg-0">
            <ConnectButton accountStatus="full" chainStatus="full" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BNavbar;
