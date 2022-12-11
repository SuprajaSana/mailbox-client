import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomePage";
import ComposeMail from "./components/mailbox/ComposeMail";

function App() {

  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
       <main>
      <Route path="/" exact>
        <SignUp></SignUp>
      </Route>
      <Route path="/login">
        <LogIn></LogIn>
      </Route>
      <Route path="/welcome">
        {isLogin && <Welcome></Welcome>}
        {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
        <Route path="/composemail">
        {isLogin && <ComposeMail></ComposeMail>}
        {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
    </main>
    </>
  );
}

export default App;
