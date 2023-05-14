import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer>
      {" "}
      <div>
        <Row>
          <Col>
            <Row>
              <p className="text-center">Socials</p>
            </Row>
            <Row></Row>
            <Row className="mt-3">
              <p>ss</p>
            </Row>
          </Col>
          <Col md>
            <p className="text-center footerHeader">Policies</p>
            <ul>
              <li>
                <a target="_blank" href="/">
                  Terms of service
                </a>
              </li>
              <li>
                <a target="_blank" href="/">
                  Privacy policy
                </a>
              </li>
              <li>
                <a target="_blank" href="/">
                  Refund policy
                </a>
              </li>
            </ul>

            {/* <InputGroup>
        <InputGroup.Text>Mailing list</InputGroup.Text>
        <Form.Control placeholder='example@example.com' type='email'/>
        <Button>Add</Button>
    </InputGroup> */}
            <p className="text-center footerHeader">Useful links</p>
            <ul>
              <li>
                <a target="_blank" href="/">
                  Contact
                </a>
              </li>
              <li>
                <a target="_blank" href="/">
                  Support Articles
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="my-4">
          <Col className="appStore" lg></Col>
          <Col className="appStore" mmd></Col>
          <Col className="appStore" md></Col>
        </Row>
        <Row className="my-3">
          <Col>
            <div id="pr-reviews-comprehensive-widget"></div>
          </Col>
        </Row>
      </div>
    </footer>
  );
}
