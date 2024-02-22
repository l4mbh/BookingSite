import React from "react";
import HeaderContent from "../components/UI/HeaderContent";
import { Container } from "react-bootstrap";
import HotelForm from "../components/add_new/HotelForm";
import { redirect } from "react-router-dom";
import axios from "axios";

const AddHotelPage = () => {
  return (
    <>
      <HeaderContent text="Add new hotel" />
      <Container>
        <HotelForm />
      </Container>
    </>
  );
};

export default AddHotelPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const hotelInfo = {
    name: formData.get("hotelName"),
    city: formData.get("hotelCity"),
    desc: formData.get("hotelDesc"),
    distance: formData.get("hotelDistance"),
    title: formData.get("hotelTitle"),
    photos: formData.get("hotelImages").split(","),
    address: formData.get("hotelAddress"),
    feature: Boolean(formData.get("hotelFeatured")),
    type: formData.get("hotelType"),
    cheapestPrice: 0, //cheapestPrice will automatic calculate when we add new room to the hotel.
    rooms: [], // Rooms will be empty when we add hotel at first time, have add room manual after create hotel.
  };

  return axios
    .post("http://localhost:5000/admin/add/hotel", { hotelInfo })
    .then((response) => {
      if (response.status === 200) {
        return redirect("/lists/hotel");
      }
    })
    .catch((error) => {
      alert(error);
      return null;
    });
};
