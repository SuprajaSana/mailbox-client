import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const ComposeMailPage = () => {
  return (
    <NavLink to="/composemail">
      <Button
        style={{ marginRight: "20px", marginTop: "10px", marginLeft: "30px" }}
      >
        Compose Mail
      </Button>
    </NavLink>
  );
};

export default ComposeMailPage;
