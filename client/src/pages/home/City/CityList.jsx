import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";

import CityItems from "./CityItems";

import axios from "axios";

const StyledCityList = styled.div`
  padding-top: 75px;
`;

const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const result = [];

    axios
      .get("http://localhost:5000/hotel/city")
      .then((result) => result.data)
      .then((data) => {
        for (const [city, count] of Object.entries(data)) {
          result.push({
            name: `${city}`,
            subText: `${count} properties`,
            image: `http://localhost:5000/images/${city.replaceAll(' ','_')}.jpg`,
          });
        }
        setCities(result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyledCityList>
      <Container>
        <Row>
          {cities && cities.map((city) => (
            <CityItems
              key={city.name}
              name={city.name}
              subText={city.subText}
              img={city.image}
            ></CityItems>
          ))}
        </Row>
      </Container>
    </StyledCityList>
  );
};

export default CityList;
