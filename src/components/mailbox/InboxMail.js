import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Inbox from "./Inbox";
import { toggleActions } from "../../store/toggle";

let id;

const InboxPage = (props) => {
  const showInbox = useSelector((state) => state.toggle.inboxIsVisible);

  const fromEmail = useSelector((state) => state.auth.email);
  const count = useSelector((state) => state.toggle.unreadNumber);

  const [emailData, setEmailData] = useState();

  const userEmail = fromEmail.replace("@", "");
  const newUserEmail = userEmail.replace(".", "");

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  let response;

  const fetchDataHandler = useCallback(async () => {
    dispatch(toggleActions.toggle());
    setError(null);
    try {
      response = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}.json`
      );

      id = setInterval(() => {
        response = fetch(
          `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}.json`
        );
      }, 2000);

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }

      const data = await response.json();

      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          subject: data[key].subject,
          email: data[key].email,
          seenStatus: data[key].emailStatus,
        });
      }
      setData(transformedData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchEmailCountHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiverCount${newUserEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }

      const data = await response.json();

      setEmailData(data);
      dispatch(toggleActions.readEmails(data));
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchEmailCountHandler();
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={fetchDataHandler}
        style={{ marginTop: "10px", marginLeft: "30px" }}
      >
        Inbox
        <span style={{ marginLeft: "30px", color: "white" }} count={emailData}>
          UNREAD {count}
        </span>
      </Button>
      {showInbox && (
        <ul>
          {data.map((data) => (
            <Inbox
              key={data.id}
              id={data.id}
              subject={data.subject}
              email={data.email}
              seenStatus={data.seenStatus}
            ></Inbox>
          ))}
        </ul>
      )}
    </>
  );
};

export default InboxPage;
