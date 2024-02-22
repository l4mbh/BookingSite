import React from "react";
import { Badge, Table } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";

import styled from "styled-components";

const StyledTransactionList = styled.div`
  .transaction-list {
    &_table {
      width: 100%;
      text-align: left;
      border: 1px solid black;
    }
    &_header {
      height: 30px;
      background-color: blue !important;
      & > td {
        border: 1px solid white;
      }
    }
    &_status {
      text-transform: capitalize;
    }
  }
`;

const TransactionList = (props) => {
  const data = props.transactionsData;

  const setBadgeBg = (status) => {
    if (status === "booked") {
      return "warning";
    } else if (status === "checkedin") {
      return "primary";
    } else {
      return "success";
    }
  };

  return (
    <StyledTransactionList>
      <Table
        striped
        bordered
        hover
        className="transaction-list_table border-dark"
      >
        <thead className="transaction-list_header table-primary border-dark">
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        {!data ? (
          <p className="no-transaction">You havent made any transaction</p>
        ) : (
          <tbody>
            {!data ? (
              <ThreeDots height="80" width="80" radius="9" color="#4fa94d" />
            ) : (
              data.map((transaction, index) => (
                <tr>
                  <td className="transaction-list_index">{index + 1}</td>
                  <td>{transaction.hotel.name}</td>
                  <td>{transaction.room.toString()}</td>
                  <td>
                    {new Date(transaction.dateStart).toLocaleDateString(
                      "vi-VN"
                    ) +
                      " to " +
                      new Date(transaction.dateEnd).toLocaleDateString("vi-VN")}
                  </td>
                  <td>{transaction.price}$</td>
                  <td>{transaction.payment}</td>
                  <td className="transaction-list_status">
                    <Badge bg={setBadgeBg(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        )}
      </Table>
    </StyledTransactionList>
  );
};

export default TransactionList;
