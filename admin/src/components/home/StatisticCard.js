import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";

const StyledStatisticCard = styled.div`
  .card {
    height: auto;
    padding: 10px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: none;
    &_title {
      text-transform: uppercase;
      font-weight: bold;
      color: gray;
      margin-bottom: 15px;
    }
    &_content {
      font-size: 24px;
    }
    &_icon {
      align-self: flex-end;
      margin: 5px;
      border: 1px solid transparent;
      border-radius: 3px;
      padding: 0 6px;
      color: ${props => props.color ? props.color.iconColor : 'black'};
      background-color: ${props => props.color ? props.color.bgColor : 'rgba(0,0,0,0.1)'};
    }
  }
`;

const StatisticCard = (props) => {
  return (
    <StyledStatisticCard color={props.color}>
      <div className="card">
        <div className="card_title">{props.stat.name}</div>
        <div className="card_content">{props.stat.data}</div>
        <div className="card_icon">
          <FontAwesomeIcon icon={props.icons} width={15} />
        </div>
      </div>
    </StyledStatisticCard>
  );
};

export default StatisticCard;
