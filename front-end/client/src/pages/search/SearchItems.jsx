import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSearchItems = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 200px;
  margin: 0 0 20px 0;
  border: solid 1px darkgray;
  border-radius: 6px;
  padding: 8px;

  .search-items-img {
    height: 250px;
    min-width: 250px;
    background-size: cover;
    margin-right: 20px;
  }

  .search-items-name{
    text-decoration: none;
    font-size: 28px;
    font-weight: bold;
  }

  .saerch-items-tag{
    background-color: green;
    max-width: fit-content;
    padding: 3px;
    border-radius: 8px;
    font-size:14px;
    color: white;
  }

  .search-items-desciption {
    font-weight: lighter;
    word-wrap: break-word;
  }

  .search-items-des,
  .search-items-actions {
    display: flex;
    justify-content: space-between;
  }

  .search-items-actions {
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
  }

  .search-items-text{
    font-weight: bold;
  }

  .search-items-text,
  .search-items-subtext {
    color: green;
  }

  .search-items-type {
    text-transform: capitalize;
    font-weight: bold;
  }

  .search-price-number {
    font-size: 24px
  }
  
  .search-items-rate-text{
    float:left;
    font-weight: bold;
  }

  .search-items-rate-point {
    background-color : #003580;
    color:white;
    font-weight: bold;
    padding: 5px;
  }
`;

function SearchItems(props) {
  return (
    <StyledSearchItems>
      <div className="search-items-des">
        <div
          className="search-items-img"
          style={{ backgroundImage: `url(${props.item.photos && props.item.photos[0]})` }}
        ></div>
        <div className="seatch-items-info">
          <Link to={`/detail/${props.item._id}`} className="search-items-name">{props.item.name}</Link>
          <p className="search-items-distance">{props.item.distance} from center</p>
          <p className="search-items-desciption">{props.item.desc}</p>
          <p className="search-items-type">{props.item.type}</p>

          {props.item.featured && (
            <div className="search-items-cancel">
              <div className="search-items-text">Free cancel</div>
              <div className="search-items-subtext">
                You can cancel later, so lock in this great price today!
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="search-items-actions">
        <div className="search-items-rating">
          <span className="search-items-rate-text">{props.item.rate_text}</span>
          <span className="search-items-rate-point">{props.item.rating}</span>
        </div>
        <div className="search-items-price">
          <p className="search-price-number">${props.item.cheapestPrice}</p>
          <p className="search-price-subtext text-secondary">
            included taxes and fee
          </p>
          <Link to={`/detail/${props.item._id}`} className="btn btn-lg btn-primary search-items-button">
            See availability
          </Link>
        </div>
      </div>
    </StyledSearchItems>
  );
}

export default SearchItems;
