import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleActions } from "../store/toggle";

const EmailPage = (props) => {
    const params = useParams();
    
    const [emailData,setEmailData]=useState([])

    const data = useSelector((state) => state.toggle.emails);

    setEmailData(data)
  
  const dispatch=useDispatch()

    const [newData, setNewData] = useState([]);
    const [error, setError] = useState(null);
  
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
        dispatch(toggleActions.storeEmail(transformedData))
      } catch (error) {
        setError(error.message);
      }
    };

    useEffect(() => {
        fetchDataHandler();
      }, [fetchDataHandler]);  

  const newEmail = emailData.find((mail) => mail.id === params.emailId);

  //console.log(newEmail);

 // console.log(1);
  return (
    <Container>
      <div>{newEmail.email}</div>
    </Container>
  );
};

export default EmailPage;
