import React from "react";
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'

const HotelForm = () => {
  return (
    <div>
      <Form className="shadow rounded p-3 my-3" action="/add-hotel" method="POST">
        <Row>
          <Col xs={6}>
            <FormGroup className="mb-3">
              <FormLabel>Name :</FormLabel>
              <FormControl placeholder="Enter hotel name" name="hotelName" required />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>City :</FormLabel>
              <FormSelect name="hotelCity">
                <option value="Ha Noi">Ha Noi</option>
                <option value="Ho Chi Minh">TP.HCM</option>
                <option value="Da Nang">Da Nang</option>
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Distance from the center :</FormLabel>
              <FormControl
                placeholder="Enter from the hotel to center"
                name="hotelDistance"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Description :</FormLabel>
              <FormControl placeholder="Hotel description" name="hotelDesc" required/>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Hotel's images :</FormLabel>
              <FormControl
                placeholder="Each link separate by a comma"
                as="textarea"
                name="hotelImages"
                required
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup className="mb-3">
              <FormLabel>Type :</FormLabel>
              <FormSelect name="hotelType">
                <option value="hotel">Hotel</option>
                <option value="apartment">Apartment</option>
                <option value="resort">Resort</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Address :</FormLabel>
              <FormControl placeholder="Enter hotel address" name="hotelAddress" required/>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Title :</FormLabel>
              <FormControl
                placeholder="Enter title"
                name="hotelTitle"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Price :</FormLabel>
              <FormControl title="Hotel cheapest price will auto calculate when rooms is added." disabled placeholder="Hotel cheapeast price" name="hotelPrice" required/>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Featured :</FormLabel>
              <FormSelect name="hotelFeatured" className="w-25">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>
        <p className="text-danger bg-warning rounded p-1">
          *Please go to <a href="/add-room">add new room</a> to add rooms to
          this hotel later.
        </p>
        <hr />
        <Button type="submit" variant="success">
        <FontAwesomeIcon className="mx-1" icon={faCheckCircle}/>
          Add hotel
        </Button>
      </Form>
    </div>
  );
};

export default HotelForm;
