import React, { useEffect, useState } from "react";
import NavBarHeader from "../home/NavBar/NavBarHeader";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TransactionList from "./TransactionList";

const StyledTransactionPgae = styled.div`

.transaction-list_wrapper {
  max-width: 80%;
  margin: 50px auto;
}


`;

const TransactionPage = () => {
  const [transaction, setTransaction] = useState([]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/transaction?u=" + user.username)
      .then((result) => {
        const data = result.data;

        setTransaction(data);
      });
  }, [user]);
  return (
    <StyledTransactionPgae>
      <NavBarHeader />
      <div className="transaction-list_wrapper">
        <h1>Your transactions :</h1>
        <TransactionList transactionsData={transaction}/>
      </div>
    </StyledTransactionPgae>
  );
};

export default TransactionPage;
