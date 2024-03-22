import React from "react";
import NavBarHeader from "../home/NavBar/NavBarHeader";

import styled from "styled-components";
import { Form, redirect, useActionData } from "react-router-dom";
import axios from "axios";

const StyledSignupPage = styled.div`
  .signup-form {
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
    }
    &_errors {
      font-size: 12px;
      text-align: center;
      font-style: italic;
      color: red;
    }
  }
`;

export const SignupPage = () => {
  const errors = useActionData();
  return (
    <>
      <NavBarHeader />
      <StyledSignupPage>
        <div className="signup-form_wrapper">
          <Form action="/signup" method="POST" className="signup-form">
            <div className="signup-form_header">
              <h1>Signup</h1>
              {errors && <span className="signup-form_errors">{errors.message}</span>}
            </div>
            <div className="signup-form_body">
              <input
                name="username"
                type="text"
                className="signup-form_control signup-form_username"
                placeholder="Username"
              />
              <input
                name="userpassword"
                type="password"
                className="signup-form_control signup-form_password"
                placeholder="Password"
              />
            </div>
            <div className="signup-form_footer">
              <button
                className="signup-form_action signup-form_submit"
                type="submit"
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </StyledSignupPage>
    </>
  );
};

export const action = async ({ request }) => {
  const requestData = await request.formData();

  const username = requestData.get("username");
  const password = requestData.get("userpassword");

  return axios
    .post("https://booking-site-server-two.vercel.app/user/signup", {
      username: username,
      password: password,
    })
    .then((response) => {
      return redirect("/login");
    })
    .catch((err) => {
      return err.response.data;
    });
};
