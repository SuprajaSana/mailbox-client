import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EmailPage = (props) => {
  const [emailData, setEmailData] = useState();
  const [newData, setNewData] = useState([]);
  const [error, setError] = useState(null);

  const [showMail, setMail] = useState(true);

  const params = useParams();

  const fromEmail = useSelector((state) => state.auth.email);

  const userEmail = fromEmail.replace("@", "");
  const newUserEmail = userEmail.replace(".", "");

  const fetchDataHandler = async () => {
    setError(null);

    try {
      const response = await fetch(
        `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}.json`
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
      setNewData(transformedData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const newEmail = newData.find((mail) => mail.id === params.emailId);
    setEmailData(newEmail);
  }, [newData]);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  function deleteMailHandler(newEmail) {
    const response = fetch(
      `https://mailbox-client-69aa3-default-rtdb.firebaseio.com/receiver${newUserEmail}/${newEmail}.json`,
      {
        method: "DELETE",
      }
    );
    setMail(false);
  } 

  return (
    <>
      {showMail && (
        <Container>{emailData && <div>{emailData.email}</div>}</Container>
      )}
      {showMail && (
        <button
          style={{ marginLeft: "85%" }}
          onClick={(e) => deleteMailHandler(emailData.id, e)}
        >
          DELETE
        </button> 
      )}
    </>
  );
};

export default EmailPage;
