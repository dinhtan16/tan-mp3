import React, { memo, useState } from "react";
import styled from "styled-components";
import {TiFolderDelete} from 'react-icons/ti'
import { useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";
import { Navigate, useNavigate } from "react-router-dom";


const SideBarContainer = styled.div`
      background-color: #E5E3DF;
      height: calc(100vh - 90px);
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
        background-color: #d9d7d4;
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
          color:#78787d;
          padding: 8px;
          width: 105px;
          &:hover{
            color:#966868;
          }
        }
        button.active{
          background-color: rgba(255,255,255,0.5);
          border-radius: 999px;
          color:#966868;
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
      .album-from{
        margin-top: 5px;
        font-size: .9rem;
        display: flex;
        gap:5px;
        color:#78787d;
        .name-album{
          color:#966868;
          -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            cursor: pointer;
        }
      }
    }
`
const SideBarRight = () => {
  const [isActive,setIsActive] = useState(false)
  const recentSongData= useSelector(state => state.playlist.recentSongData)
  const navigate = useNavigate()
  // console.log(recentSongData)
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
      <div className="main-sidebar">
        <SongItem data={recentSongData && recentSongData} isRightSideBar />
      </div>
      <div className="album-next">
        <h4>Tiếp theo</h4>
        <div className="album-from">
          Từ playlist <span className="name-album" onClick={() => navigate(recentSongData?.album?.link.split('.')[0])}>{recentSongData?.album?.title}</span>
        </div>
      </div>
    </SideBarContainer>
  )
};

export default memo(SideBarRight);
