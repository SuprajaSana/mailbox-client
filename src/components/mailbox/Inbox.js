import { Container, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../../store/toggle";

const Inbox = (props) => {
  const [email, setEmail] = useState(false);

  const dispatch=useDispatch()

  const emailShownHandler = () => {
    setEmail(true);
    dispatch(toggleActions.readEmails())
  };

  function deleteMailHandler(newEmail) {
    const response = fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/email/${newEmail}.json`,
      {
        method: "DELETE",
      }
    );
  }

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
            <button style={{marginLeft:'85%'}} onClick={(e)=>deleteMailHandler(props.id,e)}>DELETE</button>
          </ul>
        </Container>
      )}
    </>
  );
};

export default Inbox;
