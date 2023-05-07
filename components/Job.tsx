import { useEffect, useState } from "react";
import { Job as Jobm } from "../libs/models/Job";
import Text from "./Text";
import { setProperty } from "../libs/Helper";
import { Col, Form, Row } from "react-bootstrap";
import { BigNumber, ethers } from "ethers";

type JobProps = {
  job: Jobm;
  setJob: (j: Jobm) => void;
};

export default function Job(props: JobProps) {
  const [job, setJob] = useState<Jobm>(new Jobm());

  useEffect(() => {
    setJob({ ...props.job });
  }, [props.job]);

  useEffect(() => {
    if (job.changed) {
      job.changed = false;
      props.setJob(job);
    }
  }, [job]);
  return (
    <div>
      <Text
        label={"Title"}
        required
        onChange={(e) =>
          setJob({ ...setProperty("title", job, e.target.value) })
        }
        label2="Price"
        required2
        onChange2={(e) => {
          if (!isNaN(parseFloat(e.target.value))) {
            setJob({
              ...setProperty(
                "requestedPaymentAmount",
                job,
                ethers.utils.parseEther(e.target.value)
              ),
            });
          }
        }}
      />
      <Row>
        <Col md>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) =>
              setJob({ ...setProperty("description", job, e.target.value) })
            }
          />
        </Col>
      </Row>
      <Row>
        <Col md>
          <Form.Label>Publish</Form.Label>
          <Form.Switch
            onChange={(e) =>
              setJob({ ...setProperty("publish", job, e.target.checked) })
            }
          />
        </Col>
      </Row>
    </div>
  );
}
