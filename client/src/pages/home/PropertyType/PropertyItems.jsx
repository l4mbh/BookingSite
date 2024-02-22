import React from "react";
import styled from "styled-components";

import { Col } from "react-bootstrap";

const StyledPropertyItems = styled.div`
  .property-header {
    min-height: 200px;
    max-height: 200px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

`;

const PropertyItems = (props) => {
  return (
    <Col>
      <StyledPropertyItems>
        <div className="property-header" style={{backgroundImage: `url(${props.item.image})`}}>
        </div>
        <div className="property-content">
          <h4 className="property-name text-secondary font-weight-bold">{props.item.name}</h4>
          <h6 className="property-text font-weight-light">{props.item.counts} properties</h6>
        </div>
      </StyledPropertyItems>
    </Col>
  );
};

export default PropertyItems;
