import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { Form } from "react-router-dom";

const RoomForm = () => {
  const [hotelList, setHotelList] = useState(null);


  const fetchHotelNames = async () => {
    const hotelNames = await axios.get('https://booking-site-server-psi.vercel.app/admin/hotelNameList');
    if(hotelNames) {
      setHotelList(hotelNames.data);
    }
  }
  useEffect(() => {
    fetchHotelNames();
  }, [])
  return (
    <div>
      <Form method="POST" action="/add-room" className="form my-3 p-3 shadow rounded">
        <Row>
          <Col xs={6}>
            <FormGroup className="mb-3">
              <FormLabel>Title :</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter room title"
                name="roomTitle"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Price :</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter room price"
                name="roomPrice"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Rooms :</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Each room separeate by a comma. (Ex: 101,102,...)"
                name="roomRooms"
                required
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup className="mb-3">
              <FormLabel>Description :</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter room description"
                name="roomDesc"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Max People :</FormLabel>
              <FormControl
                type="number"
                min="1"
                placeholder="Room max people"
                name="roomMaxPeople"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Select hotel :</FormLabel>
              <FormSelect name="hotelId">
                {
                  !hotelList ? <option>Getting hotels infor ... </option> : hotelList.map(hotel => <option key={hotel._id} value={hotel._id}>
                    {`${hotel.name} (${hotel._id})`}
                  </option>)
                }
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Button type="submit" variant="success">
          <FontAwesomeIcon icon={faCheckCircle} className="mx-2" />
          Add new room
        </Button>
      </Form>
    </div>
  );
};

export default RoomForm;
