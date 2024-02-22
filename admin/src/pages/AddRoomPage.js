import React from "react";
import HeaderContent from "../components/UI/HeaderContent";
import { Container } from "react-bootstrap";
import RoomForm from "../components/add_new/RoomForm";
import axios from "axios";
import { redirect } from "react-router-dom";

const AddRoomPage = () => {
  return (
    <>
      <HeaderContent text="Add new room" />
      <Container>
        <RoomForm />
      </Container>
    </>
  );
};

export default AddRoomPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const roomData = {
    title: formData.get("roomTitle"),
    desc: formData.get("roomPrice"),
    maxPeople: formData.get("roomMaxPeople"),
    roomNumbers: formData.get("roomRooms").split(","),
    price: formData.get("roomPrice"),
  };

  const hotelId = formData.get("hotelId");

  return axios
    .post("http://localhost:5000/admin/add/room", { roomData, hotelId })
    .then((response) => {
      if (response.status === 200) {
        return redirect("/lists/room");
      }
    })
    .catch((err) => {
      alert(err.message);
      return null;
    });
};
