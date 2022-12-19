import { Button } from "react-bootstrap";
import { useState } from "react";
import Inbox from "../components/mailbox/Inbox";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../store/toggle";
import { NavLink } from "react-router-dom";

const InboxPage = () => {
  const [showInbox, setInbox] = useState(false);
  // const showInbox = useSelector((state) => state.toggle.inboxIsVisible);
  const count = useSelector((state) => state.toggle.number);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataHandler = async () => {
    setInbox(true);
    //dispatch(toggleActions.toggle());
    setError(null);
    try {
      const response = await fetch(
        "https://mailbox-client-69aa3-default-rtdb.firebaseio.com/email.json"
      );

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
        });
      }
      setData(transformedData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={fetchDataHandler}
        style={{ marginTop: "10px", marginLeft: "30px" }}
      >
        Inbox
        <span style={{ marginLeft: "30px", color: "white" }}>
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
            ></Inbox>
          ))}
        </ul>
      )}
    </>
  );
};

export default InboxPage;
