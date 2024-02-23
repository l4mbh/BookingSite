import React, { useState } from "react";
import HeaderContent from "../components/UI/HeaderContent";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Badge, Container, Table } from "react-bootstrap";
import Pagination from "../components/UI/Pagination";

const UsersPage = () => {

  const [userData, setUserData] = useState(null);
  
  const loaderData = useLoaderData();

  loaderData.result.then(data => {
    setUserData(data);
  })
  
  if (userData) {
    return (
      <>
        <HeaderContent text="Users List" />
        <Container>
          <h1 className="text-secondary text-uppercase small mt-2">
            List of users :
          </h1>
          <div>
            <Table bordered hover striped className="shadow">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {userData.users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>
                      <Badge bg={user.isAdmin ? "success" : "warning"}>
                        {user.isAdmin ? "YES" : "NO"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination max={userData.maxUser} url={`/lists/user?page=`} />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <HeaderContent text="Users List" />
        <Container>
          <h1>
            <Skeleton />
          </h1>
          <div>
            <Skeleton count={10} />
          </div>
        </Container>
      </>
    );
  }
};

export default UsersPage;

export const loader = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") || 1;

  const result = axios
    .get("https://booking-site-server-psi.vercel.app/admin/userslist?page=" + page)
    .then((response) => response.data)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    });

  return ({result});
};
