import React, { useState } from "react";
import HeaderContent from "../components/UI/HeaderContent";
import TransactionsList from "../components/lists/transaction/TransactionsList";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Pagination from "../components/UI/Pagination";

const TransactionsPage = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  const [transactionMax, setTransactionMax] = useState(null);
  const loaderData = useLoaderData();

  if (loaderData) {
    loaderData.result.then((data) => {
      setTransactionsData(data.transactionsData);
      setTransactionMax(data.maxTransactions);
    });
  }

  if (transactionsData === null) {
    return (
      <>
        <HeaderContent text="Transactions list" />
        <Container>
          <h1>
            <Skeleton />
          </h1>
          <Skeleton count={10} />
        </Container>
      </>
    );
  }
  return (
    <>
      <HeaderContent text="Transactions list" />
      <Container>
        <TransactionsList data={transactionsData} />
        <Pagination max={transactionMax} url="/lists/transaction?page="/>
      </Container>
    </>
  );
};

export default TransactionsPage;

export const loader = () => {
  const query = new URLSearchParams(window.location.search);
  const page = query.get("page") || 1;

  const result = axios
    .get("https://booking-site-server-psi.vercel.app/admin/transactionslist?page=" + page)
    .then((response) => response.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    });
  return { result };
};
