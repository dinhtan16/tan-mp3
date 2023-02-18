import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import {TiFolderDelete} from 'react-icons/ti'
import { useDispatch, useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDetailPlaylist } from "../../api/getDetailPlaylistAPI";
import format from "format-duration";
import { setCurrSong, setIsActiveTab, setIsPlayAudio, setRecentPlayedSong } from "../../stores/Slices/setIDSlice";
import AlbumLoading from "../Loading/albumLoading";

const SideBarContainer = styled.div`
      background-color:  ${props => props.theme.player};
      height: calc(100vh - 85px);
      box-shadow: -4px -3px 6px -1px rgba(0,0,0,0.12);
      -webkit-box-shadow: -4px -3px 6px -1px rgba(0,0,0,0.12);
      -moz-box-shadow: -4px -3px 6px -1px rgba(0,0,0,0.12);
      .top-sidebar{
      height: 70px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .button-right{
        /* height: 100%; */
        background-color: ${props => props.theme.sidebar};
        padding: 5px 15px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap:1rem;
        button{
          cursor: pointer;
          background-color: transparent;
          border:none;
          outline: none;
          font-size: 0.79rem;
          color:${props => props.theme.fontColor};
          padding: 8px;
          width: 105px;
          &:hover{
            color:${props => props.theme.buttonBgr};
          }
        }
        button.active{
          background-color: rgba(255,255,255,0.5);
          border-radius: 999px;
          color:${props => props.theme.rightColor};
          font-weight: 500;
        }
      }
      .icon{
        background-color: #d9d7d4;
        /* padding: 20px; */
        width: 40px;height: 40px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .main-sidebar{
      padding: 0 8px;
    }
    .album-next{
        margin-top: 10px;
        padding: 10px;
        height: 90%;
      .album-from{
        margin: 8px 0;
        font-size: .9rem;
        display: flex;
        gap:5px;
        color:#78787d;
        .name-album{
          color: ${props => props.theme.fontColor};
          -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            width: 50%;
            cursor: pointer;
        }
      }
    }
    .album-list,.recent-played{
      /* height: 500px; */
      @media screen and (min-width:1240px) {
       height: 72%;  
      }
      @media screen and (max-width:1240px) {
        height: 70%;  
      }
      overflow-y: scroll;
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
    
    }
    .recent-played{
      height: 80%;
      @media screen and (min-height:1024px) {
        min-height: 980px;
      }
    }
`
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
        background-color: ${props => props.theme.hover};
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
            &:hover{
              color:#af8f8e;

            }
          }
          .artist {
            font-size: 0.7rem;
            color: grey;
            margin-top: 5px;
            a:hover{
              text-decoration: underline;
              color:#af8f8e;
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
const SideBarRight = () => {
  const [isActive,setIsActive] = useState(false)
  const [relevantAlbum,setRelevantAlbum] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const recentSongData= useSelector(state => state.playlist.recentSongData)
  const recentAlbumId= useSelector(state => state.setID.recentAlbumId)
  const recentPlayedSong = useSelector(state => state.setID.recentPlayedSong)
  const recentTitle = useSelector(state => state.playlist.recentTitlePlaylist)
  const recentLink = useSelector(state => state.playlist.recentLink)

  // console.log(relevantAlbum)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(recentSongData)
  // console.log(recentAlbumId)
  useEffect(() => {
      const fetch = async () => {
        setIsLoading(true)
          const res = await getDetailPlaylist(recentAlbumId)
          setRelevantAlbum(res?.data?.data?.song?.items)
          setIsLoading(false)

      }
      if(recentAlbumId) fetch()
  },[recentAlbumId])
  const handleSong = (item) => {
   
    dispatch(setCurrSong(item.encodeId))
    dispatch(setIsPlayAudio(true))
    dispatch(setIsActiveTab(true))
  }
  return (
    <SideBarContainer>
      <div className="top-sidebar">
        <div className="button-right">
          <button className={!isActive ? 'active' : ''}  onClick={() => setIsActive(!isActive)}>Danh sách phát</button>
          <button className={isActive ? 'active' : ''} onClick={() => setIsActive(!isActive)}> Nghe gần đây</button>
        </div>
        <div className="icon">
          <TiFolderDelete size={24}/>
        </div>
      </div>
    {  
    isActive ? (
      <div className="recent-played">
        <Song>
        {/* <div className="title-list">Bài hát</div> */}
        <div className="song-lists">
          {recentPlayedSong &&
            recentPlayedSong?.map((item) => {
              return (
                
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
                
              );
            })}
        </div>
      </Song>
      </div>
    )
    : <>
      <div className="main-sidebar">
          <SongItem data={recentSongData && recentSongData} isRightSideBar />
        </div>
        <div className="album-next">
        <div className="album-from">
            Từ playlist <span className="name-album" onClick={() => navigate(recentSongData?.album?.link.split('.')[0])}>{recentSongData?.album?.title}</span>
          </div>
          <h4>Tiếp theo</h4>
          <div className="album-from">
           Playlist <span className="name-album" onClick={() => navigate(recentLink)}>{recentTitle && recentTitle}</span>
          </div>
          <div className="album-list">
          <Song>
            {/* <div className="title-list">Bài hát</div> */}
            <div className="song-lists">
              {isLoading ? <AlbumLoading /> :
                relevantAlbum?.map((item) => {
                  return (
                    
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
                    
                  );
                })}
            </div>
          </Song>
          </div>
        </div>
  </>}
    </SideBarContainer>
  )
};

export default memo(SideBarRight);
