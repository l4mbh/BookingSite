import React from "react";
import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Search from "./Search";

const StyledHeader = styled.div`
  width: 100%;
  height: 300px;
  background-color: #003580;
  color: white;
  padding-top: 50px;

  .header-btn {
    margin: 20px 0;
    padding: 10px;
    background-color: #0071c2;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .header-btn:hover {
    background-color: #2096eb;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <h1 className="header-title">A Lifetime of discount? It's genius.</h1>
        <p className="header-text">
          Get rewarded for your travels - unlocking instant savings of 10% or
          more with a free account
        </p>
        <button className="header-btn">Sign in / Register</button>
        <Search></Search>
      </Container>
    </StyledHeader>
  );
};

export default Header;
