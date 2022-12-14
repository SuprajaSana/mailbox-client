import { Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const Inbox = (props) => {
  const [email, setEmail] = useState(false);

  const emailShownHandler = () => {
    setEmail(true);
  };

  return (
    <>
      {!email && (
        <Container className="mt-1" style={{ marginLeft: "200px" }}>
          <ul>
            <Link to={`/inbox/${props.id}`}>
              <Button
                onClick={emailShownHandler}
                variant="white"
                style={{
                  width: "100%",
                  borderColor: "black",
                  textAlign: "initial",
                }}
              >
                {props.subject}
              </Button>
            </Link>
          </ul>
        </Container>
      )}
    </>
  );
};

export default Inbox;
