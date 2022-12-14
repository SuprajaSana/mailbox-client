import { Row, Card, Col, Button } from "react-bootstrap";
import ComposeMailPage from "./ComposeMailPage";
import InboxPage from "./InboxPage";

const Welcome = () => {
  return (
    <div>
      <Row>
        <Col>
          <Card.Header style={{ marginTop: "30px", marginBottom: "30px" }}>
            <h1>Welcome to your mailbox</h1>
          </Card.Header>
          <Card.Body>
            <ComposeMailPage></ComposeMailPage>
          </Card.Body>
          <Card.Body>
            <InboxPage></InboxPage>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
