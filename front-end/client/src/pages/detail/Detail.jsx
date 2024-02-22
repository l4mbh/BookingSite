import React, { useEffect, useState } from "react";
import styled from "styled-components";

import NavBar from "../home/NavBar/NavBar";
import Footer from "../home/Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import RoomSelectList from "./RoomSelectList";
import { useSelector } from "react-redux";

const StyledDetail = styled.div`
  .detail-header {
    display: flex;
    justify-content: space-between;
  }

  .detail-name {
    font-size: 32px;
    font-weight: bold;
  }

  .detail-distance {
    color: #0071c2;
  }

  .detail-price {
    color: green;
  }

  .detail-action {
    max-height: 55px;
  }

  .detail-nine-night {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: #ebf3ff;
  }

  .detail-nine-night p {
    text-align: justify;
  }

  .detail-nine-night__price {
    margin: 20px 0;
  }

  .detail-nine-night__price-number {
    margin: 0 10px 0 0;
    font-size: 28px;
    font-weight: bold;
  }
  .detail-nine-night__price-sub {
    font-size: 28px;
    font-weight: 300;
  }
  .booking-form_payment-select {
    height: 40px;
    width: 220px;
    margin-right: 50px;
  }
`;

const Detail = () => {
  const [hotelData, setHotelData] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [totalRoomPrice, setTotalRoomPrice] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [payment, setPayment] = useState(null);

  const userInfo = useSelector((state) => state.user.user);
  const startDate = useSelector((state) => state.booking.startDate);
  const endDate = useSelector((state) => state.booking.endDate);

  const params = useParams();
  const hotelId = params.id;

  const navigate = useNavigate();

  const onGetPriceSelectRoom = (data) => {
    setTotalRoomPrice(data.totalPrice);
    setSelectedRooms(data.selected);
  };

  const reserveRoomHandler = () => {
    if (!payment) {
      return alert("Please select your payment method !");
    } else if (selectedRooms.length === 0) {
      return alert("You havent selected any room yet !");
    } else {
      if (!userInfo) {
        return alert("Please log in to start booking!");
      }
      const transactionInfo = {
        username: userInfo.username,
        hotel: hotelData._id,
        room: selectedRooms,
        dateStart: startDate,
        dateEnd: endDate,
        price: totalRoomPrice,
        payment: payment,
        status: "booked",
        userToken: userInfo.token,
      };
      axios
        .post("http://localhost:5000/user/new-transaction", transactionInfo)
        .then((response) => {
          if (response.statusText === "OK") {
            navigate("/user/transaction");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const onPaymentSelect = (e) => {
    setPayment(e.target.value);
  };

  const toggleBookingForm = () => {
    setShowBookingForm((prevState) => !prevState);
  };

  const getHotelOnDateChangeHandler = (newHotelData) => {
    setHotelData(newHotelData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/hotel/detail/" + hotelId)
      .then((response) => response.data)
      .then((data) => {
        setHotelData(data);
      })
      .catch((err) => {
        alert(err.message || err.response.data.message || err);
      });
  }, [hotelId]);

  return (
    <StyledDetail>
      <NavBar />
      <Container>
        {hotelData && (
          <div className="detail-content py-3">
            <div className="detail-header">
              <div className="detail-info">
                <h2 className="detail-name">{hotelData.title || ""}</h2>
                <div className="detail-address">
                  <FontAwesomeIcon icon={faMap} />
                  {` ${hotelData.address}`}
                </div>
                <div className="detail-distance">
                  Excellent location - {hotelData.distance}m from center
                </div>
                <div className="detail-price">
                  Book a stay over ${hotelData.cheapestPrice} at this property
                </div>
              </div>
              <button
                onClick={toggleBookingForm}
                className="detail-action btn btn-lg btn-primary"
              >
                Reserve or Book now!
              </button>
            </div>
            <div className="detail-imgs my-3 mt-5">
              <Row className="gx-1 gy-1">
                {hotelData.photos.map((img, index) => (
                  <Col sm={4} key={index}>
                    <img
                      lazyload="true"
                      alt="hotel"
                      className="img-fluid"
                      src={img}
                      height={250}
                      width={"auto"}
                    />
                  </Col>
                ))}
              </Row>
            </div>
            <div className="detail-description mt-5">
              <Row>
                <Col sm={9}>
                  <div className="detail-description-title">
                    <h2>{hotelData.title || ""}</h2>
                  </div>
                  <div className="detail-description-text">
                    <p>{hotelData.desc}</p>
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="detail-nine-night">
                    <h5 className="text-secondary">
                      Perfect for a 1-night stay!
                    </h5>
                    <p>
                      {`Located in the real heart of Krakow, this property has an
                      excellent location score of ${hotelData.rating}!`}
                    </p>
                    <div className="detail-nine-night__price">
                      <span className="detail-nine-night__price-number">
                        ${hotelData.cheapestPrice}
                      </span>
                      <span className="detail-nine-night__price-sub">
                        (1 night)
                      </span>
                    </div>
                    <div
                      onClick={toggleBookingForm}
                      className="btn btn-lg btn-primary detail-nine-night__price-btn"
                    >
                      Reserve or Book now!
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {showBookingForm && (
          <>
            <BookingForm
              hotelId={hotelId}
              onDateChange={getHotelOnDateChangeHandler}
            />
            <RoomSelectList
              onSelectRoom={onGetPriceSelectRoom}
              roomsData={hotelData.rooms}
            />
            <div className="booking-form_footer">
              <h1 className="booking-form_total">
                Total Bill: {totalRoomPrice}$
              </h1>
              <div className="booking-form_action">
                <select
                  name="payment"
                  id="payment-select"
                  className="booking-form_payment-select"
                  defaultValue={payment}
                  onChange={onPaymentSelect}
                >
                  <option value={null} selected={!payment} disabled>
                    Select payment method
                  </option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
                <button
                  onClick={reserveRoomHandler}
                  className="booking-form_reserve-btn btn btn-lg btn-primary"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
      <Footer></Footer>
    </StyledDetail>
  );
};

export default Detail;
