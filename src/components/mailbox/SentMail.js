import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SentMail = (props) => {
  const [email, setEmail] = useState(false);

  const emailShownHandler = () => {
    setEmail(true);
  };

  return (
    <>
      {!email && (
        <Container className="mt-1" style={{ marginLeft: "200px" }}>
          <ul>
            <Link to={`/sent/${props.id}`}>
              <Button
                onClick={emailShownHandler}
                variant="white"
                style={{
                  width: "90%",
                  borderColor: "black",
                  textAlign: "initial",
                }}
              >
                <span>{props.subject}</span>
              </Button>
            </Link>
          </ul>
        </Container>
      )}
    </>
  );
};

export default SentMail;
