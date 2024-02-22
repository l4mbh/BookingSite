import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userActions } from "../../../store/userSlice";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const StyledNavBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #003580;

  .navBarBrand {
    color: white;
    max-width: fit-content;
    margin: 10px 0;
  }
  .navBarBrand a,
  .navBarBrand a:visited,
  .navBarBrand a:active {
    text-decoration: none;
    color: white;
    font-size: 28px;
    font-weight: bold;
  }

  .navBarBtn {
    color: blue;
    margin: 0 5px;
    outline: none;
    border: 1px solid darkgray;
    text-decoration: none;
    padding: 3px;
    background-color: #fff;
    color: darkcyan;
    cursor: pointer;
    transition: all 0.2s;
  }

  .navBarBtn:hover {
    background-color: lightgray;
  }

  .navBarBtn.logout {
    color: red;
  }

  .navBar_username {
    color: #fff;
    font-weight: bold;
    border: 1px solid white;
    padding: 3px 5px;
    margin: 0 10px;
  }
`;

const NavBarHeader = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const performLogout = () => {
    axios
      .post("http://localhost:5000/user/logout", { userToken: user.token })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(userActions.logout());
          return navigate("/");
        }
      })
      .catch((err) => {
        alert(err.response || err);
      });
  };
  return (
    <Container fluid className="m-0 px-1">
      <StyledNavBarHeader>
        <div className="navBarBrand" title="Booking website">
          <Link to="/">BOOKING WEBSITE</Link>
        </div>
        <div className="navBarActions">
          {isLogin ? (
            <div>
              <span className="navBar_username">
                <FontAwesomeIcon icon={faUser} /> {user.username}
              </span>
              <Link to="/user/transaction" className="navBarBtn">
                Transactions
              </Link>
              <button className="navBarBtn logout" onClick={performLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/signup" className="navBarBtn">
                Register
              </Link>
              <Link to="/login" className="navBarBtn">
                Login
              </Link>
            </div>
          )}
        </div>
      </StyledNavBarHeader>
    </Container>
  );
};

export default NavBarHeader;
