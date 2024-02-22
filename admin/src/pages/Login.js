import React, { useEffect } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from 'axios';

const StyledLoginPage = styled.div`
    .loginPage {
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &_header{
            color: #7a6aff;
        }
        &_form {
            border: 1px solid darkgray;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: auto;
            width: 300px;
            border-radius: 6px;
            padding: 10px;
        }
        &_form-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            width: 100%;
        }
        &_button {
            background-color: #7a6aff;
            outline: #7a6aff;
            border: 1px solid #7a6aff;
            &:hover {
                background-color: #fff;
                color: #7a6aff;
            }
        }
        &_form-control {
            outline: #7a6aff;
        }
    }

`;

const Login = () => {
  const actionData = useActionData();
  const errMsg = actionData && actionData.errMsg;

  const navigate= useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      navigate('/');
    }
  }, [])

  return (
    <StyledLoginPage>
      <div className="loginPage">
        <Form method="POST" action="/login" className="loginPage_form">
        <h3 className="loginPage_header">Admin Login</h3>
          <div className="loginPage_form-group">
            <label className="loginPage_label">Username</label>
            <input
              className="loginPage_form-control"
              type="text"
              name="username"
              required
            />
          </div>
          <div className="loginPage_form-group">
            <label className="loginPage_label">Password</label>
            <input
              className="loginPage_form-control"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="loginPage_action">
            <button type="submit" className="loginPage_button btn btn-lg btn-primary">Login</button>
          </div>
        </Form>
        {
          errMsg && <div className="error text-danger">
            {errMsg}
        </div>
        }
      </div>
    </StyledLoginPage>
  );
};

export default Login;

export const action = async ({request}) => {


  const formData = await request.formData();
  
  const username = formData.get('username');
  const password = formData.get('password');

  return axios.post('http://localhost:5000/admin/login', {
    username: username,
    password: password
  })
  .then(response => {
    if(response.statusText === "OK") {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return redirect('/');
    }
  })
  .catch(err => {
    if(err.response) {
      return {errMsg : err.response.data.message}
    } else {
      return {errMsg : err.message}
    }
  })

}
