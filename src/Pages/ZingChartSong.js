import React, { memo, useEffect, useState } from "react";
import Chart from "../components/Slider/Chart";
import { getChartHome } from "../api/getChartHome";
import format from "format-duration";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrSong, setIsPlayAudio, setRecentPlayedSong } from "../stores/Slices/setIDSlice";
import AlbumLoading from "../components/Loading/albumLoading";

const ZingChart = styled.div`
  height: 500px;
  overflow-y: scroll;
  padding: 0 59px;
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
  @media screen and (max-height: 500px) {
    height: 210px;
  }
  @media screen and (min-height: 1124px) {
    height: 968px;
  }
  .more-btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      cursor: pointer;
      font-weight: bold;
      border: 1px solid #774545;
      padding: 8px 20px;
      background-color: transparent;
      border-radius: 20px;
      color: #b29d9b;
      outline: none;
      &:hover {
        background-color: #b29d9b;
        color: white;
      }
    }
  }
  .weekChart {
    margin-top: 20px;
      h1{
        color:#844D4D;
      }
    .weekchart-grid {
      display: flex;
      margin-top: 20px;
      gap: 1rem;
      flex-wrap: wrap;
      .item-weekchart {
        flex: 1 ;

        @media screen and (max-width:1124px) {
            width: 50%;
        }
        /* min-width: 30%; */
        background-color: rgba(255,255,255,0.5);
        border-radius: 8px;
        padding:20px;
        h2{
        color:#844D4D;

        }
        .rank-item{
            /* padding: 5px; */
            .song-lists {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              align-items: center;
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
              #order {
                padding: 0 10px;
                font-size: 1.4rem;
                font-weight: bold;
                width: 60px;
              }
              cursor: pointer;
              .song-item {
                width: 100%;
                @media screen and (max-width: 1124px) {
                  width: 100%;
                }
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #d9d7d3;
                &:hover {
                  background-color: #d9d7d3;
                }
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 8px;
                }
                .left {
                  display: flex;
                  gap: 10px;
                  width: 100%;
                  .info-left {
                    display: flex;
                    flex-direction: column;
                    .title {
                      /**Major Properties**/
                      font-size: 0.8rem;
                      font-weight: bold;
                      -webkit-box-orient: vertical;
                      display: block;
                      display: -webkit-box;
                      overflow: hidden !important;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 1;
                      &:hover {
                        color: #af8f8e;
                      }
                    }
                    .artist {
                      font-size: 0.7rem;
                      color: grey;
                      margin-top: 5px;
                      a:hover {
                        text-decoration: underline;
                        color: #af8f8e;
                      }
                    }
                  }
                }
                .duration {
                  font-size: 0.8rem;
                  color: grey;
                }
              }
            }
                  }
                }
              }
            }
`;
const Song = styled.section`
  .title-list {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .song-lists {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
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
    #order {
      padding: 0 10px;
      font-size: 1.4rem;
      font-weight: bold;
      width: 60px;
    }
    cursor: pointer;
    .song-item {
      width: 100%;
      @media screen and (max-width: 1124px) {
        width: 100%;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #d9d7d3;
      &:hover {
        background-color: #d9d7d3;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }
      .left {
        display: flex;
        gap: 10px;
        width: 100%;
        .info-left {
          display: flex;
          flex-direction: column;
          .title {
            /**Major Properties**/
            font-size: 0.8rem;
            font-weight: bold;
            &:hover {
              color: #af8f8e;
            }
          }
          .artist {
            font-size: 0.7rem;
            color: grey;
            margin-top: 5px;
            a:hover {
              text-decoration: underline;
              color: #af8f8e;
            }
          }
        }
      }
      .duration {
        font-size: 0.8rem;
        color: grey;
      }
    }
  }
`;
const ZingChartSong = () => {
  const [songChartData, setSongChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [songDataCut, setSongDataCut] = useState([]);
  const [isShowFull, setIsShowFull] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await getChartHome();

      setSongChartData(res?.data?.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!isShowFull) {
      setSongDataCut(
        songChartData?.RTChart?.items?.filter((item, i) => i < 10)
      );
    } else {
      setSongDataCut(songChartData?.RTChart?.items);
    }
  }, [isShowFull,songChartData]);

  const handleSong = (item) => {
    const {thumbnailM,title,encodeId,artists,duration} = item
    dispatch(setRecentPlayedSong({title,encodeId,artists,thumbnailM,duration}))
    dispatch(setCurrSong(item.encodeId));
    dispatch(setIsPlayAudio(true));
  };
  // console.log(
  //   songChartData?.weekChart
  // );
  return isLoading ? (
    <AlbumLoading />
  ) : (
    <ZingChart>
      <Chart disableItem="display:none" />
      <Song>
        <div className="title-list">Bài hát</div>
        <div className="song-lists">
          {songDataCut?.map((item, i) => {
            return (
              <>
                <div key={item.encodeId} className="song-item">
                  <div
                    className={
                      i === 0
                        ? "number-order first"
                        : i === 1
                        ? "number-order second"
                        : i === 2 && "number-order third"
                    }
                    id="order"
                  >
                    {i + 1}
                  </div>
                  <div className="left">
                    <img src={item.thumbnailM} alt="" />
                    <div className="info-left">
                      <span className="title" onClick={() => handleSong(item)}>
                        {item.title}
                      </span>
                      <span className="artist">
                        {item.artists?.map((item, index) => (
                          <Link to={item.link} key={index}>
                            {(index ? ", " : "") + item.name}
                          </Link>
                        ))}
                      </span>
                    </div>
                  </div>
                  {/* <div className="album-song">
                        <Link to={item.link.split('.')[0]}>{item?.album?.title}</Link>
                      </div> */}
                  <div className="duration">
                    {format(+item.duration * 1000, { leading: true })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Song>
      <div className="more-btn">
        <button onClick={() => setIsShowFull((prev) => !prev)}>
          {!isShowFull ? "Xem top 100" : "Xem top 10"}
        </button>
      </div>
      <div className="weekChart">
        <h1>Bảng xếp hàng tuần</h1>
        <div className="weekchart-grid">
          {songChartData?.weekChart &&
            Object.entries(songChartData?.weekChart)?.map((item, i) => {
              // console.log(item[1].link.split('.')[0])
              return (
                <div className="item-weekchart" key={i}>
                  <h2>
                    {item[0] === "vn"
                      ? "Việt Nam"
                      : item[0] === "us"
                      ? "US/UK"
                      : item[0] === "korea"
                      ? "K-Pop"
                      : ""}
                  </h2>
                  <div className="rank-item">
                      <div className="song-lists">
                        {item[1].items.slice(0,5).map((item, i) => {
                          return (
                        <>
                              
                                <div key={item.encodeId} className="song-item">
                                  <div
                                    className={
                                      i === 0
                                        ? "number-order first"
                                        : i === 1
                                        ? "number-order second"
                                        : i === 2 && "number-order third"
                                    }
                                    id="order"
                                  >
                                    {i + 1}
                                  </div>
                                  <div className="left">
                                    <img src={item.thumbnailM} alt="" />
                                    <div className="info-left">
                                      <span
                                        className="title"
                                        onClick={() => handleSong(item)}
                                      >
                                        {item.title}
                                      </span>
                                      <span className="artist">
                                        {item.artists?.map((item, index) => (
                                          <Link to={item.link} key={index}>
                                            {(index ? ", " : "") + item.name}
                                          </Link>
                                        ))}
                                      </span>
                                    </div>
                                  </div>
                                  {/* <div className="album-song">
                          <Link to={item.link.split('.')[0]}>{item?.album?.title}</Link>
                        </div> */}
                                  <div className="duration">
                                    {format(+item.duration * 1000, {
                                      leading: true,
                                    })}
                                  </div>
                                </div>
                              </>
                               
                        
                          )
                        })}
                      </div>
                      <div className="more-btn">
                               <button onClick={() => navigate(item[1].link.split('.')[0])}>
                                 Xem thêm
                               </button>
                             </div>
                      </div>
                </div>
              );
            })}
        </div>
      </div>
    </ZingChart>
  );
};

export default memo(ZingChartSong);
