import { Col, Form, Row } from "react-bootstrap";
import { Detasker } from "../typechain-types";
import Text from "./Text";
import { Skill as Skillm } from "../libs/models/Skill";
import { useEffect, useState } from "react";
import { setProperty } from "../libs/Helper";
import { web3 } from "../pages/_app";

export default function Skill(props: { skill: Skillm }) {
  const [skill, setSkill] = useState<Skillm>(new Skillm());
  useEffect(() => {
    setSkill({ ...props.skill });
  }, [props.skill]);
  return (
    <div>
      <Text
        label="Name"
        onChange={(e) =>
          setSkill({ ...setProperty("skillName", skill, e.target.value) })
        }
        label2="url"
        required
        onChange2={(e) =>
          setSkill({ ...setProperty("url", skill, e.target.value) })
        }
        required2
      />
      <Row>
        <Col md>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) =>
              setSkill({ ...setProperty("skill", skill, e.target.value) })
            }
          />
        </Col>
      </Row>
    </div>
  );
}
