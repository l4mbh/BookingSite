import { React, useState } from "react";

import styled from "styled-components";

import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../../store/bookingSlice";
import { searchActions } from "../../../store/searchSlice";
import { useSubmit } from "react-router-dom";

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 70px;

  .search-form {
    position: absolute;
    bottom: -15px;
    margin-left: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 60px;
    padding: 5px;
    background-color: white;
    border: solid 3px orange;
    border-radius: 10px;
  }

  .search-date {
    position: relative;
  }

  .date-pick {
    position: absolute;
    z-index: 99999;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  .form-group {
    width: 30%;
  }

  .form-control,
  .form-control:focus {
    border: none;
    outline: none;
    width: 100%;
    height: 35px;
    font-family: Arial, FontAwesome;
    font-size: 18px;
  }

  .form-btn {
    padding: 10px;
    border: none;
    background-color: #0071c2;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .form-btn:hover {
    background-color: #2096eb;
  }
  .special-wrapper {
    position: relative;
  }
  .special-select {
    position: absolute;
    margin-top: 5px;
    display: flex;
    max-width: 100%;
    z-index: 99;
    border: 2px solid orange;
    border-radius: 10px;
    overflow: hidden;
  }
  .special-select > input {
    max-width: 33.33%;
    outline: none;
    border: none;
    text-align: center;
  }
`;

const Search = () => {
  const [showDateRange, setShowDateRange] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  const [inputLocation, setInputLocation] = useState("");
  const [specialToggle, setSpecialToggle] = useState(false);

  const startDateData = useSelector((state) => state.booking.startDate);
  const endDateData = useSelector((state) => state.booking.endDate);

  const dispatch = useDispatch();
  const submit = useSubmit();

  const selectionRange = {
    startDate: new Date(startDateData),
    endDate: new Date(endDateData),
    key: "selection",
  };

  const handleDatePick = (ranges) => {
    dispatch(
      bookingActions.setDateRange({
        startDate: new Date(ranges.selection.startDate).toISOString(),
        endDate: new Date(ranges.selection.endDate).toISOString(),
      })
    );
    changeShowDateRange();
  };

  const changeShowDateRange = () => {
    setShowDateRange((prevState) => {
      return !prevState;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputLocation === "") {
      return alert("Please let us know your destination!");
    } else if (
      new Date(endDateData).getDate() - new Date(startDateData).getDate() ===
      0
    ) {
      return alert("Please stay at least one night on your trip!");
    } else {
      dispatch(
        searchActions.getSearchInfo({
          location: inputLocation,
          adult: adult,
          children: children,
          rooms: room,
        })
      );
      submit(
        {
          startDate: startDateData,
          endDate: endDateData,
          location: inputLocation,
          people: +adult + +children,
          rooms: room,
        },
        {
          method: "POST",
          action: "/search",
        }
      );
    }
  };

  const onAdultChange = (e) => {
    setAdult(e.target.value);
  };

  const onChildrenChange = (e) => {
    setChildren(e.target.value);
  };

  const onRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const onLocationChange = (e) => {
    setInputLocation(e.target.value);
  };

  const onSpecialToggle = () => {
    setSpecialToggle((prevState) => !prevState);
  };
  return (
    <StyledSearch>
      <form className="search-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="&#xf236; Where are you going?"
            value={inputLocation}
            onChange={onLocationChange}
          ></input>
        </div>
        <div className="form-group search-date">
          <input
            onClick={changeShowDateRange}
            className="form-control"
            value={`${String.fromCodePoint(
              0xf073
            )} ${new Date(startDateData).toLocaleDateString(
              "vi-VN"
            )} - ${new Date(endDateData).toLocaleDateString("vi-VN")}`}
          ></input>
          {showDateRange && (
            <DateRange
              className="date-pick date"
              editableDateInputs={true}
              moveRangeOnFirstSelection={true}
              minDate={new Date()}
              onChange={handleDatePick}
              ranges={[selectionRange]}
            />
          )}
        </div>
        <div className="form-group special-wrapper">
          <input
            placeholder={`${adult} Adult : ${children} Children : ${room} Room`}
            className="form-control"
            onClick={onSpecialToggle}
            readOnly
          ></input>
          {specialToggle && (
            <div className="special-select">
              <input
                className="special-select-adult"
                placeholder="Adult"
                value={adult}
                onChange={onAdultChange}
              />
              <input
                className="special-select-children"
                placeholder="Children"
                value={children}
                onChange={onChildrenChange}
              />
              <input
                className="special-select-room"
                placeholder="Room"
                value={room}
                onChange={onRoomChange}
              />
            </div>
          )}
        </div>
        <button type="submit" className="form-btn">
          Search
        </button>
      </form>
    </StyledSearch>
  );
};

export default Search;
