import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ComposeMail from "../components/mailbox/ComposeMail";
import ComposeMailPage from "./ComposeMailPage";

const Welcome = () => {
  return (
    <div>
          <h1>Welcome to your mailbox</h1>
          <NavLink to='/composemail'>
              <Button>Compose Mail</Button>
              </NavLink>
    </div>
  );
};

export default Welcome;
