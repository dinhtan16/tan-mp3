import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WeekContainer = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  /* align-items: center; */
  width: 100%;
  gap: 1rem;
  /* justify-content: center; */
`;
const WeekItem = styled.div`
  cursor: pointer;
  flex-wrap: wrap;
  /* max-width: 30%; */
  overflow: hidden;
  border-radius: 10px;
  transition: all .2s ease-out;
  &:hover {
    transform: scale(0.99);
/* 
    box-shadow: -2px 4px 227px -26px rgba(90, 63, 63, 1);
    -webkit-box-shadow: -2px 4px 227px -26px rgba(90, 63, 63, 1);
    -moz-box-shadow: -2px 4px 227px -26px rgba(90, 63, 63, 1); */
  }
  img {
    object-fit: cover;
    vertical-align: top;
    transition: all 0.3s ease;
    min-height: 110px;
   
    width: 100%;
    /* height: auto; */
    border-radius: 10px;
  }
`;
const WeekChart = ({ data }) => {
  const navigate = useNavigate();
  return (
    <WeekContainer>
      {data?.map((item, i) => {
        return (
          <WeekItem key={i} onClick={() => navigate(item.link.split(".")[0])}>
            <img src={item.cover} alt="" />
          </WeekItem>
        );
      })}
    </WeekContainer>
  );
};

export default WeekChart;
