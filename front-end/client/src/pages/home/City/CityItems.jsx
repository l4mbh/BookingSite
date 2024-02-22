import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";

const StyledCityItems = styled.div`
  height: 300px;
  background-size: cover;
  position: relative;
  padding: 15px;
  border-radius: 10px;

  .city-content{
    position: absolute;
    left: 15px;
    bottom: 0;
    color:white;
  }
`;

const CityItems = (props) => {
  return (
    <Col>
      <StyledCityItems style={{ backgroundImage: `url(${props.img})` }}>
        <div className="city-content">
          <h1 className="city-name">{props.name}</h1>
          <h3 className="city-text">{props.subText}</h3>
        </div>
      </StyledCityItems>
    </Col>
  );
};

export default CityItems;
