import { Row, Card, Col } from "react-bootstrap";

import ComposeMailPage from "./ComposeMailPage";
import InboxPage from "../components/mailbox/InboxMail";
import SentPage from "../components/mailbox/SentMail";
import LogOutPage from "./LogoutPage";

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
          <Card.Body>
            <SentPage></SentPage>
          </Card.Body>
          <Card.Body>
            <LogOutPage></LogOutPage>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
