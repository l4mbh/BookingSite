import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubmit } from "react-router-dom";
import styled from "styled-components";
import { searchActions } from "../../store/searchSlice";
import { bookingActions } from "../../store/bookingSlice";

const StyledSearchPopup = styled.div`
  background-color: orange;
  border-radius: 10px;
  padding: 10px;

  .search-title {
    font-weight: bold;
  }

  .form-labels {
    font-size: 14px;
  }

  .form-input {
    width: 100%;
    height: 35px;
  }

  .options-list {
    list-style-type: none;
    padding-left: 10px;
  }

  .options-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
  }

  .options-text {
    font-size: 12px;
  }

  .options-input {
    max-height: 30px;
    max-width: 70px;
  }

  .search-btn {
    width: 100%;
    height: 35px;
    border: none;
    outline: none;
    color: white;
    background-color: #0071c2;
    margin-top: 20px;
  }
`;

const SearchPopup = () => {
  const checkInDate = useSelector((state) => state.booking.startDate);
  const checkOutDate = useSelector((state) => state.booking.endDate);

  const location = useSelector((state) => state.search.location);
  const adult = useSelector((state) => state.search.adult);
  const children = useSelector((state) => state.search.children);
  const rooms = useSelector((state) => state.search.rooms);

  const submit = useSubmit();
  const dispatch = useDispatch();

  const onLocationChange = (e) => {
    dispatch(searchActions.setLocation(e.target.value));
  };

  const onAdultChange = (e) => {
    dispatch(searchActions.setAdult(e.target.value));
  };

  const onChildrenChange = (e) => {
    dispatch(searchActions.setChildren(e.target.value));
  };

  const onRoomsChange = (e) => {
    dispatch(searchActions.setRooms(e.target.value));
  };

  const onStartDateChange = (e) => {
    dispatch(bookingActions.setStartDate(e.target.value));
  };

  const onEndDateChange = (e) => {
    dispatch(bookingActions.setEndDate(e.target.value));
  };

  const onSearchAction = (e) => {
    e.preventDefault();
    if (location === "") {
      return alert("Please let us know your destination!");
    } else if (
      new Date(checkInDate).getDate() - new Date(checkOutDate).getDate() ===
      0
    ) {
      return alert("Please stay at least one night on your trip!");
    } else {
      submit(
        {
          startDate: checkInDate,
          endDate: checkOutDate,
          location: location,
          people: Number(adult) + Number(children),
          rooms: rooms,
        },
        {
          method: "POST",
          action: "/search",
        }
      );
    }
  };

  return (
    <StyledSearchPopup>
      <h2 className="search-title">Search</h2>
      <form className="search-form">
        <div className="search-destination my-3">
          <p className="form-labels my-1">Destination</p>
          <input
            className="destination-input form-input"
            value={location}
            type="text"
            placeholder="Your destination"
            onChange={onLocationChange}
          />
        </div>
        <div className="search-date my-3">
          <p className="form-labels my-1">Check-in Date (mm/dd/yyyy)</p>
          <input
            className="date-input form-input"
            type="date"
            min="01-01-1920"
            max="01-01-2120"
            value={new Date(checkInDate).toISOString().substring(0, 10)}
            onChange={onStartDateChange}
          />
        </div>
        <div className="search-date my-3">
          <p className="form-labels my-1">Check-out Date (mm/dd/yyyy)</p>
          <input
            className="date-input form-input"
            type="date"
            min="01-01-1920"
            max="01-01-2120"
            value={new Date(checkOutDate).toISOString().substring(0, 10)}
            onChange={onEndDateChange}
          />
        </div>
        <div className="search-options my3">
          <p className="form-labels">Options</p>
          <ul className="options-list">
            <li className="options-items">
              <label className="options-text">Min price per night</label>
              <input type="text" className="options-input min-price-input" />
            </li>
            <li className="options-items">
              <label className="options-text">Max price per night</label>
              <input
                type="text"
                className="options-input max-price-input"
              ></input>
            </li>
            <li className="options-items">
              <label className="options-text">Adult</label>
              <input
                type="text"
                className="options-input adult-input"
                value={adult}
                onChange={onAdultChange}
              />
            </li>
            <li className="options-items">
              <label className="options-text">Children</label>
              <input
                type="text"
                className="options-input children-input"
                value={children}
                onChange={onChildrenChange}
              />
            </li>
            <li className="options-items">
              <label className="options-text">Room</label>
              <input
                type="text"
                className="options-input room-input"
                value={rooms}
                onChange={onRoomsChange}
              />
            </li>
          </ul>
        </div>
        <button type="submit" className="search-btn" onClick={onSearchAction}>
          Search
        </button>
      </form>
    </StyledSearchPopup>
  );
};

export default SearchPopup;
