import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/bookingSlice";
import styled from "styled-components";
import axios from "axios";

const StyledBookingForm = styled.div`
  .booking-form {
    &_form-group {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
    }
    &_form-input {
      height: 40px;
      outline-color: skyblue;
    }
    &_form-label {
      font-size: 20px;
    }
  }
`;

const BookingForm = (props) => {
  const startDateData = useSelector((state) => state.booking.startDate);
  const endDateData = useSelector((state) => state.booking.endDate);

  const dispatch = useDispatch();

  const selectionRange = {
    startDate: new Date(startDateData),
    endDate: new Date(endDateData),
    key: "selection",
  };

  const getHotelOnDateChange = () => {
    axios
      .post("https://booking-site-server-two.vercel.app/hotel/search-rooms", {
        hotelId: props.hotelId,
        dateStart: startDateData,
        dateEnd: endDateData,
      })
      .then((response) => {
        console.log(response.data)
        props.onDateChange(response.data);
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.date.message);
        } else {
          alert(err.message);
        }
      });
  };

  const handleDatePick = (ranges) => {
    dispatch(
      bookingActions.setDateRange({
        startDate: new Date(ranges.selection.startDate).toISOString(),
        endDate: new Date(ranges.selection.endDate).toISOString(),
      })
    );
    getHotelOnDateChange();
  };

  useEffect(() => {
    getHotelOnDateChange();
  }, []);

  return (
    <StyledBookingForm>
      <Row>
        <Col md={4} sm={12} className="booking-form_dates">
          <h1 className="booking-form_dates-header">Dates</h1>
          <DateRange
            className="date-pick date booking-form_dates-picker"
            editableDateInputs={true}
            moveRangeOnFirstSelection={true}
            minDate={new Date()}
            onChange={handleDatePick}
            ranges={[selectionRange]}
          />
        </Col>
        <Col md={8} sm={12}>
          <h1 className="booking-form_form-header">Reserve Info</h1>
          <form className="booking-form_form">
            <div className="booking-form_form-group">
              <label htmlFor="" className="booking-form_form-label">
                Your full name:
              </label>
              <input
                name="fullname"
                type="text"
                required
                className="booking-form_form-input"
              />
            </div>
            <div className="booking-form_form-group">
              <label htmlFor="" className="booking-form_form-label">
                Your phone number:
              </label>
              <input
                name="phone"
                type="text"
                required
                className="booking-form_form-input"
              />
            </div>
            <div className="booking-form_form-group">
              <label htmlFor="" className="booking-form_form-label">
                Your email:
              </label>
              <input
                name="email"
                type="email"
                required
                className="booking-form_form-input"
              />
            </div>
            <div className="booking-form_form-group">
              <label htmlFor="" className="booking-form_form-label">
                Your ID Card Number:
              </label>
              <input
                name="idnum"
                type="text"
                className="booking-form_form-input"
              />
            </div>
          </form>
        </Col>
      </Row>
    </StyledBookingForm>
  );
};

export default BookingForm;
