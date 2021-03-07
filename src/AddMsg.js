import { useState, useEffect } from "react";
import axios from "axios";

//bootstrap
import {
  Container,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Nav,
} from "react-bootstrap";

import { Form, Card, ButtonGroup, Button } from "react-bootstrap/";

export default function AddMsg(props) {
//   const [userInfo, setUserinfo] = useState();
  const [offers, setOffers] = useState([]);

  const [radioValue, setRadioValue] = useState('');

  const [checked, setChecked] = useState(false);

  

  //-----------------
    useEffect(async () => {
      const result = await axios(
        'http://127.0.0.1:8000/api/offers',
      );
      setOffers(result.data);
      setRadioValue(offers[0]);
      console.log(offers);
    },[]);

  //--------------//-------------
  const close = () => {
    props.onHide();
  };
  
  //--------submit to next Modal
  
  const next = () => {
        let a = { ...props.userInfo };
        a['offer']=radioValue;
        props.setUserData(a);
        console.log(radioValue);
         
    props.next();
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
            <Card.Title className="text-center">
              : اختار عرض من العروض التالية
            </Card.Title>
            <Container className="d-flex justify-content-center ">

            <ButtonGroup toggle>
              {offers.map((item,index) => (
                  <ToggleButton
                    key={index}
                    className='m-3 p-3'
                    type="radio"
                    variant="primary"
                    name="radio"
                    value={item.offer_name}
                    checked={radioValue === item.offer_name}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                 {item.offer_name}
                </ToggleButton>
              ))}
               </ButtonGroup>


            </Container>
          </Card.Body>
          <Card.Footer>
            <Button
              class="text-center"
              variant="success"
              className="m-3"
              onClick={next}
              block
            >
              التالي
            </Button>
          </Card.Footer>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button
            class="text-center"
            variant="secondary"
            className="m-3"
            onClick={close}
            block
          >
            اغلاق
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}
