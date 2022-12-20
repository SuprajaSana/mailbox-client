import { Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleActions } from "../../store/toggle";

const SentMail = (props) => {

   const [email, setEmail] = useState(false);

  const [showEmail, setHideEmail] = useState(true);

  const dispatch = useDispatch();

  const emailShownHandler = () => {
    setEmail(true);
    setHideEmail(false);
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
    )
}

export default SentMail;