import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import footerData from "../../../data/footer.json";

const StyledFooter = styled.div`
  padding: 30px 0;

  .footer-list {
    list-style-type: none;
    padding-left: 0;
  }
  .footer-link,
  .footer-link:active,
  .footer-link:visited {
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <hr></hr>
      <Container>
        <Row>
          {footerData.map((data) => (
            <Col>
              <ul className="footer-list">
                {data.col_values.map((value, index) => (
                  <li className="footer-items my-2">
                    <a key={index} href="#" className="footer-link">
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
