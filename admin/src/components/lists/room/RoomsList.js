import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalPortal from "../../UI/ModalPortal";

const RoomsList = ({ roomsData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const deleteHotelHandler = () => {
    setModalVisible(false);
    setError(null);
    axios
      .post("http://localhost:5000/admin/delete/room", {
        roomId: deleteRoomId,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/lists/room?page=${searchParams.get('page') || 1}`);
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
  const onDeleteRoom = (id) => {
    setError(null);
    setModalVisible(true);
    setDeleteRoomId(id);
  };
  const resetDeleteId = () => {
    setDeleteRoomId(null);
    setModalVisible(false);
  };
  return (
    <>
      <h1 className="header text-uppercase text-secondary text-bold small my-2">
        List of rooms :
      </h1>
      <Table bordered hover striped className="shadow">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Max People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roomsData &&
            roomsData.map((room, index) => (
              <tr key={room._id}>
                <td>{index + 1}</td>
                <td>{room._id}</td>
                <td>{room.title}</td>
                <td className="text-capitalize">{room.desc}</td>
                <td>{room.price}</td>
                <td>{room.maxPeople}</td>
                <td width={100}>
                  <div className="btn btn-danger btn-sm" onClick={() => onDeleteRoom(room._id)}>
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
        header={error ? "Error" : "Are you sure want to delete this room ?"}
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

export default RoomsList;
