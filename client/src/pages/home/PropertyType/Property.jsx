import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Container, Row } from "react-bootstrap";
import PropertyItems from "./PropertyItems";

import axios from "axios";

const StyledProperty = styled.div`
  padding-top: 75px;
`;

const Property = () => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hotel/type")
      .then((result) => result.data)
      .then((data) => {
        const propertyData = [];
        let imgNum = 1;
        Object.entries(data).forEach(([property, count]) => {
          propertyData.push({
            name: property.charAt(0).toUpperCase() + property.slice(1) + 's',
            counts: count,
            image: `/images/type_${imgNum}.jpg`,
          });
          imgNum += 1;
        });
        setProperties(propertyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <StyledProperty>
      <Container>
        <h5 className="mb-3">Browse by property type :</h5>
        <Row>
          {properties && properties.map((property) => (
            <PropertyItems item={property}></PropertyItems>
          ))}
        </Row>
      </Container>
    </StyledProperty>
  );
};

export default Property;
