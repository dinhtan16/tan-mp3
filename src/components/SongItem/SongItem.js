import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrSong, setIsPlayAudio, setRecentPlayedSong } from "../../stores/Slices/setIDSlice";
const SongItemStyle = styled.div`
  width: 30%;
  /* margin-top: 0.5rem; */
  &.sidebar-container {
    width: 100% !important;
  }
  @media screen and (max-width: 964px) {
    width: 50%;
    /* margin-top: 0.7rem; */
  }
  .container-item {
    cursor: pointer;
    padding: 10px;
    &:hover {
      background-color: #d9d7d3;
    }
    &.active {
      background-color: #644646;
      color: #fff;
      border-radius: 10px;
    }
    &.sidebar {
      border-radius: 10px;
    }
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .item-img {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
    .info {
      flex: 1;
      .info-title {
        font-size: 0.9rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
      }
      .info-artist,
      .info-release {
        font-size: 0.8rem;
        color: grey;
        margin-top: 5px;
        &.sidebar {
          display: none;
        }
        &.active {
          color: #fff;
        }
        &.active a:hover {
          color: #fff;
          text-decoration: underline;
        }
        a:hover {
          color: #5a3f3f;
        }
      }
    }
  }
`;
const SongItem = ({ data, isRightSideBar }) => {
  const {encodeId,title,thumbnailM,artists,duration} = data
  // console.log(encodeId)
  // const isActiveTab = useSelector((state) => state.setID.isActiveTab);
  // console.log(isActiveTab)
  const dispatch = useDispatch();
  const handleSong = () => {
    // const {thumbnailM,title,encodeId,artists,duration} = item
    dispatch(setRecentPlayedSong({encodeId,title,thumbnailM,artists,duration}))
    dispatch(setCurrSong(data?.encodeId))
    dispatch(setIsPlayAudio(true));
  };
  return (
    <SongItemStyle
      isRightSideBar
      className={isRightSideBar ? "sidebar-container" : ""}
    >
      <div
        className={
           isRightSideBar
            ? "container-item active sidebar"
            
            : "container-item"
        }
      >
        <div className="item-img">
          <img src={data?.thumbnailM} alt="" />
        </div>
        <div className="info">
          <div className="info-title" onClick={handleSong}>
            {data?.title}
          </div>
          <div className={ isRightSideBar ? "info-artist active" : "info-artist"}>
            {data?.artists?.map((item, index) => (
              <Link key={index} to={item.link}>
                {(index ? ", " : "") + item.name}{" "}
              </Link>
            ))}
          </div>
          <div
            className={isRightSideBar ? "info-release sidebar" : "info-release"}
          >
            {moment(data?.releaseDate * 1000).fromNow()}
          </div>
        </div>
      </div>
    </SongItemStyle>
  );
};

export default memo(SongItem);
