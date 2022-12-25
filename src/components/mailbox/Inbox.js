import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Inbox = (props) => {
  const [email, setEmail] = useState(false);

  const showEmailRead = props.seenStatus;

  const initCount = useSelector((state) => state.toggle.readNumber);

  const fromEmail = useSelector((state) => state.auth.email);

  const fromuserEmail = fromEmail.replace("@", "");
  const newFromUserEmail = fromuserEmail.replace(".", "");

  const dispatch = useDispatch();

  const emailShownHandler = async (id) => {
    setEmail(true);
    const response = await fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newFromUserEmail}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    const newResponse = await fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newFromUserEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: props.email,
          subject: props.subject,
          emailStatus: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("User sent mail");
      } else {
        response.json().then((data) => {
          let errorMessage = "Failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });

    if (!showEmailRead) {
      const deleteCountresponse = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiverCount${newFromUserEmail}.json`,
        {
          method: "DELETE",
        }
      );

      const setnewEmailCount = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiverCount${newFromUserEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(initCount),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.ok) {
          console.log("User sent mail");
        } else {
          response.json().then((data) => {
            let errorMessage = "Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <>
      {!email && (
        <Container className="mt-1" style={{ marginLeft: "200px" }}>
          <ul>
            <Link to={`/inbox/${props.id}`}>
              <Button
                onClick={(e) => emailShownHandler(props.id, e)}
                variant="white"
                style={{
                  width: "90%",
                  borderColor: "black",
                  textAlign: "initial",
                }}
              >
                {!showEmailRead && (
                  <span
                    style={{
                      marginRight: "20px",
                      padding: "0.1rem",
                      backgroundColor: "blue",
                      borderRadius: "10px",
                    }}
                  >
                    .
                  </span>
                )}
                <span>{props.subject}</span>
              </Button>
            </Link>
          </ul>
        </Container>
      )}
    </>
  );
};

export default Inbox;
