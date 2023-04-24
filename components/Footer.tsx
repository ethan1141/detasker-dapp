import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer>
      <Row>
        <Col md>
          <a
            href="https://rainbow.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made with ❤️ by your frens at 🌈
          </a>
        </Col>
        <Col md>col 2</Col>
      </Row>
    </footer>
  );
}
