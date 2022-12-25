import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomePage";
import ComposeMail from "./components/mailbox/ComposeMail";
import InboxPage from "./components/mailbox/InboxMail";
import EmailPage from "./pages/EmailPageInbox";
import SentMail from "./components/mailbox/Sent";
import EmailPageSent from "./pages/EmailPageSent";
import { toggleActions } from "./store/toggle";

function App() {
  const isLogin = useSelector((state) => state.auth.email);
  const initCount = useSelector((state) => state.toggle.number);

  const fromEmail = useSelector((state) => state.auth.email);

  let newFromUserEmail;

  if (fromEmail) {
    const fromuserEmail = fromEmail.replace("@", "");
    newFromUserEmail = fromuserEmail.replace(".", "");
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCountData = async () => {
      const response = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiverCount${newFromUserEmail}.json`
      );

      const data = await response.json();
      dispatch(toggleActions.replaceCount(data));

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };
    fetchCountData().catch((error) => {
      alert(error.message);
    });
  }, [newFromUserEmail]);

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
        <Route path="/sent" exact>
          {isLogin && <SentMail></SentMail>}
          {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
        <Route path="/sent/:sentemailId">
          {isLogin && <EmailPageSent></EmailPageSent>}
          {!isLogin && <Redirect to="/login"></Redirect>}
        </Route>
      </main>
    </>
  );
}

export default App;
