import { Button } from "react-bootstrap";
import { useState } from "react";
import Inbox from "../components/mailbox/Inbox";

const InboxPage = () => {
  const [showInbox, setInbox] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataHandler = async () => {
    setInbox(true);
    setError(null);
    console.log(1);
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
        onClick={fetchDataHandler}
        style={{ marginRight: "20px", marginTop: "10px", marginLeft: "30px" }}
      >
        Inbox
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
