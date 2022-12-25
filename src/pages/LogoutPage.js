import { Button } from "react-bootstrap";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };

  return (
    <Button
      style={{ marginRight: "20px", marginTop: "10px", marginLeft: "30px" }}
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default LogOutPage;
