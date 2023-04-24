import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { Detasker } from "../typechain-types";
import Text from "./Text";
import { getString } from "../libs/Helper";
import { useEffect, useState } from "react";
import Skill from "./Skill";
import { BigNumber } from "ethers";
import { Skill as Skillm } from "../libs/models/Skill";

export default function Profile(props: { profile: Detasker.NewProfileStruct }) {
  const [profile, setProfile] = useState<Detasker.NewProfileStruct>(
    props.profile
  );
  const [addSkill, setAddSkill] = useState<boolean>(false);
  const [skill, setSkill] = useState<Skillm>(new Skillm());
  return (
    <div>
      <Modal show={addSkill} onHide={() => setAddSkill(false)}>
        <Modal.Title>
          <Container>
            <Row className="my-2">
              <Col md>
                <h2>Add Skill</h2>
              </Col>
            </Row>
          </Container>
        </Modal.Title>
        <Modal.Body>
          <Skill skill={skill} />
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col md className="w-100">
                <Button
                  className="w-100"
                  onClick={() => {
                    setAddSkill(false);
                  }}
                >
                  Close
                </Button>
              </Col>
              <Col md className="w-100">
                <Button className="w-100">Save</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
      <Row className="my-3">
        <Col>
          <Image
            src={profile.image as string}
            className="profile d-flex mx-auto"
          />
        </Col>
        <Col>
          <Text
            label="Image"
            onChange={(e) => {
              profile.image = e.target.value;
              setProfile({ ...profile });
            }}
          />
        </Col>
      </Row>
      <Text
        label="Name"
        onChange={(e) => {}}
        required
        label2="Email"
        onChange2={(e) => {}}
      />
      <Button onClick={() => setAddSkill(true)}>Add Skill</Button>
    </div>
  );
}
