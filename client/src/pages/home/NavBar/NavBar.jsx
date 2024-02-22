import { React, useState } from "react";
import styled from "styled-components";

import NavBarItems from "./NavBarItems";
import NavBarHeader from "./NavBarHeader";
import Container from "react-bootstrap/esm/Container";

const navBarData = [
  {
    type: "Stays",
    icon: "fa-bed",
    active: true,
  },
  {
    type: "Flights",
    icon: "fa-plane",
    active: false,
  },
  {
    type: "Car rentals",
    icon: "fa-car",
    active: false,
  },
  {
    type: "Attractions",
    icon: "fa-bed",
    active: false,
  },
  {
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false,
  },
];

const StyledNavBar = styled.div`
  max-width: 100%;
  min-width: 100%;
  height: auto;
  background-color: #003580;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const NavBar = () => {
  const [defaultNavBarData, setNavBarData] = useState(navBarData);

  const onChangeActiveItemHandler = (itemIndex) => {
    setNavBarData((prevNavBarData) => {
      prevNavBarData.forEach((data) => {
        data.active = false;
      });
      prevNavBarData[itemIndex].active = true;

      return [...prevNavBarData];
    });
  };

  return (
    <StyledNavBar>
      <Container>
        <NavBarHeader></NavBarHeader>
      </Container>

      <NavBarItems
        data={defaultNavBarData}
        changeActiveItem={onChangeActiveItemHandler}
      ></NavBarItems>
    </StyledNavBar>
  );
};

export default NavBar;
