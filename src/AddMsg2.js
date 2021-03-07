import { useState, useEffect } from "react";
import axios from "axios";

//bootstrap
import {
  Container,
  Modal,
  ToggleButton,
} from "react-bootstrap";

import { Card, ButtonGroup, Button } from "react-bootstrap/";

require("dotenv").config();

const sgMail = require("@sendgrid/mail");

export default function AddMsg2(props) {
  const [Intrests, setIntrests] = useState([]);

  const [radioValue, setRadioValue] = useState("");

  const [userData, setUserData] = useState(props.data);

  //-----------------

  //-----------------
  useEffect(async () => {
    const result = await axios("http://127.0.0.1:8000/api/intrests");
    setIntrests(result.data);
    setRadioValue(Intrests[0]);
  }, []);

  //--------------//-----------
  const submitAll = () => {
    let e = { ...props.userInfo };
    e["intrest"] = radioValue;
    e["to_name"] = e["email"];
    props.setUserData(e);
    console.log(e);

    const { name, email, offer, mobile, intrest } = e;

    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: "anas.qu.j@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: `<p>
        Hello ${name},<br/>
        You were interested in ${offer}  and<br/>
        you wanted it during  ${intrest} and  <br/>
        you offered  it  on phone NO.  ${mobile}   <br/>
        Best wishes, <br/>
        OCA team
        .</p>`,
    };
    console.log(msg);

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    props.onHide();

    //--------------//-----------
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="Msg">
          <Card.Body>
            <Card.Title className="text-center">متى ترغب برفع الطلب</Card.Title>
            <Container className="d-flex justify-content-center ">
              <ButtonGroup toggle>
                {Intrests.map((item, index) => (
                  <ToggleButton
                    key={index}
                    className="m-3 p-3"
                    type="radio"
                    variant="primary"
                    name="radio"
                    value={item.intrest_name}
                    checked={radioValue === item.intrest_name}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {item.intrest_name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Container>
          </Card.Body>
          <Card.Footer>
            {/* <Button class="text-center" variant="success"  className='m-3' onClick={submitAll} block>
            تاكيد الطلب 
          </Button> */}
          </Card.Footer>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button
            class="text-center"
            variant="secondary"
            className="m-3"
            onClick={submitAll}
            block
          >
            اغلاق
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}
