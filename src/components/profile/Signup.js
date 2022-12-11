import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { Alert, Button, Card } from "react-bootstrap";
import { Form, Container } from "react-bootstrap";

const Signup = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmpasswordRef = useRef("");

  const [error, setError] = useState(false);
  const [isSendingRequest, setSendingRequest] = useState(false);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;

    if (passwordValue !== confirmpassword) {
      setError(true);
      alert("Password does not match");
      setSendingRequest(false);
    } else {
      setSendingRequest(true);

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1tWZ03i-QTCu57lXyzLqXeBl0tXlweeY",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        setSendingRequest(false);
        if (response.ok) {
          //return response.json();
          console.log("User has successfully signed up");
        } else {
          response.json().then((data) => {
            let errorMessage = "Authentication Failed!";
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
      <Container className="mt-5" style={{ width: "550px" }}>
        <Card className="shadow-lg" style={{ marginTop: "150px" }}>
          <Card.Header style={{ backgroundColor: "grey" }}>
            <h4>SignUp</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitFormHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailInputRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Control
                  type="confirmpassword"
                  placeholder="Confirm Password"
                  ref={confirmpasswordRef}
                  required
                />
              </Form.Group>
              {!isSendingRequest && (
                <Button
                  variant="secondary"
                  type="submit"
                  style={{ marginLeft: "400px" }}
                >
                  Sign Up
                </Button>
              )}
              {isSendingRequest && (
                <Alert style={{ textAlign: "center" }}>Sending Request</Alert>
              )}
              <Card.Footer className="mt-3" style={{ textAlign: "center" }}>
                <span>Already have an account?</span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </NavLink>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Signup;
