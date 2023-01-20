import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSongInfo } from "../../api/getSongInfoAPI";
import { getAudioApi } from "../../api/getAudioApi";
import format from "format-duration";

import { FaRandom } from "react-icons/fa";
import { TbPlaylist,  TbRepeat, TbRepeatOnce } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import{HiOutlinePause} from 'react-icons/hi2'
import { CiHeart } from "react-icons/ci";


import {
  
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoVolumeMediumOutline
} from "react-icons/io5";
import{IoIosPlay} from 'react-icons/io'
import {
  setCurrSong,
  setIsActiveRight,
  setIsActiveTab,
  setIsPlayAudio,
} from "../../stores/Slices/setIDSlice";
import { toast } from "react-toastify";
import SongWaitLoading from "../Loading/SongWaitLoading";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";
import {MdOutlineOndemandVideo
  } from 'react-icons/md'

import {GiMicrophone} from 'react-icons/gi'
import { setRecentSongData } from "../../stores/Slices/PlaylistSlice";


export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 0.9rem;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;
export const SongInfoPlayer = styled.div`
  width: 30%;
  display: flex;
  gap: 0.8rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  align-items: center;
  /* width: 100%; */
  max-height: 90px;
  .thumb {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    flex-shrink: 0;

    img {
      vertical-align: top;
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }
  .song-info {
    flex-shrink: 1;
    font-size: 0.9rem;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-x: scroll;
    .artist {
      font-size: 0.8rem;
      color: #333;
      overflow-y: scroll;
      height: 30px;
    }
    a:hover {
      text-decoration: underline;
      color: #644646;
    }
  }
  .song-btn-more {
    /* flex:1; */
    /* flex-shrink: 0; */
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
  }
`;
export const ActionPlayer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dedad1;
  .action-control {
    cursor: pointer;
    /* max-height: 50px; */
    display: flex;
    align-items: center;
    gap: 2rem;
    span {
      font-size: 1.6rem;
     
      &:hover {
        color: #644646;
      }
    }
    .bordered{
      margin-bottom: 10px;
      border-radius: 50%;
      width: 40px;
      height: 39px;
      border :0.5px solid grey;
      display: flex;
      justify-content: center;
      align-items: center;

    
    }
    .small {
      font-size: 1.8rem;
    }
    .small.shuffle {
      color: #644646;
    }
    .small.album {
      color: grey;
      user-select: none;
    }
    .small.repeat{
      color: #644646;
    }
    .smaller {
      font-size: 1.3rem;
    }
  }
  .prog-container {
    /* padding-bottom: 1rem; */
    width: 100%;
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
    .start,
    .end {
      font-size: 0.8rem;
      color: #333;
    }
    .progress-bar {
      position: relative;
      width: 88%;

      height: 3px;
      margin: auto;
      background-color: #c7c3bb;

      &:hover,
      &:hover .progress-bar-active {
        height: 5px;
      }
      &:hover .progress-bar-active::after {
        content: "";
        position: absolute;
        top: -0.2rem;
        right: -0.5rem;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #5a3f3f;
      }
      .progress-bar-active {
        transition: all 0.3s linear;
        position: absolute;
        /* width: unset; */
        height: 3px;
        left: 0;
        top: 0;
        /* right: 0; */
        margin: auto;
        background-color: #644646;

        &:hover {
        }
      }
    }
  }
`;
export const VolumeActionPlayer = styled.div`
  max-width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
  padding: 0 1rem;
  .icon{
    cursor: pointer;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon.active{
    background-color: #644646;
    color:white;


    border-radius: 2px;
  }
  .volume{
    display: flex;
    align-items: center;
    gap: 10px;

    input{
      border: none;
      outline: none;
      width: 70px;
    }
    
  }
`;


//interval  
let intervalID;
const Player = () => {
  const dispatch = useDispatch();


  //selectors
  const songID = useSelector((state) => state.setID.currSongID);
  const isPlayAudio = useSelector((state) => state.setID.isPlayAudio);
  const atAlbum = useSelector((state) => state.setID.atAlbum);
  const songLists = useSelector((state) => state.playlist.songData);
  const isActiveRight = useSelector(state => state.setID.isActiveRight)
  //state
  const [audioDom] = useState(new Audio());
  const [songData, setSongData] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [audioData, setAudioData] = useState([]);
  
  //loading state
  const [isLoadingSong,setIsLoadingSong] = useState(false)
//volume state
  const [volume,setVolume] = useState(70)
  //mute state

  //toggle controls state
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  //seconds state
  const [currSecond, setCurrSecond] = useState(0);

  //refs
  const progressRef = useRef(null);
  const trackRef = useRef(null);
  const backRef = useRef(null);


//get song info
  useEffect(() => {
    const fetchSong = async () => {
      setIsLoadingSong(true)
      audioDom.pause()
      const res = await getSongInfo(songID);
      setIsLoadingSong(false)
      setSongData(res?.data?.data);
      dispatch(setRecentSongData(res?.data?.data))
      const albumLink = res?.data?.data?.album?.link;
      const albumCutLink = albumLink?.split(".")[0];
      setAlbum(albumCutLink);
      const artist = res?.data?.data?.artists;
      const artistName = res?.data?.data?.artistsNames;
      setArtistName(artistName);
      setArtist(artist);
    };
    fetchSong();
  }, [songID]);
//get audio song
  useEffect(() => {
    const fetchAudio = async () => {
      const res = await getAudioApi(songID);

      const { data } = res?.data;
      if (res?.data.err === -1110) {
        audioDom.pause();
        toast.error("Nội dung này chỉ dành cho VIP ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearInterval(intervalID);
        progressRef.current.style.width = 0 + "px";
        audioDom.currentTime = 0;
        setCurrSecond(0);
        dispatch(setIsPlayAudio(false));
      } else {
        let keys =data && Object.keys(data);
        let audioInfo = data[keys[0]];
        setAudioData(audioInfo);
      }
    };
    fetchAudio();
  }, [songID]);
  //async play
  const play = async () => {
   await audioDom.play();
  };
  // useEffect(() =>{
  //   audioDom.pause()

  //   if(isPlayAudio) 
  //   {

  //       play();
  //       intervalID = setInterval(() => {
  //         let percent =
  //           Math.round((audioDom.currentTime * 10000) / songData?.duration) / 100;
  //         progressRef.current.style.width = percent + "%";
  //         setCurrSecond(Math.round(audioDom.currentTime));
  //         // console.log(percent)
  //       }, 100);
  //     }
  //    else{
  //      audioDom.pause()
  //      dispatch(setIsPlayAudio(false))
  //   }
  //    return () => {
  //       intervalID &&  clearInterval(intervalID)
  //    }
  // },[isPlayAudio])
  //handle play/
  useEffect(() => {
    intervalID && clearInterval(intervalID);

    audioDom.pause();
    audioDom.load();
    audioDom.src = audioData;
    if (isPlayAudio) {

      play();
      intervalID = setInterval(() => {
        let percent =
          Math.round((audioDom.currentTime * 10000) / songData?.duration) / 100;
        progressRef.current.style.width = percent + "%";
        setCurrSecond(Math.round(audioDom.currentTime));
        // console.log(percent)
      }, 100);
    
    }
    
  }, [audioDom, audioData]);
  useEffect(() => {
    audioDom.onended = function() {
      // console.log("The audio has ended");
      // console.log(isRepeat)
      if(isRepeat === 1){
        audioDom.play()
      }else{

        dispatch(setIsPlayAudio(false))
        handleNext()
      }
  }; 
  },[isRepeat]) 
  const handleTogglePlay = async () => {
    if (isPlayAudio) {
      audioDom.pause();
      dispatch(setIsPlayAudio(false));
      clearInterval(intervalID)
    } else {
      play();
      dispatch(setIsPlayAudio(true));
      intervalID = setInterval(() => {
        let percent =
          Math.round((audioDom.currentTime * 10000) / songData?.duration) / 100;
        progressRef.current.style.width = percent + "%";
        setCurrSecond(Math.round(audioDom.currentTime));
        // console.log(percent)
      }, 50);
      
    }
    // console.log(isPlayAudio)
  };

  const handleProgress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percentage =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    progressRef.current.style.width = percentage + "%";
    audioDom.currentTime = (percentage * songData?.duration) / 100;
    setCurrSecond(Math.round((percentage * songData?.duration) / 100));
  };

  const handleNext = () => {
    const audio = new Audio()
    audio.pause()
    let currentIndex;
    songLists?.forEach((item, index) => {
      if (item.encodeId === songID) {
        currentIndex = index;
      }
    });
    if(isShuffle){
      let randomIndex = Math.round(Math.random() * songLists.length) -1
      dispatch(setCurrSong(songLists[randomIndex].encodeId))
      dispatch(setIsPlayAudio(true));
      dispatch(setIsActiveTab(songLists[randomIndex]));
    }else {
      dispatch(setCurrSong(songLists[currentIndex + 1].encodeId));
      dispatch(setIsPlayAudio(true));
      dispatch(setIsActiveTab(songLists[currentIndex + 1]));
    }
  
  };
  const handleBack = () => {
    
      const audio = new Audio()
    audio.pause()
    
    let currentIndex;
    songLists?.forEach((item, index) => {
      if (item.encodeId === songID) {
        currentIndex = index;
      
      }
    });
   
    if(isShuffle){
      let randomIndex = Math.round(Math.random() * songLists.length) -1
      dispatch(setCurrSong(songLists[randomIndex].encodeId))
      dispatch(setIsPlayAudio(true));
      dispatch(setIsActiveTab(songLists[randomIndex]));
    }else{
      dispatch(setCurrSong(songLists[currentIndex - 1].encodeId));
      dispatch(setIsPlayAudio(true));
      dispatch(setIsActiveTab(songLists[currentIndex - 1]));
    }
  };

  const handleShuffle = () => {
    setIsShuffle(prev => !prev)
    // let randomIndex = Math.round(Math.random() * songLists.length) -1
    // dispatch(setCurrSong(songLists[randomIndex].encodeId))
    // dispatch(setIsPlayAudio(true));
    // dispatch(setIsActiveTab(songLists[randomIndex]));
    }
  
    const handleMute = () => {
        setVolume(prev => +prev === 0 ? 70 : 0)
    }
    useEffect(() => {
      audioDom.volume = volume / 100
    },[volume])
  return (
    <PlayerContainer>
      <SongInfoPlayer>
        <div className="thumb">
          <img src={songData?.thumbnailM} alt="" />
        </div>
        <div className="song-info">
          <div style={{ fontWeight: 600}}>
            <Link to={album}>{songData?.title}</Link>
          </div>
          <div
            className="artist"
            style={{ marginTop: "0.2rem", display: "inline-block" }}
          >
            {artist ? (
              artist?.map((item, i) => {
                return (
                  <div key={i}>
                    <Link to={item?.alias}>{item.name}</Link>
                  </div>
                );
              })
            ) : (
              <div>
                <span>{artistName}</span>
              </div>
            )}
          </div>
        </div>
        {songData && (
          <div className="song-btn-more">
            <div>
              <CiHeart />
            </div>
            <div>
              <FiMoreHorizontal />
            </div>
          </div>
        )}
      </SongInfoPlayer>
      <ActionPlayer>
        <div className="action-control">
          <span
            title="Bật phát ngẫu nhiên"
            className={isShuffle ? "small smaller shuffle" : "small smaller"}
            onClick={handleShuffle}
          >
            <FaRandom />
          </span>
          <span
            className={!atAlbum ? "small album" : "small"}
            onClick={handleBack}
            ref={backRef}
          >
            {" "}
            <IoPlaySkipBackCircleOutline />
          </span>
          <span title="Dừng/Chạy" className="bordered" onClick={() => handleTogglePlay()}>
            {isLoadingSong ? <SongWaitLoading /> : 
            isPlayAudio ? <HiOutlinePause width={24} height={14} /> : <IoIosPlay  width={14}/>}
          </span>
          <span className="small" onClick={handleNext}>
            {" "}
            <IoPlaySkipForwardCircleOutline />{" "}
          </span>
          <span
            title="Phát lại"
            className={isRepeat ? 'small smaller repeat' : 'small smaller'}
            onClick={() => setIsRepeat(prev => prev === 2 ? 0 : prev +1)}
          >
            {isRepeat === 1   ? <TbRepeatOnce title="Chạy lại 1 bài" /> : <TbRepeat title={!isRepeat ? 'Bật chạy lại' : 'chạy lại toàn bộ playlist'} />}
          </span>
        </div>
        <div className="prog-container">
          <div className="start">{format(currSecond * 1000)}</div>
          <div
            className="progress-bar"
            onClick={(e) => handleProgress(e)}
            ref={trackRef}
          >
            <div className="progress-bar-active" ref={progressRef}></div>
          </div>
          <div className="end">{format(songData?.duration * 1000)}</div>
        </div>
      </ActionPlayer>
      <VolumeActionPlayer>
        <div className="icon" onClick={() => alert('Tính năng đang phát triển')}>
          <MdOutlineOndemandVideo title="MV" />
        </div>
        <div className="icon" onClick={()=>alert('Tính năng đang phát triển')}>
          <GiMicrophone title="Karaoke/Lyrics"/>
        </div>
        <div className="volume">
          <div className="icon" onClick={handleMute}>{+volume >=50 ? <BsVolumeUp /> : +volume === 0 ? <BsVolumeMute /> : <IoVolumeMediumOutline />}</div>
          <div>
            <input type="range"  min={0} max={100} step={1}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
          /></div>
        </div>
        <div className={isActiveRight ? 'icon active' : 'icon'} onClick={() => dispatch(setIsActiveRight(!isActiveRight))}>
          <TbPlaylist  title="Nghe gần đây"/>
        </div>
      </VolumeActionPlayer>
    </PlayerContainer>
  );
};

export default Player;
