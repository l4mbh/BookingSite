import React from "react";
import styled from "styled-components";

import { Container } from "react-bootstrap";

const StyledSubcribe = styled.div`
  background-color: #003580;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;

  .subcribe-input{
    max-width:400px;
    min-width:400px;
    height: 40px;
    outline: none;
    border:none;
    border-radius: 8px;
    padding: 5px;
  }

`;

const Subcribe = () => {
  return (
    <StyledSubcribe className="container-fluid">
      <Container>
        <h1>Save time, save money !</h1>
        <p>Sign up and we will send the best deals to you!</p>
        <form className="subcribe-form form-inline">
          <input className="subcribe-input mx-2" placeholder="Your email"></input>
          <button className="btn btn-primary" type="submit">
            Subcribe
          </button>
        </form>
      </Container>
    </StyledSubcribe>
  );
};

export default Subcribe;
