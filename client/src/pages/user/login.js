import React, {  useState } from "react";
import NavBarHeader from "../home/NavBar/NavBarHeader";

import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { userActions } from "../../store/userSlice";

const StyledLoginPage = styled.div`
  .login-form {
    margin: 150px auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 2px solid lightgray;
  border-radius: 10px; */
    &_wrapper {
      max-width: 100vw;
      max-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &_header {
      font-weight: bolder;
      font-size: 24px;
      margin: 10px 0;
      text-align: center;
    }
    &_body {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 5px 0;
    }
    &_control {
      height: 40px;
      width: 280px;
    }

    &_footer {
      margin-top: 10px;
    }

    &_action {
      height: 40px;
      width: 280px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #0071c2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &_errors {
      font-size: 14px;
      color: red;
      font-style: italic;
    }
  }

  .loading {
    text-align: center;
  }
`;

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const performLoginAction = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://booking-site-server-two.vercel.app/user/login", { username, password })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(userActions.login(response.data));
          setLoading(false);
          return navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        return setErrors(err.response.data);
      });
  };

  return (
    <>
      <NavBarHeader />
      <StyledLoginPage>
        <div className="login-form_wrapper">
          <form onSubmit={performLoginAction} className="login-form">
            <div className="login-form_header">
              <h1>Login</h1>
              {errors && (
                <span className="login-form_errors">
                  {errors.message || ""}
                </span>
              )}
            </div>
            <div className="login-form_body">
              <input
                name="username"
                type="text"
                className="login-form_control login-form_username"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
              />
              <input
                name="password"
                type="password"
                className="login-form_control login-form_password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="login-form_footer">
              <button
                className="login-form_action login-form_submit"
                type="submit"
              >
                {loading ? (
                  <ThreeDots
                    height="40"
                    width="30"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={loading}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </StyledLoginPage>
    </>
  );
};
