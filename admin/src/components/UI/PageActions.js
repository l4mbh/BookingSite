import React from "react";
import { styled } from "styled-components";

const StyledPageActions = styled.div`
  width: 100%;
  height: 50px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 6px;
  background-color: #f1f1f1;
`;

const PageActions = ({ children }) => {
  return (
    <StyledPageActions className="shadow">
      <p className="mb-0 text-uppercase text-secondary">Actions :</p>
      {children}
    </StyledPageActions>
  );
};

export default PageActions;
