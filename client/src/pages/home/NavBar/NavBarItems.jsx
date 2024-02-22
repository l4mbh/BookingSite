import React from "react";
import { Container } from "react-bootstrap";

import styled from "styled-components";

const StyledNavBarItems = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;

  .navBarItems {
    color: white;
    margin: 0 5px;
    padding: 8px;
    cursor: pointer;
    border: solid 1px transparent;
  }

  .navBarItems > i {
    margin: 0 5px;
  }

  .navBarItems.active {
    border: solid 1px white;
    border-radius: 25px;
  }
`;

const NavBarItems = (props) => {
  const iconClasses = (icon) => `fa ${icon}`;

  const onChangeActiveData = (index) => {
    props.changeActiveItem(index);
  };

  return (
    <Container>
      <StyledNavBarItems>
        {props.data.map((item, index) => {
          return (
            <li key={index}
              className={item.active ? "navBarItems active" : "navBarItems"}
              onClick={() => onChangeActiveData(index)}
            >
              <i className={iconClasses(item.icon)}></i>
              {item.type}
            </li>
          );
        })}
      </StyledNavBarItems>
    </Container>
  );
};

export default NavBarItems;
