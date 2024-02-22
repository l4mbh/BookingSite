import React from "react";
import styled from "styled-components";

import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const StyledHotelItems = styled.div`
  padding-bottom:30px;
  .hotel-item__img {
    min-height: 300px;
    max-height: 300px;
    background-size:cover;
  }

  .hotel-item__title,
  .hotel-item__price {
    font-weight: bold;
  }

  .hotel-item__price {
    font-size: 14px;
  }

  .hotel-item__point {
    font-size: 14px;
    font-weight: bold;
    background-color: #0071c2;
    color: white;
    padding: 3px;
  }

  .hotel-item__rate{
    font-size: 13px;
  }
`;

const HotelItems = (props) => {
  return (
    <Col>
      <StyledHotelItems>
        <div className="hotel-item">
          <div
            className="hotel-item__img" lazyload
            style={{ backgroundImage: `url(${props.items.photos[0]})` }}
          ></div>
          <div className="hotel-item__body">
            <Link to={`/detail/${props.items._id}`}  className="hotel-item__title">{props.items.name}</Link>
            <p className="hotel-item__city mt-2 mb-1">{props.items.city}</p>
            <p className="hotel-item__price my-1">
              Starting from ${props.items.cheapestPrice}
            </p>
          </div>
        </div>
      </StyledHotelItems>
    </Col>
  );
};

export default HotelItems;
