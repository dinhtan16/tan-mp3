import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { numberFollow } from '../customHook/fnNumber';


const Artists = styled.div`
  .artist-title {
    font-size: 1.2rem;
    margin-top: 5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .artists-list {
    display: flex;
    /* gap: 1rem; */
    /* flex-direction: column; */
    flex-wrap: wrap;
    .artist-item {
      margin-top: 20px;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .item-img {
          width: 70%;
          border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        &:hover img {
            transform: scale(1.09);
        }
        &:hover{
            transform: scale(1);
        }
        img {
            overflow: hidden;
            transition: all .3s ease;

          border-radius: 50%;
          width: 100%;
          /* height: auto; */
          object-fit: cover;
        }
      }
      .item-info {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 50px;
        gap: 10px;

        .info-name {
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          &:hover{
            color:#644646;
          }
        }
        .info-follow {
          font-size: 0.82rem;
          color: grey;
          height: 30px;
        }
      }
      .item-btn {
        margin-top: 10px;
        padding: 8px 20px;
        border-radius: 999px;
        outline: none;
        border: none;
        text-transform: uppercase;
        background-color: #644646;
        color: #fff;
        /* height: 50px; */
      }
    }
  }
`;
const ArtistSlide = ({data}) => {

    const navigate= useNavigate()
  return (
    <Artists>
    <div className="artist-title">Nghệ sĩ Nổi Bật</div>
    <div className="artists-list">
      {data?.map((item) => {
        return (
          <div className="artist-item" key={item.id}>
            <div className="item-img" onClick={() => navigate(item.link)}>
              <img src={item.thumbnail} alt="none" />
            </div>
            <div className="item-info">
              <Link to={item.link} className="info-name">
                {item.name}
              </Link>
              <span className="info-follow">
                {numberFollow(+item.totalFollow)} quan tâm
              </span>
            </div>
            <button className="item-btn">Quan tâm</button>
          </div>
        );
      })}
    </div>
  </Artists>
  )
}

export default ArtistSlide