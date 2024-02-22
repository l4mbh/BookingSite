import React, { useState } from "react";
import HeaderContent from "../components/UI/HeaderContent";
import { Link, useLoaderData } from "react-router-dom";
import RoomsList from "../components/lists/room/RoomsList";
import axios from "axios";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Pagination from "../components/UI/Pagination";
import PageActions from "../components/UI/PageActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const RoomsPage = () => {
  const [roomsData, setRoomsData] = useState(null);
  const [roomMax, setRoomMax] = useState(null);
  const loaderData = useLoaderData();

  if (loaderData) {
    loaderData.result.then((data) => {
      setRoomsData(data.roomsData);
      setRoomMax(data.maxRooms);
    });
  }

  if (roomsData === null) {
    return (<>
      <HeaderContent text="Rooms list" />
      <Container>
        <h1>
          <Skeleton />
        </h1>
        <Skeleton count={10} />
      </Container>
    </>)
  }

  return (
    <>
      <HeaderContent text="Rooms list" />
      <Container>
      <PageActions>
          <Link to='/add-room' className="btn btn-primary">
            <FontAwesomeIcon icon={faPlusCircle} /> Add new room
          </Link>
        </PageActions>
        <RoomsList roomsData={roomsData} />
        <Pagination max={roomMax} url="/lists/room?page="/>
      </Container>
    </>
  );
};

export default RoomsPage;

export const loader = () => {
  const query = new URLSearchParams(window.location.search);
  const page = query.get("page") || 1;

  const result = axios
    .get("http://localhost:5000/admin/roomslist?page=" + page)
    .then((response) => response.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    });
  return { result };
};
