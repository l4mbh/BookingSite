import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faUser,
  faBuilding,
  faHome,
  faTruckLoading,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./LeftPanel.module.scss";
import axios from "axios";


const LeftPanel = () => {
  const navigate = useNavigate();

  const logoutAction = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      axios
        .post("https://booking-site-server-psi.vercel.app/admin/logout", { userToken: user.token })
        .then((respsonse) => {
          if (respsonse.statusText === "OK") {
            localStorage.removeItem("user");
            return navigate("/login");
          }
        })
        .catch((err) => {
          if (err.repsonse) {
            alert(err.repsonse.data.message);
            return navigate("/");
          } else {
            alert(err);
            return navigate("/");
          }
        });
    }
  };

  return (
    <div className={classes.leftPanel}>
      <div className={classes.leftPanel_header}>
        <h1 className={classes.leftPanel_headerTitle}>Admin Page</h1>
      </div>
      <div className={classes.leftPanel_body}>
        <div className={classes.leftPanel_list}>
          <div className={classes.leftPanel_listItem}>
            <p className={classes.leftPanel_listHeader}>Main</p>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faTableColumns} />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </div>
          <div className={classes.leftPanel_listItem}>
            <p className={classes.leftPanel_listHeader}>Lists</p>
            <NavLink
              to="/lists/user?page=1"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/lists/hotel?page=1"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              <span>Hotels</span>
            </NavLink>
            <NavLink
              to="/lists/room"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span>Rooms</span>
            </NavLink>
            <NavLink
              to="/lists/transaction"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faTruckLoading} />
              </span>
              <span>Transactions</span>
            </NavLink>
          </div>
          <div className={classes.leftPanel_listItem}>
            <p className={classes.leftPanel_listHeader}>New</p>
            <NavLink
              to="add-hotel"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                +
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              <span>New Hotel</span>
            </NavLink>
            <NavLink
              to="add-room"
              className={({ isActive }) =>
                isActive
                  ? `${classes.leftPanel_link} ${classes.active}`
                  : classes["leftPanel_link"]
              }
            >
              <span className={classes.leftPanel_icon}>
                +
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span>New Room</span>
            </NavLink>
          </div>
          <div className={classes.leftPanel_listItem}>
            <p className={classes.leftPanel_listHeader}>User</p>
            <div
              onClick={logoutAction}
              className={`${classes.leftPanel_link} ${classes.leftPanel_logOut}`}
            >
              <span className={classes.leftPanel_icon}>
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
