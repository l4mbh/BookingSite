import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import styled from "styled-components";

const StyledRoomSelectList = styled.div`
  .room-select {
    &_title {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 0;
    }
    &_desc {
      font-weight: lighter;
      margin-bottom: 0;
    }
    &_maxPeople {
      margin-bottom: 0;
      & > span {
        font-weight: bold;
      }
    }
    &_price {
      font-weight: bold;
    }
    &_roomNum-wrapper {
      display: flex;
      height: 100%;
      gap: 5px;
      align-items: center;
      justify-content: center;
    }
    &_room-group {
      display: flex;
      flex-direction: column-reverse;
    }
    &_room-num {
      color: gray;
    }
  }
`;

const RoomSelectList = (props) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomsPrice, setRoomsPrice] = useState(0);

  const roomsData = props.roomsData;
  const onSelectRoom = props.onSelectRoom;

  const startDate= useSelector(state => state.booking.startDate);
  const endDate= useSelector(state => state.booking.endDate);
  const totalNightsStay = (new Date(endDate).getDate() - new Date(startDate).getDate());

  const getRoomDataChange = (chkboxId, roomPrice) => {
    const data = document.querySelector("#" + chkboxId);
    const selected = [...selectedRooms];
    let totalPrice = roomsPrice;
    if(totalNightsStay && totalNightsStay >= 1) {
      if (data.checked && !selected.includes(data.value)) {
        props.onSelectRoom(roomsPrice);
        selected.push(data.value);
        totalPrice += roomPrice*totalNightsStay;
        setRoomsPrice(totalPrice);
      } else {
        if (selectedRooms.includes(data.value)) {
          props.onSelectRoom(roomsPrice);
          const selectedIndex = selected.indexOf(data.value);
          selected.splice(selectedIndex, 1);
          totalPrice -= roomPrice*totalNightsStay;
          setRoomsPrice(totalPrice);
        }
      }
      onSelectRoom({totalPrice, selected});
      setSelectedRooms(selected);
    } else {
      data.checked = false;
      return alert('Please select your checkout date !');
    }
  };

  return (
    <StyledRoomSelectList>
      <h1>Select Rooms (for {totalNightsStay} nights)</h1>
      <Row>
        {
          (!roomsData || roomsData.length === 0) && <p className="text-danger">Sorry, our hotel is full for the days you want to book.</p>
        }
        {roomsData &&
          roomsData.map((room) => (
            <Col md={6} sm={12}>
              <Row>
                <Col xs={7}>
                  <p className="room-select_title">{room.title}</p>
                  <p className="room-select_desc">{room.desc}</p>
                  <p className="room-select_maxPeople">
                    Max people : <span>{room.maxPeople}</span>
                  </p>
                  <p className="room-select_price">{room.price}$</p>
                </Col>
                <Col xs={5}>
                  <div className="room-select_roomNum-wrapper">
                    {room.roomNumbers.map((roomNum) => (
                      <div className="room-select_room-group">
                        <input
                          key={roomNum}
                          type="checkbox"
                          className="room-select_room-chkbox"
                          id={`room${roomNum}`}
                          value={roomNum}
                          onChange={() => {
                            getRoomDataChange(`room${roomNum}`, room.price);
                          }}
                        />
                        <label
                          htmlFor={`room${roomNum}`}
                          className="room-select_room-num"
                        >
                          {roomNum}
                        </label>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </StyledRoomSelectList>
  );
};

export default RoomSelectList;
