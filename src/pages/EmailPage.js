import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EmailPage = (props) => {
  const [emailData, setEmailData] = useState();
  const [newData, setNewData] = useState([]);
  const [error, setError] = useState(null);

  const params = useParams();

  const fetchDataHandler = async () => {
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

  return <Container>{emailData && <div>{emailData.email}</div>}</Container>;
};

export default EmailPage;
