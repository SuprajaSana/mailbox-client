import { useRef, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../../store/toggle";

const ComposeMail = () => {
  const [email, setEmail] = useState();

  const fromEmail=useSelector(state=>state.auth.email)

  const emailToRef = useRef("");
  const subjectToRef = useRef("");

  const dispatch = useDispatch();

  const sendMailHandler = (e) => {
    e.preventDefault();

    const to = emailToRef.current.value;
    const Subject = subjectToRef.current.value;

    fetch(
      "https://mailbox-client-69aa3-default-rtdb.firebaseio.com/email.json",
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
        dispatch(toggleActions.addQuantity());
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
  };

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
