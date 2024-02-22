import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import LeftPanel from "../components/UI/LeftPanel";
import { styled } from "styled-components";

const StyledRootPage = styled.div`
  .rootpage {
    overflow: hidden;
    max-height: 100vh;
  }

`;

const RootPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <StyledRootPage className="rootpage">
      <Container fluid>
        <Row className="gx-0">
          <Col xs={2} >
            <LeftPanel/>
          </Col>
          <Col xs={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </StyledRootPage>
  );
};

export const loader = () => {
  return null;
};

export default RootPage;
