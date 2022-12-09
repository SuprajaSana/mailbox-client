import { useRef, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/auth";
import { Alert, Button, Card } from "react-bootstrap";
import { Form, Container } from "react-bootstrap";

const Login = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmpasswordRef = useRef("");

  const [isLogin, setIsLogin] = useState(true);
  const [isSendingRequest, setSendingRequest] = useState(false);
  const [Error, setError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    const ConfirmpasswordValue = confirmpasswordRef.current.value;

    setSendingRequest(true);

    if (passwordValue != ConfirmpasswordValue) {
      setError(true);
      alert("Password does not match");
      setSendingRequest(false);
    } else {
      setSendingRequest(true);
      if (isLogin) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1tWZ03i-QTCu57lXyzLqXeBl0tXlweeY",
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
        )
          .then((response) => {
            setSendingRequest(false);
            if (response.ok) {
              return response.json();
            } else {
              response.json().then((data) => {
                let errorMessage = "Authentication Failed!";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                alert(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log(data);
            console.log(data.email);
            dispatch(authActions.loginToken(data.idToken));
            dispatch(authActions.login(data.email));
            history.replace("/welcome");
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      }
    }
  };
  return (
    <>
      <Container className="mt-5" style={{ width: "550px" }}>
        <Card className="shadow-lg" style={{ marginTop: "150px" }}>
          <Card.Header style={{ backgroundColor: "grey" }}>
            <h4>Login</h4>
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
                  Login
                </Button>
              )}
              {isSendingRequest && (
                <Alert style={{ textAlign: "center" }}>Sending Request</Alert>
              )}
              <Card.Footer className="mt-3" style={{ textAlign: "center" }}>
                <span>Don't have an account?</span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/"
                >
                  SignUp
                </NavLink>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
