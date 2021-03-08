import {useState, useEffect} from "react";

// bootstrap
import {Container, Modal, ToggleButton} from "react-bootstrap";

import {Card, ButtonGroup, Button} from "react-bootstrap/";

import * as emailjs from "emailjs-com";
require("dotenv").config();

export default function AddMsg2(props) {
   const [Intrests, setIntrests] = useState([]);

   const [radioValue, setRadioValue] = useState("");

   const [userData, setUserData] = useState(props.data);

   // -----------------

   // -----------------
   useEffect(async () => {
      const result = await axios("http://127.0.0.1:8000/api/intrests");
      setIntrests(result.data);
      setRadioValue(Intrests[0]);
   }, []);

   // --------------//-----------
   const submitAll = () => {

      let e = {
         ... props.userInfo
      };
      e["intrest"] = radioValue;
      e["to_name"] = e["email"];
      props.setUserData(e);
      console.log(e);

      const {
         name,
         email,
         offer,
         mobile,
         intrest
      } = e;

      var service_id = "service_qq4mvir";
      var template_id = 'template_bo5t5zb';

      var template_params = {
         to_name:    name ,
         from_name:  email,
         mobile:     mobile,
         offer:      offer,
         intrest:    intrest,
      };
      emailjs
         .send(service_id, template_id, template_params, process.env.REACT_APP_SENDGRID_API_KEY)
         .then(
            function (response) {
               alert("SUCCESS!");
            },
            function (err) {
               console.log("FAILED...", err);
            }
         );
      props.onHide();

      // --------------//-----------
   };

   return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
         <Modal.Body>
            <div className="Msg">
               <Card.Body>
                  <Card.Title className="text-center">متى ترغب برفع الطلب</Card.Title>
                  <Container className="d-flex justify-content-center ">
                     <ButtonGroup toggle>
                        {
                        Intrests.map((item, index) => (
                           <ToggleButton key={index}
                              className="m-3 p-3"
                              type="radio"
                              variant="primary"
                              name="radio"
                              value={
                                 item.intrest_name
                              }
                              checked={
                                 radioValue === item.intrest_name
                              }
                              onChange={
                                 (e) => setRadioValue(e.currentTarget.value)
                           }>
                              {
                              item.intrest_name
                           } </ToggleButton>
                        ))
                     } </ButtonGroup>
                  </Container>
               </Card.Body>
               <Card.Footer> {/* <Button class="text-center" variant="success"  className='m-3' onClick={submitAll} block>
            تاكيد الطلب 
          </Button> */} </Card.Footer>
            </div>
         </Modal.Body>
         <Modal.Footer>
            <ButtonGroup>
               <Button class="text-center" variant="secondary" className="m-3"
                  onClick={submitAll}
                  block>
                  اغلاق
               </Button>
            </ButtonGroup>
         </Modal.Footer>
      </Modal>
   );
}
