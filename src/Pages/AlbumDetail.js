import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPlaylistData, setRecentLink, setRecentTitle } from "../stores/Slices/PlaylistSlice";

import { toast } from "react-toastify";

import { getDetailPlaylist } from "../api/getDetailPlaylistAPI";
import { NumericFormat } from "react-number-format";
import format from "format-duration";
import AlbumLoading from "../components/Loading/albumLoading";
import { BsFillPlayFill, BsPlayCircle } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdSwapVert } from "react-icons/md";
import {
  DetailPlaylistContainer,
  LeftContent,
  RightContent,
} from "../styles/DetaiPlaylist/styled.detailplaylist";
import { setAtAlbum, setCurrSong, setIsActiveTab, setIsPlayAudio, setRecentAlbumId, setRecentPlayedSong } from "../stores/Slices/setIDSlice";
import { CiMusicNote1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import AudioPlaying from "../components/Loading/AudioPlaying";

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const { title, id } = useParams();
  const isActive = useSelector(state => state.setID.isActiveTab)
  const isPlayAudio = useSelector(state => state.setID.isPlayAudio)
  const songLists = useSelector(state => state.playlist.songData)
  // console.log(recentLink)

  const currSongID = useSelector(state => state.setID.currSongID)
  const [thumbData, setThumbData] = useState([]);
  // console.log(thumbData)
  // const [songData, setSongData] = useState([]);
  const [songOuter, setSongOuter] = useState([]);

  const [artistData, setArtistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(setRecentAlbumId(id))

    const fetchDetailAlbumPlaylist = async () => {
      try {
        setIsLoading(true)
        const res = await getDetailPlaylist(id);

        const { data } = res?.data; //lay data banner
        // console.log(data);
        setThumbData(data);
        dispatch(setRecentTitle(data?.title))
        dispatch(setRecentLink(data?.link.split('.')[0]))
        const {
          data: { artists },
        } = res?.data; //lay data banner
        setArtistData(artists);
        const {
          data: { song },
        } = res?.data; //lay array song

        setSongOuter(song);
        // const {
        //   data: {
        //     song: { items },
        //   },
        // } = res?.data; //lay array song
        // setSongData(items);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailAlbumPlaylist();
     dispatch(getPlaylistData({id: id}))

  }, [id]);


  const handleSong = (item) => {
    const {thumbnailM,title,encodeId,artists,duration} = item
    dispatch(setRecentPlayedSong({title,encodeId,artists,thumbnailM,duration}))
    dispatch(setCurrSong(item?.encodeId));
    dispatch(setIsPlayAudio(true));

    dispatch(setIsActiveTab(item))
    dispatch(setAtAlbum(true))
  };

  const time = new Date(Number(thumbData?.contentLastUpdate * 1000));

  const year = time.getUTCFullYear();

  const month = time.getUTCMonth();


  const day = time.getUTCDate();

  // const year = date.getUTCFullYear();
  // console.log(year); // ??????? 2022

  // const month = date.getUTCMonth();
  useEffect(() => {
    const t = songLists?.find((item) => {
      return item.encodeId === currSongID
      
    })

    dispatch(setIsActiveTab(t))
  },[])
  const handleShuffle = () =>{
    const audio = new Audio()
    if(!isPlayAudio) {
      audio.pause()
      dispatch(setIsPlayAudio(true))
    } else {
    audio.pause()
    dispatch(setIsPlayAudio(false))
    }
    
    let randomIndex = Math.round(Math.random() * songLists?.length) -1
      dispatch(setCurrSong(songLists[randomIndex].encodeId))
      dispatch(setIsPlayAudio(true));
      dispatch(setIsActiveTab(songLists[randomIndex]));
  }
  const handleDisc = () => {
    // dispatch(setCurrSong(currSongID))
    
    dispatch(setIsPlayAudio(!isPlayAudio))
  

  }
  return (
    <DetailPlaylistContainer>
      {isLoading ? (
        <AlbumLoading />
      ) : (
        <>
          <LeftContent>
            <div className={isPlayAudio ? 'thumb-img active' : 'thumb-img'} onClick={handleDisc}>
              <img src={thumbData?.thumbnailM} alt="none" />
              <div className="playing">
                { isPlayAudio && <AudioPlaying />}
              </div>
              <div className="start-play">
                <BsPlayCircle />
              </div>
            </div>
            <div className="thumb-bottom">
              <div className="title">
                <span>{thumbData.title}</span>
              </div>
              <div className="update">
                <div>
                  C???p nh???t {day}/{month+1}/{year}
                  </div>
              </div>
              <div className="artist-content">
                {artistData?.map((item, i) => {
                  return (
                    <div className="name" key={i}>
                      <Link to={item.link}>{item.name}</Link>
                      <div className="follow">
                        <NumericFormat
                          displayType="text"
                          value={item.totalFollow}
                          thousandSeparator=","
                        />{" "}
                        theo d??i
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="thumb-bottom-btn">
                <div className="play-random-btn">
                  <button
                    style={{
                      padding: "15px 34px",
                      borderRadius: 20,
                      outline: "none",
                      border: "none",
                      // backgroundColor: "#5A3F3F",
                      color: "white",
                      fontWeight: 500,
                    }}
                    onClick={handleShuffle}
                  >
                    <BsFillPlayFill />
                    <span>Ph??t ng???u nhi??n</span>
                  </button>
                </div>
                <div className="more-btn">
                  <button>
                    <AiOutlineHeart />
                  </button>
                  <button>
                    <FiMoreHorizontal />
                  </button>
                </div>
              </div>
            </div>
          </LeftContent>
          <RightContent>
            <div className="description" style={{fontSize:'0.96rem',padding:'0 20px',textAlign:'justify'}}>{thumbData?.description}</div>
            <div className="song-container">
              <div className="title">
                <div className="icon-title">
                  <MdSwapVert />
                </div>
                <div className="title-name">B??i h??t</div>
                <div className="title-album">Album</div>
                <div className="time-title">Th???i gian</div>
              </div>
              <div>
                {songLists?.map((item, i) => {
                  const link = item.album?.link.split(".")[0];
                  const artistSong = item?.album?.artists;
                  return (
                    <div
                      key={item.encodeId}
                      className={`${
                        isActive?.encodeId == item.encodeId ? "song-main active" : "song-main"
                      } `}
                    >
                      
                      <div className="icon">
                        <CiMusicNote1 />
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
            <div className="total-song">
                {Number(songOuter?.total) + " b??i h??t"} -{" "}
                { format(songOuter?.totalDuration * 1000)+' gi??y'}
              </div>
          </RightContent>
        
        </>
      )}
    </DetailPlaylistContainer>
  );
};

export default AlbumDetail;
