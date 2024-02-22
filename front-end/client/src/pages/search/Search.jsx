import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";
import NavBar from "../home/NavBar/NavBar";
import Footer from "../home/Footer/Footer";
import axios from "axios";
import { useActionData } from "react-router-dom";

const StyledSearch = styled.div`
`;

const Search = () => {

  const actionData = useActionData();

  console.log(actionData);

  return (
    <StyledSearch>
      <NavBar></NavBar>
      <Container className="py-3">
        <Row>
          <Col md={3}>
            <SearchPopup></SearchPopup>
          </Col>
          <Col md={9}>
            <SearchList hotelData={actionData}></SearchList>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </StyledSearch>
  );
};

export default Search;

export const action = async ({request}) => {
  const formData = await request.formData();

  const location = formData.get('location');
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');
  const people = formData.get('people');
  const rooms = formData.get('rooms');

  const searchData = {
    location,
    startDate,
    endDate,
    people,
    rooms
  }

  const data = await axios.post('http://localhost:5000/hotel/search', searchData)
  .then(response => response.data)
  .then(data => {
    return data;
  })
  .catch(err => {
    if(err.response) {
      alert(err.response.data.message)
    } else {
      alert(err.message);
    }
  });

  return data || null;
  
}
