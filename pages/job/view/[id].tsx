import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

export default function VeiwJob() {
  const r = useRouter();
  console.log(r);

  return (
    <div>
      <Row>
        <Col md>
          <h1>Showing job: {r.query.id}</h1>
        </Col>
      </Row>
    </div>
  );
}
