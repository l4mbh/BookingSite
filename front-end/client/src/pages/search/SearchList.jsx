import React from "react";
import styled from "styled-components";

import { Container } from "react-bootstrap";
import SearchItems from "./SearchItems";

const StyledSearchList = styled.ul`
  list-style-type: none;
  padding-left: 0;

`;


function SearchList({hotelData}) {
  return <Container>
    <StyledSearchList>
    {
      (!hotelData || hotelData.length === 0 ) && <p>No hotels meet your expectation ! So sorry !</p>
    }
    {
      hotelData && hotelData.length > 0 && hotelData.map(data => <li className="search-items">
        <SearchItems item={data}>
        </SearchItems>
      </li>)
    }
    </StyledSearchList>
  </Container>;
}

export default SearchList;
