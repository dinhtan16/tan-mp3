import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EventContainer = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  gap: 1rem;
  margin-top: 48px;
  /* justify-content: center; */
`;
const EventSlide = styled.div`
  /* cursor: pointer; */
  flex-wrap: wrap;
  max-width: 344px;
  overflow: hidden;
  min-height: 193px;
  transition: all 0.2s ease-out;

  @media screen and (max-width: 1000px) {
    width: 300px;
    flex: 1;
  }
  .item-top {
    position: relative;
    cursor: pointer;
    word-break: break-word;
    .overlay {
      z-index: 1;
      border-radius: 10px;

      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        180deg,
        transparent 27%,
        rgba(0, 0, 0, 0.78)
      );
    }
    &:hover img {
      transform: scale(1.01);
    }
    img {
      object-fit: cover;
      vertical-align: top;
      transition: all 0.3s ease;
      /* min-height: 110px; */

      width: 100%;
      /* height: auto; */
      border-radius: 10px;
    }
    .info {
      z-index: 2;
      position: absolute;
      bottom: 10px;
      left: 10px;
      /* padding: 10px 0; */
      & > * {
        margin-top: 7px;
      }
      .label {
        word-break: break-word;

        background-color: white;
        color: red;
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        padding: 5px;
      }
      .title {
        word-break: break-word;
        @media screen and (max-width:1000px){
            
            width: 180px;
        }
        width: 100%;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        color: #fff;
      }
      .date {
        font-weight: bold;
        color: #fff;
      }
    }
  }
  .item-bottom {
    background-color: transparent;
    display: flex;
    /* padding: 5px; */
    flex-wrap: wrap;
    /* overflow-x: scroll; */
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    span {
      font-size: 0.8rem;
      /* margin-left: 5px; */
    }
    .follow {
      display: flex;
      align-items: center;
      .img-list {
        display: flex;
        /* height: 50px; */
        img {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          object-fit: cover;
        }
      }
    }
  }
  .title-bottom {
    margin: 8px 0;
    font-size: 0.9rem;
    color: grey;
    padding: 0 5px;
  }
  .congrats{
    background-color:  ${props => props.theme.buttonBgr};
    /* padding: 10px; */
    padding:10px 20px;
    border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
    color: #fff;
    cursor: pointer;
    span{
        font-size: 0.8rem;
    }
  }
`;
const Events = ({ data, title }) => {
  //   console.log(data)
  const [dataSection, setDataSection] = useState([]);
  useEffect(() => {
    if (window.innerWidth > 1000) {
      const dataCut = data?.slice(0, 3);
      setDataSection(dataCut);
    } else {
      const dataCut = data?.slice(1, 3);
      setDataSection(dataCut);
    }

    return () => {
      setDataSection(null);
    };
  }, [window.innerWidth, data]);
  const navigate = useNavigate();

  return (
    <>
      <EventContainer>
        <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{title}</div>
        {dataSection?.map((item, i) => {
          const time = new Date(Number(item?.publishTime * 1000));

          const year = time.getUTCFullYear();

          const month = time.getUTCMonth();

          const day = time.getUTCDate();
          return (
            <EventSlide key={i}>
              <div
                className="item-top"
                onClick={() => navigate(item.link.split(".")[0])}
              >
                <div className="overlay"></div>
                <img src={item.coverHM} alt="" />
                <div className="info">
                  <div className="label">{item.label}</div>
                  <div className="title">{item.title}</div>
                  <div className="date">
                    {day}/{month + 1}/{year}
                  </div>
                </div>
              </div>
              <div className="title-bottom">Lượt chúc mừng</div>
              <div className="item-bottom">
                <div className="follow">
                  {item?.followers.map((item, i) => {
                    return (
                      <div key={i} className="img-list">
                        <img src={item.avatar} alt="" />
                      </div>
                    );
                  })}
                  <span>+{item.totalFollow}</span>
                </div>
                <div className="congrats"><span>Chúc mừng</span></div>
              </div>
              {/* <button>Chúc mừng</button> */}
            </EventSlide>
          );
        })}
      </EventContainer>
    </>
  );
};

export default Events;
