import { Container, Card } from "react-bootstrap";

const Inbox = (props) => {
  return (
    <>
      <Container className="mt-1" style={{ marginLeft: "200px" }}>
        <Card>
          <ul>
            {props.subject}
            {props.email}
          </ul>
        </Card>
      </Container>
    </>
  );
};

export default Inbox;
