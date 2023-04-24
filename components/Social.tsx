import { Col, Form, Row } from "react-bootstrap";
import Text from "./Text";
import { useState } from "react";
import { setProperty } from "../libs/Helper";
import { Social as Socialm } from "../libs/models/Social";

export default function Social() {
  const [social, setSocial] = useState<Socialm>(new Socialm());
  return (
    <div>
      <Row>
        <Col md>
          <Form.FloatingLabel label="Name">
            <Form.Control
              onChange={(e) =>
                setSocial({
                  ...setProperty("name", social, e.target.value),
                })
              }
            />
          </Form.FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col md>
          <Form.FloatingLabel label="URL">
            <Form.Control
              onChange={(e) =>
                setSocial({
                  ...setProperty("url", social, e.target.value),
                })
              }
            />
          </Form.FloatingLabel>
        </Col>
      </Row>
    </div>
  );
}
