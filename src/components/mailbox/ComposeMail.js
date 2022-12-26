import { useRef, useState, useEffect } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

import { toggleActions } from "../../store/toggle";

let newUserEmail;

const ComposeMail = () => {
  const [email, setEmail] = useState();

  const initCount = useSelector((state) => state.toggle.number);
  const fromEmail = useSelector((state) => state.auth.email);

  const fromuserEmail = fromEmail.replace("@", "");
  const newFromUserEmail = fromuserEmail.replace(".", "");

  const emailToRef = useRef("");
  const subjectToRef = useRef("");

  const dispatch = useDispatch();

  const { isLoading, error, sendRequest: receiveTasks } = useHttp()
  const {isSending,sendingerror,sendRequest:sendTasks}=useHttp()

  const sendMailHandler = (e) => {
    e.preventDefault();

    const to = emailToRef.current.value;
    const Subject = subjectToRef.current.value;

    const userEmail = to.replace("@", "");
    newUserEmail = userEmail.replace(".", "");

   /* fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          subject: Subject,
          emailStatus: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        dispatch(toggleActions.storeEmail(newUserEmail));
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
    });  */

    const createReceiverEmail = (newUserEmail) => {
      dispatch(toggleActions.storeEmail(newUserEmail));
    };

    receiveTasks(
      {
        url:  `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}.json`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email:email,subject:Subject,emailStatus:false },
      },
      createReceiverEmail
    );

    const createSenderEmail = (newFromUserEmail) => {
      dispatch(toggleActions.addQuantity(1));
    };

    sendTasks(
      {
        url:  `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/sender${newFromUserEmail}.json`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email:email,subject:Subject },
      },
      createSenderEmail
    );


   /* fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/sender${newFromUserEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          subject: Subject,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        dispatch(toggleActions.addQuantity(1));
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
    }); */
  };

  useEffect(() => {
    const emailCount = async () => {
      if (newUserEmail) {
        const response = await fetch(
          `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiverCount${newUserEmail}.json`,
          {
            method: "PUT",
            body: JSON.stringify(initCount),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      }
    };
    emailCount().catch((error) => {
      alert(error.message);
    });
  }, [initCount]);

  const onEditorStateChange = (event) => {
    const bodyText = event.getCurrentContent().getPlainText();
    setEmail(bodyText);
  };

  return (
    <>
      <Container>
        <Card className="shadow-lg" style={{ marginTop: "50px" }}>
          <Card.Header>
            <Form>
              <input
                placeholder="To"
                ref={emailToRef}
                style={{ width: "100%", marginBottom: "10px" }}
              ></input>
              <input
                placeholder="Subject"
                ref={subjectToRef}
                style={{ width: "100%", marginBottom: "10px" }}
              ></input>
            </Form>
          </Card.Header>
          <Card.Body>
            <Editor
              onEditorStateChange={onEditorStateChange}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            ></Editor>
          </Card.Body>
          <Card.Footer className="mt-3">
            <Button variant="primary" type="submit" onClick={sendMailHandler}>
              Send
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default ComposeMail;
