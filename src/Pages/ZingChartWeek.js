import React, { memo } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { NavLink, Outlet, useParams,Link } from "react-router-dom";
import styled from "styled-components";
import format from 'format-duration'
import { useDispatch, useSelector } from "react-redux";
import { setCurrSong, setIsPlayAudio, setRecentPlayedSong } from "../stores/Slices/setIDSlice";
import AlbumLoading from "../components/Loading/albumLoading";


const WeekChartPage = styled.section`
padding: 40px 59px;
/* height: 480px; */
::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
overflow-y: scroll;
@media screen and (max-width:880px) {
    height: 480px; 
  }
  @media screen and (max-height:500px) {
    height: 210px;
  }
/* @media screen and (max-width:880px) {
    height: 918px; 
  } */
@media screen and (min-width:880px) {
    height: 540px;  
  }
  @media screen and (min-height:1124px) {
    height: 968px;
  }
`
const WeekChartTop = styled.div`
    .title-week{
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 20px;
      color:#844D4D;
      display: flex;
      align-items: center;
      gap:1rem;
    }

    .nav-link{
      display: flex;
      gap:2rem;
      background-color: rgba(255,255,255,0.2);
      padding: 10px;
      border-radius: 8px;
      a {
        /* color:red; */
        font-weight: bold;
        font-size: 1.6rem;
        padding: 15px 0;
      }
      a.active{
        color:#844D4D;
        border-bottom: 2px solid #844D4D ;
        }
    }
`

const WeekChartMain = styled.div`
.song-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 3px;
    }

    /* Track */

    height: 90%;
    z-index: 9999;
  }
  .title {
    user-select: none;
    display: flex;
    font-weight: 700;
    color: #333;

    /* justify-content: space-around; */
    padding: 10px;
    .title-name {
      width: 40%;
    }
    .icon-title {
      /* padding: 10px; */

      width: 4%;
      cursor: pointer;
    }
    .title-album {
      flex: 1;
      -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
    }
    .time-title {
      width: 20%;
      text-align: center;
    }
  }
  .song-main.active {
    background-color: #d9d7d3;
  }
  .song-main {
    cursor: pointer;
    &:hover {
      background-color: #d9d7d3;
    }
    .number-order {
      padding: 0 10px;
      font-size: 1.4rem;
      font-weight: bold;
    }
    .number-order.first {
      color: #5d95d7;
    }
    .number-order.second {
      color: #33b99b;
    }
    .number-order.third {
      color: #de5453;
    }
    #order{
      padding: 0 10px;
      font-size: 1.4rem;
      font-weight: bold;
    }
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .name-song {
      width: 40%;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      span {
        font-size: 14px;
      }
      .song-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        .title-song-info {
          font-weight: 500;
          cursor: pointer;
          width: 80%;
          line-height: 1.2;
          -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
          &:hover {
            color: #644646;
          }
        }
        .artist {
          font-weight: 300;
          color: #333;
          font-size: 0.9rem;
          margin-top: 0.3rem;
          max-width: 70%;
          word-break: break-word;
          -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
          span {
          }
          a {
            &:hover {
              color: #644646;
              margin-left: 2px;
            }
          }
        }
      }
      .avatar-song {
        width: 50px;
        height: 50px;
        flex:none;
        img {
          border-radius: 5px;
          width: 100%;
        }
      }
    }
    .album-song {
      flex: 1;

      a {
        font-size: 0.9rem;
        font-weight: 300;
        color: #333;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        &:hover {
          color: #644646;
        }
      }
    }
    .duration-song {
      text-align: center;
      width: 20%;
      font-size: 0.9rem;
      font-weight: 300;
      user-select: none;
    }
  }
  .total-song {
    font-size: 0.8rem;
    user-select: none;
    margin-top: 1rem;

    padding: 0.6rem 1rem;
    border-top: 2px solid #dad8d5;
  }
`
const ZingChartWeek = ({ weekChart,isLoading }) => {
  // console.log(data)
  const {id} = useParams()
  const isActive = useSelector(state => state.setID.isActiveTab)
  const dispatch = useDispatch()
  const handleSong = (item) => {
    const {thumbnailM,title,encodeId,artists,duration} = item
    dispatch(setRecentPlayedSong({title,encodeId,artists,thumbnailM,duration}))
    dispatch(setCurrSong(item.encodeId));
    dispatch(setIsPlayAudio(true));
  };
  return (
    <WeekChartPage>
      <WeekChartTop>
        <div className="title-week"><span> Bảng xếp hạng tuần</span> <AiFillPlayCircle /></div>
        <div className="nav-link">
          {weekChart?.map((item, i) => {
            return (
              <NavLink
              key={item.chartId}
                to={item.link.split(".")[0]}
                className={({ isActive }) =>
                  isActive ? 'active' : undefined
                }
              >
                {" "}
                {item.country === "vn"
                  ? "Việt Nam"
                  : item.country === "us"
                  ? "US/UK"
                  : item.country === "korea"
                  ? "K-Pop"
                  : ""}
              </NavLink>
            );
          })}
        </div>
      </WeekChartTop>
      <WeekChartMain>
      <div className="song-container">
              {/* <div className="title">
                <div className="icon-title">
                  <MdSwapVert />
                </div>
                <div className="title-name">Bài hát</div>
                <div className="title-album">Album</div>
                <div className="time-title">Thời gian</div>
              </div> */}
              <div>
                {isLoading ? <AlbumLoading /> : weekChart?.find(item => item?.link?.includes(id))?.items.map((item, i) => {
                  const link = item.album?.link.split(".")[0];
                  const artistSong = item?.album?.artists;
                  return (
                    <div
                      key={item.encodeId}
                      className={`${
                        isActive?.encodeId == item.encodeId ? "song-main active" : "song-main"
                      } `}
                    >
                      
                      <div   className={
                      i === 0
                        ? "number-order first"
                        : i === 1
                        ? "number-order second"
                        : i === 2 && "number-order third"
                    }
                    id="order">
                          {i + 1}
                      </div>
                      <div className="name-song">
                        <div className="avatar-song">
                          <img src={item.thumbnailM} alt="" />
                        </div>
                        <div className="song-info">
                          <span
                            className="title-song-info"
                            onClick={() => handleSong(item)}
                          >
                            {item.title}
                          </span>
                          <span className="artist">
                            {artistSong === undefined
                              ? item?.artistsNames
                              : artistSong?.map((item, index) => {
                                  return artistSong.length > 1 ? (
                                    <span key={index} title={item.name}>
                                      <Link to={item.link}>
                                      { (index ? ', ' : '') + item.name }
                                      </Link>
                                    </span>
                                  ) : (
                                    <span key={i} title={item.name}>
                                      <Link to={item.link}>{item.name}</Link>
                                    </span>
                                  );
                                })}
                          </span>
                        </div>
                      </div>
                      <div className="album-song">
                        <Link to={link}>{item?.album?.title}</Link>
                      </div>
                      <div className="duration-song">
                        {format(Number(item.duration) * 1000, {
                          leading: true,
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
  
            </div>
      </WeekChartMain>
    </WeekChartPage>
  );
};

export default memo(ZingChartWeek);
