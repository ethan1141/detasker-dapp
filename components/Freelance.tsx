import { Col, Form, Row } from "react-bootstrap";
import Text from "./Text";
import { useState } from "react";
import { Freelancer } from "../libs/models/Freelancer";
import { setProperty } from "../libs/Helper";

export default function Freelance() {
  const [freelance, SetFreelance] = useState<Freelancer>(new Freelancer());
  return (
    <div>
      <Row>
        <Col md>
          <Form.Label>Are you a freelancer</Form.Label>
          <Form.Switch
            size={1}
            onChange={(e) =>
              SetFreelance({
                ...setProperty("isFreelancer", freelance, e.target.checked),
              })
            }
          />
        </Col>
      </Row>
      {freelance.isFreelancer && (
        <div>
          <Row>
            <Col md>
              <Form.Label>Are you a currently avaliable</Form.Label>
              <Form.Switch
                size={1}
                onChange={(e) =>
                  SetFreelance({
                    ...setProperty("active", freelance, e.target.checked),
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Label className="formLabel">Main skills</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) =>
                  SetFreelance({
                    ...setProperty("mainSkills", freelance, e.target.value),
                  })
                }
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
