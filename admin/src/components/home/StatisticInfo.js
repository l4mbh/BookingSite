import React from "react";
import { Col, Row } from "react-bootstrap";
import StatisticCard from "./StatisticCard";
import { styled } from "styled-components";
import { faCoins, faTruckFast, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import Skeleton from 'react-loading-skeleton';


const StyledStatisticInfo = styled.div`
  .statisticInfo {
    &_wrapper {
      margin: 20px 0;
    }
  }
`;

const StatisticInfo = ({ data }) => {
  const colorData = [
    { iconColor: "red", bgColor: "rgba(250, 0, 0, 0.4)" },
    { iconColor: "orange", bgColor: "rgba(237, 250, 0, 0.3)" },
    { iconColor: "green", bgColor: "rgba(55, 250, 0, 0.4)" },
    { iconColor: "purple", bgColor: "rgba(237, 0, 250, 0.4)" },
  ];

  const icons = [
    faUser,
    faTruckFast,
    faCoins,
    faWallet
  ]
  return (
    <StyledStatisticInfo>
      <div className="statisticInfo_wrapper">
        <Row>
          {data &&
            data.map((stat, index) => (
              <Col xs={3} key={index}>
                {<StatisticCard stat={stat} icons={icons[index]} color={colorData[index]}  /> || <Skeleton/>}
              </Col>
            ))}

        </Row>
      </div>
    </StyledStatisticInfo>
  );
};

export default StatisticInfo;
