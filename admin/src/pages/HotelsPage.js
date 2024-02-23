import React, { useState } from "react";
import HeaderContent from "../components/UI/HeaderContent";
import { Container } from "react-bootstrap";
import HotelList from "../components/lists/hotel/HotelList";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/UI/Pagination";
import PageActions from "../components/UI/PageActions";



const HotelsPage = () => {
  const [hotelsData, setHotelsData] = useState(null);
  const [hotelMax, setHotelMax] = useState(null);

  const loaderData = useLoaderData();

  if (loaderData) {
    loaderData.result.then((data) => {
      setHotelsData(data.hotelsData);
      setHotelMax(data.maxHotels);
    });
  }

  if (!hotelsData) {
    return (
      <>
        <HeaderContent text="Hotels list" />
        <Container>
          <h1>
            <Skeleton />
          </h1>
          <Skeleton count={10} />
        </Container>
      </>
    );
  }

  return (
    <>
      <HeaderContent text="Hotels list" />
      <Container>
        <PageActions>
          <Link to='/add-hotel' className="btn btn-primary">
            <FontAwesomeIcon icon={faPlusCircle} /> Add new hotel
          </Link>
        </PageActions>
        <HotelList hotelsData={hotelsData} />
        <Pagination max={hotelMax} url="/lists/hotel?page=" />
      </Container>
    </>
  );
};

export default HotelsPage;

export const loader = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || 1;

  const result = axios
    .get("https://booking-site-server-psi.vercel.app/admin/hotelslist?page=" + page)
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
