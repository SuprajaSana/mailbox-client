import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomePage";
import ComposeMail from "./components/mailbox/ComposeMail";
import InboxPage from "./pages/InboxPage";
import EmailPage from "./pages/EmailPage";

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
        <Route path="/inbox" exact>
          {isLogin && <InboxPage></InboxPage>}
          {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
        <Route path="/inbox/:emailId">
          {isLogin && <EmailPage></EmailPage>}
          {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
      </main>
    </>
  );
}

export default App;
