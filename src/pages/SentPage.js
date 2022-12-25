import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import SentMail from "../components/mailbox/SentMail";
import { toggleActions } from "../store/toggle";

const SentPage = () => {
  const showMailBox = useSelector((state) => state.toggle.sentMailIsVisible);

  const fromEmail = useSelector((state) => state.auth.email);

  const userEmail = fromEmail.replace("@", "");
  const newUserEmail = userEmail.replace(".", "");

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataHandler = async () => {
    dispatch(toggleActions.toggleSentMail());
    setError(null);
    try {
      const response = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/sender${newUserEmail}.json`
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
        Sent Mail
      </Button>
      {showMailBox && (
        <ul>
          {data.map((data) => (
            <SentMail
              key={data.id}
              id={data.id}
              subject={data.subject}
              email={data.email}
            ></SentMail>
          ))}
        </ul>
      )}
    </>
  );
};

export default SentPage;
