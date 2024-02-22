import React from "react";
import styled from "styled-components";

const StyledSection = styled.div`
  max-width: 100%;
  padding-top: 50px;

  .section-title {
    
  }
`;

const Section = (props) => {
  return <StyledSection>
  <h5 className="section-title">{props.title}</h5>
  {props.children}
  </StyledSection>;
};

export default Section;
