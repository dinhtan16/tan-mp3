import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSongInfo } from "../../api/getSongInfoAPI";
import { getAudioApi } from "../../api/getAudioApi";
import moment from "moment";
import format from "format-duration";
import { FaRandom } from "react-icons/fa";
import { TbRepeat, TbRepeatOnce } from "react-icons/tb";
import { FiMoreHorizontal, FiPauseCircle } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import {
  IoPlayCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
} from "react-icons/io5";
import { setCurrAudio, setIsPlayAudio } from "../../stores/Slices/setIDSlice";
import { toast } from "react-toastify";
export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 0.9rem;
  justify-content: center;
  width: 100%;
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
    min-width: 95px;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .artist {
      font-size: 0.8rem;
      color: #333;
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
    max-height: 50px;
    display: flex;
    align-items: center;
    gap: 2rem;
    span {
      font-size: 3rem;

      &:hover {
        color: #644646;
      }
    }
    .small {
      font-size: 1.8rem;
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
        height: 2px;
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
  width: 30%;
`;

let intervalID;
const Player = () => {
  const [audioDom, setAudioDom] = useState(new Audio());
  const dispatch = useDispatch();
  const song = useSelector((state) => state.setID.currSongID);
  const isPlayAudio = useSelector((state) => state.setID.isPlayAudio);

  const [songData, setSongData] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [audioData, setAudioData] = useState([]);
  //toggle controls
  const [isRepeat, setIsRepeat] = useState(false);
  //seconds
  const [currSecond, setCurrSecond] = useState(0);

  const progressRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchSong = async () => {
      const res = await getSongInfo(song);
      setSongData(res?.data?.data);
      const albumLink = res.data.data.album?.link;
      const albumCutLink = albumLink?.split(".")[0];
      setAlbum(albumCutLink);
      const artist = res.data.data.artists;
      setArtist(artist);
    
    };
    fetchSong();
  }, [song]);

  useEffect(() => {
    const fetchAudio = async () => {
      const res = await getAudioApi(song);

      const { data } = res?.data;
      if (res?.data.err === -1110) {
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
        dispatch(setIsPlayAudio(false));
      } else {
        let keys = Object.keys(data);
        let audioInfo = data[keys[0]];
        setAudioData(audioInfo);
      }
    };
    fetchAudio();
  }, [song]);

  const play = async () => {
    await audioDom.play();
  };

  useEffect(() => {
    intervalID && clearInterval(intervalID);

    audioDom.pause();

    audioDom.load();
    audioDom.src = audioData;
    if (isPlayAudio) {
      play()
      intervalID = setInterval(() => {
        let percent =
          Math.round((audioDom.currentTime * 10000) / songData?.duration) / 100;
        progressRef.current.style.width = percent + "%";
        setCurrSecond(Math.round(audioDom.currentTime));
        console.log(percent)
      }, 100);
    };
  }, [audioDom, audioData]);
  const handleTogglePlay = async () => {
    if (isPlayAudio) {
      audioDom.pause();
      dispatch(setIsPlayAudio(false));
    } else {
      play();
      dispatch(setIsPlayAudio(true));
    }
  };
  //progress bar
  // useEffect(() => {
  //   if (isPlayAudio) {
     
  //   } else {
  //     // console.log(intervalID)
  //   }
  // }, [ isPlayAudio]);
  const handleProgress = (e) => {
      const trackRect = trackRef.current.getBoundingClientRect()
      const percentage = Math.round((e.clientX - trackRect.left)* 10000 / trackRect.width) / 100
      progressRef.current.style.width = percentage + "%";
      audioDom.currentTime = percentage * songData?.duration / 100
      setCurrSecond(Math.round(percentage * songData?.duration / 100) )
    }
  return (
    <PlayerContainer>
      <SongInfoPlayer>
        <div className="thumb">
          <img src={songData?.thumbnailM} alt="" />
        </div>
        <div className="song-info">
          <div style={{ fontWeight: 600 }}>
            <Link to={album}>{songData?.title}</Link>
          </div>
          <div
            className="artist"
            style={{ marginTop: "0.2rem", display: "inline-block" }}
          >
            {artist.map((item, i) => {
              return (
                <div key={i}>
                  <Link to={item?.alias}>{item.name}</Link>
                </div>
              );
            })}
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
          <span title="Bật phát ngẫu nhiên" className="small smaller">
            <FaRandom />
          </span>
          <span className="small">
            {" "}
            <IoPlaySkipBackCircleOutline />
          </span>
          <span title="Dừng/Chạy" onClick={() => handleTogglePlay()}>
            {isPlayAudio ? <FiPauseCircle /> : <IoPlayCircleOutline />}{" "}
          </span>
          <span className="small">
            {" "}
            <IoPlaySkipForwardCircleOutline />{" "}
          </span>
          <span
            title="Phát lại"
            className="small smaller"
            onClick={() => setIsRepeat(!isRepeat)}
          >
            {isRepeat ? <TbRepeatOnce /> : <TbRepeat />}
          </span>
        </div>
        <div className="prog-container">
          <div className="start">{format(currSecond * 1000)}</div>
          <div className="progress-bar" onClick={(e) => handleProgress(e)} ref={trackRef}>
            <div className="progress-bar-active" ref={progressRef}></div>
          </div>
          <div className="end">{format(songData?.duration * 1000)}</div>
        </div>
      </ActionPlayer>
      <VolumeActionPlayer>Player</VolumeActionPlayer>
    </PlayerContainer>
  );
};

export default Player;
