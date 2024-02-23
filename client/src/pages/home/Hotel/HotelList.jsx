import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";

import HotelItems from "./HotelItems";
import axios from "axios";

const StyledHotelList = styled.div``;

const HotelList = () => {

  const [hotels, setHotels] = useState(null);

  useEffect(() => {
    axios.get('https://booking-site-server-psi.vercel.app/hotel/top-rate')
    .then(result => result.data)
    .then(data => {
      setHotels(data);
    }).catch(err => {
      console.log(err);
    })
  },[]);

  return (
    <StyledHotelList>
      <Container>
        <h5 className="mt-5">Homes guests love:</h5>
        <Row>
          {hotels && hotels.map((data) => (
            <HotelItems key={data._id} items={data}></HotelItems>
          ))}
        </Row>
      </Container>
    </StyledHotelList>
  );
};

export default HotelList;
