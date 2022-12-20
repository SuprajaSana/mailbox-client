import { Button } from "react-bootstrap";
import { useCallback, useState } from "react";
import Inbox from "../components/mailbox/Inbox";
import { useDispatch, useSelector } from "react-redux";
import { toggleActions } from "../store/toggle";

let id;

const InboxPage = () => {
  const showInbox = useSelector((state) => state.toggle.inboxIsVisible);
  const count = useSelector((state) => state.toggle.number);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  let response;

  const fetchDataHandler = useCallback( async () => {
    dispatch(toggleActions.toggle());
    setError(null);
    try {
       response = await fetch(
        "https://mailbox-client-69aa3-default-rtdb.firebaseio.com/email.json"
      );

       id=setInterval(() => {
         response = fetch("https://mailbox-client-69aa3-default-rtdb.firebaseio.com/email.json")
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
        });
      }
      setData(transformedData);
    } catch (error) {
      setError(error.message);
    }
  },[]);

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
