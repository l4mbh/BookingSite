import React from "react";
import { Table } from "react-bootstrap";
import { styled } from "styled-components";

const StyledLastestTransactions = styled.div``;
const StyledTransactionStatus = styled.p`
  padding: 4px;
  color: darkgray !important;
  border-radius: 4px;
  background-color: ${(props) => {
    if(props.text === "booked") {
        return "yellow"
    } else if (props.text === "checkedin") {
        return "orange"
    } else if (props.text === "checkedout"){
        return "green"
    } else {
        return "gray"
    }
  }} !important;
`;
const LastestTransactions = ({ data }) => {
  return (
    <StyledLastestTransactions>
      <h4 className="header text-capitalize text-secondary">Lastest Transactions</h4>
      {
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((transaction, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{transaction._id}</td>
                  <td>{transaction.username}</td>
                  <td>{transaction.hotel.name}</td>
                  <td>{transaction.room.toString()}</td>
                  <td>
                    {new Date(transaction.dateStart)
                      .toLocaleDateString("vi-VN")
                      .toString() +
                      " - " +
                      new Date(transaction.dateEnd)
                        .toLocaleDateString("vi-VN")
                        .toString()}
                  </td>
                  <td>{transaction.price}$</td>
                  <td>{transaction.payment}</td>
                  <td>
                    <StyledTransactionStatus text={transaction.status}>
                      {transaction.status}
                    </StyledTransactionStatus>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      }
    </StyledLastestTransactions>
  );
};

export default LastestTransactions;
