import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import format from "format-duration";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrSong, setIsPlayAudio } from "../../stores/Slices/setIDSlice";
import { numberFollow } from "../../components/customHook/fnNumber";
const SearchPage = styled.div`
  height: 420px;
  overflow-y: scroll;
`;
const Highlight = styled.section`
  .title {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  margin-top: 2rem;
  .card {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .card-content {
    display: flex;
    padding: 10px;
    width: 375px;
    @media screen and (max-width:1124px) {
      width: 100%;
    }
    gap: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
    img {
      width: 90px;
      height: 90px;
      object-fit: cover;
      border-radius: 8px;
    }
    .info {
      display: flex;
      flex-direction: column;
      /* gap: 0.4rem; */

      .tag {
        font-size: 0.8rem;
        color: grey;
      }
      .name {
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        margin-top: 5px;
      }
      .artist {
        /* font-weight: light; */
        font-size: 0.8rem;
        color: grey;
        cursor: pointer;
        margin-top: 5px;
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
          }
          .artist {
            font-size: 0.7rem;
            color: grey;
            margin-top: 5px;
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
const Playlist = styled.section`
  .playlist-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 2rem;
  }
  .playlist-item {
    /* display: flex; */
    width: 25%;
    flex-direction: column;
    .top {
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .title-playlist {
        max-width: 90%;
        overflow: hidden;
        line-height: 2rem;
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        font-weight: bold;
      }
      .artists-title {
        font-size: 0.9rem;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
      }
    }
  }
`;
const MusicVideo = styled.section`
  .mv-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .mv-lists {
    display: flex;
    gap: 1rem;
    .mv-item {
      width: 30%;
      .top {
        position: relative;
        .duration {
          position: absolute;
          bottom: 15px;
          right: 10px;
          background-color: black;
          color: #fff;
          font-size: 0.8rem;
        }
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .bottom {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        .bottom-left {
          img {
            width: 50px;
            height: 50px;
            border-radius: 999px;
          }
        }
        .bottom-right {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          .title-mv {
            font-weight: bold;
            overflow: hidden;
            /* line-height: 2rem; */
            max-height: 8rem;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
          }
          .artists-mv {
            font-size: 0.8rem;
            color: grey;
            overflow: hidden;
            line-height: 2rem;
            max-height: 8rem;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
          }
        }
      }
    }
  }
`;
const Artists = styled.div`
  .artist-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  .artists-list {
    display: flex;
    /* gap: 1rem; */
    /* flex-direction: column; */
    .artist-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-img {
        width: 80%;
        img {
          border-radius: 50%;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
      .item-info {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 50px;
        gap: 10px;

        .info-name {
          font-size: 1rem;
          font-weight: bold;
        }
        .info-follow {
          font-size: 0.82rem;
          color: grey;
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
const SearchAll = () => {
  const searchData = useSelector((state) => state.search.searchData);
  console.log(searchData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSong = (item) => {
    dispatch(setCurrSong(item.encodeId))
    dispatch(setIsPlayAudio(true))
  }
  return (
    <SearchPage>
    
      
      {searchData.length !== 0 && <>
      
       <Highlight>
          <div className="title">Nổi bật</div>
          <div className="card">
            {searchData?.artists?.slice(0, 1).map((item) => (
              <div className="card-content" key={item.id}>
                <img src={item.thumbnail} alt="none" />
                <div className="info">
                  <span className="tag">{item.name && "Nghệ sĩ"}</span>
                  {/* <span className="tag">{searchData?.top.title && "Bài hát"}</span> */}
                  <Link to={item.link} className="name">{item.name}</Link>
                  {/* <span className="name">
               {searchData?.top.name && searchData?.top.name}
             </span> */}
                  <span className="artist">
                    {numberFollow(+item.totalFollow)} quan tâm
                  </span>
                </div>
              </div>
            ))}
            {searchData?.songs?.slice(0, 2).map((item) => (
              <div className="card-content">
                <img src={item.thumbnail} alt="none" />
                <div className="info">
                  <span className="tag">
                    {item.title && "Bài hát"}
                  </span>
                  <span className="name" onClick={() => handleSong(item)}>{item.title}</span>
                  <span className="artist">
                    {item.artists?.map((item, index) => (
                      <Link to={item.link} key={index}>
                        {(index ? ", " : "") + item.name}
                      </Link>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Highlight>
  
        <Song>
          <div className="title-list">Bài hát</div>
          <div className="song-lists">
            {searchData &&
              searchData?.songs?.slice(0, 6).map((item) => {
                return (
                  <>
                    <div key={item.encodeId} className="song-item">
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
                      <div className="duration">
                        {format(+item.duration * 1000, { leading: true })}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </Song>
        <Playlist>
          <div className="playlist-title">Playlist/album</div>
          <div className="playlist-content">
            {searchData?.playlists?.slice(0, 5).map((item) => {
              return (
                <div
                  key={item.encodeId}
                  className="playlist-item"
                  onClick={() => navigate(item.link.split(".")[0])}
                >
                  <div className="top">
                    <img src={item.thumbnailM} alt="none" />
                  </div>
                  <div className="bottom">
                    <span className="title-playlist">{item.title}</span>
                    <span className="artists-title">
                      {item.artists?.map((item, index) => (
                        <Link to={item.link} key={index}>
                          {(index ? ", " : "") + item.name}
                        </Link>
                      ))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Playlist>
        <MusicVideo>
          <div className="mv-title">MV</div>
          <div className="mv-lists">
            {searchData?.videos?.slice(0, 3).map((item) => {
              return (
                <div className="mv-item" key={item.encodeId}>
                  <div className="top">
                    <img src={item.thumbnailM} alt="" />
                    <div className="duration">
                      {format(+item.duration * 1000, { leading: true })}
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="bottom-left">
                      <img src={item.artist?.thumbnail} />
                    </div>
                    <div className="bottom-right">
                      <span className="title-mv">{item.title}</span>
                      <span className="artists-mv">
                        {item.artists?.map((item, index) => (
                          <Link to={item.link} key={index}>
                            {(index ? ", " : "") + item.name}
                          </Link>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MusicVideo>
        <Artists>
          <div className="artist-title">Nghệ sĩ/OA</div>
          <div className="artists-list">
            {searchData?.artists?.map((item) => {
              return (
                <div className="artist-item" key={item.id}>
                  <div className="item-img">
                    <img src={item.thumbnailM} alt="none" />
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
       </>
       
      }
    
    </SearchPage>
  );
};

export default SearchAll;
