import React, { useState } from "react";
import HeaderContent from "../components/UI/HeaderContent";
import { Col, Container, Row } from "react-bootstrap";
import StatisticInfo from "../components/home/StatisticInfo";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import LastestTransactions from "../components/home/LastestTransactions";
import Skeleton from "react-loading-skeleton";

const HomePage = () => {
  const [statisticData, setStatisticData] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const preloadData = useLoaderData();

  preloadData.result.then((data) => {
    setStatisticData(data.statisticData);
    setTransaction(data.lastestTranstions);
  });

  if (statisticData === null && transaction === null) {
    return (
      <>
        <HeaderContent text="Dashboard" />
        <Container>
          <Row>
            {[...Array(4)].map((col) => (
              <Col xs={3} mb-5>
                <Skeleton height={130} className="mb-3" />
              </Col>
            ))}
          </Row>
          <Skeleton count={10} />
        </Container>
      </>
    );
  }

  return (
    <>
      <HeaderContent text="Dashboard" />
      <Container>
        {<StatisticInfo data={statisticData} />}
        {<LastestTransactions data={transaction} />}
      </Container>
    </>
  );
};

export default HomePage;

export const loader = () => {
  const result = axios
    .get("http://localhost:5000/admin/statistic")
    .then((response) => response.data)
    .then((data) => {
      return {
        statisticData: [
          {
            name: "Users",
            data: data.statistic.user,
          },
          {
            name: "Transactions",
            data: data.statistic.transaction,
          },
          {
            name: "Total Income ($)",
            data: data.statistic.totalAmount,
          },
          {
            name: "Income per Month ($)",
            data: data.statistic.avgMonth,
          },
        ],
        lastestTranstions: data.transactions,
      };
    })
    .catch((err) => {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err);
      }
    });

  return { result };
};
