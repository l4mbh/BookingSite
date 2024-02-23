import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ModalPortal from "../../UI/ModalPortal";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const HotelList = ({ hotelsData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteHotelId, setDeleteHotelId] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();


  const navigate = useNavigate();

  const deleteHotelHandler = () => {
    setModalVisible(false);
    setError(null);
    axios
      .post("https://booking-site-server-psi.vercel.app/admin/delete/hotel", {
        hotelId: deleteHotelId,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/lists/hotel?page=${searchParams.get('page') || 1}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
          setModalVisible(true);
        } else {
          setError(err.data.message);
          setModalVisible(true);
        }
      });
  };
  const onDeleteHotel = (id) => {
    setError(null);
    setModalVisible(true);
    setDeleteHotelId(id);
  };
  const resetDeleteId = () => {
    setDeleteHotelId(null);
    setModalVisible(false);
  };
  return (
    <>
      <h1 className="header text-uppercase text-secondary text-bold small my-2 ">
        List of hotels :
      </h1>
      <Table bordered hover striped className="shadow">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Title</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotelsData &&
            hotelsData.map((hotel, index) => (
              <tr key={hotel._id}>
                <td>{index + 1}</td>
                <td>{hotel._id}</td>
                <td>{hotel.name}</td>
                <td className="text-capitalize">{hotel.type}</td>
                <td>{hotel.title}</td>
                <td>{hotel.city}</td>
                <td>
                  <div
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteHotel(hotel._id)}
                  >
                    <FontAwesomeIcon className="mx-1" icon={faMinusCircle} />
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalPortal
        visible={modalVisible}
        setVisible={setModalVisible}
        variant={error ? "info" : "confirm"}
        confirm={deleteHotelHandler}
        deny={resetDeleteId}
        header={error ? "Error" : "Are you sure want to delete this hotel ?"}
      >
        {!error && (
          <>
            <span className="text-danger text-uppercase">Caution:</span>{" "}
            <span>This action can not be reversed!</span>
          </>
        )}
        {error && <span>{error}</span>}
      </ModalPortal>
    </>
  );
};

export default HotelList;
