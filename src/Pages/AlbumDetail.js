import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { getDetailPlaylist } from "../api/getDetailPlaylistAPI";
import { NumericFormat } from "react-number-format";
import format from "format-duration";
import AlbumLoading from "../components/Loading/albumLoading";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdSwapVert } from "react-icons/md";
import {
  DetailPlaylistContainer,
  LeftContent,
  RightContent,
} from "../styles/DetaiPlaylist/styled.detailplaylist";
import { setCurrSong, setIsPlayAudio } from "../stores/Slices/setIDSlice";
import { CiMusicNote1 } from "react-icons/ci";

// import { useSelector } from "react-redux";

const AlbumDetail = () => {
  const dispatch = useDispatch();
  const { title, id } = useParams();
  const [thumbData, setThumbData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [songOuter, setSongOuter] = useState([]);

  const [artistData, setArtistData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [active, setActive] = useState(null);

  // console.log(thumbData);
  useEffect(() => {
    setIsLoading(false); //TODO:
    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => {
      clearTimeout();
    };
  }, []);
  useEffect(() => {
    const fetchDetailAlbumPlaylist = async () => {
      try {
        const res = await getDetailPlaylist(id);
        const { data } = res?.data; //lay data banner
        // console.log(data);
        setThumbData(data);
        const {
          data: { artists },
        } = res?.data; //lay data banner
        setArtistData(artists);
        const {
          data: { song },
        } = res?.data; //lay array song

        setSongOuter(song);
        const {
          data: {
            song: { items },
          },
        } = res?.data; //lay array song
        setSongData(items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailAlbumPlaylist();
  }, [id]);

  const handleSong = (item) => {
    dispatch(setCurrSong(item?.encodeId));
    dispatch(setIsPlayAudio(true));

    setActive(item);
  };

  const time = new Date(Number(thumbData?.contentLastUpdate * 1000));

  const year = time.getUTCFullYear();

  const month = time.getMonth();

  const day = time.getUTCDate();

  // const year = date.getUTCFullYear();
  // console.log(year); // 👉️ 2022

  // const month = date.getUTCMonth();

  return (
    <DetailPlaylistContainer>
      {isLoading ? (
        <AlbumLoading />
      ) : (
        <>
          <LeftContent>
            <div className="thumb-img">
              <img src={thumbData?.thumbnailM} alt="none" />
            </div>
            <div className="thumb-bottom">
              <div className="title">
                <span>{thumbData.title}</span>
              </div>
              <div className="update">
                <div>
                  Cập nhật {day}/{month === 11 && "12"}/{year}
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
                        theo dõi
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
                      backgroundColor: "#5A3F3F",
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    <BsFillPlayFill />
                    <span>Phát ngẫu nhiên</span>
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
            <div className="description">{thumbData?.description}</div>
            <div className="song-container">
              <div className="title">
                <div className="icon-title">
                  <MdSwapVert />
                </div>
                <div className="title-name">Bài hát</div>
                <div className="title-album">Album</div>
                <div className="time-title">Thời gian</div>
              </div>
              <div>
                {songData.map((item, i) => {
                  const link = item.album?.link.split(".")[0];
                  const artistSong = item?.album?.artists;
                  // const firstArtist =  artistSong?.slice(1,artistSong.length -1 ).map((item) => item.name).join()

                  // const lastArtist = artistSong
                  // ?.slice(-1)
                  // .map((item) => item.name)
                  // .join("");
                  // const name = artistSong?.filter(data => data.name !== lastArtist)
                  // console.log(name)
                  return (
                    <div
                      key={item.encodeId}
                      className={`${
                        active == item ? "song-main active" : "song-main"
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
                              : artistSong?.map((item, i) => {
                                  return artistSong.length > 1 ? (
                                    <span key={i} title={item.name}>
                                      <Link to={item.link}>
                                        {item.name + ","}
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
              <div className="total-song">
                {Number(songOuter?.total) + " bài hát"} -{" "}
                {format(songOuter?.totalDuration * 1000) + " giây"}
              </div>
            </div>
          </RightContent>
        </>
      )}
    </DetailPlaylistContainer>
  );
};

export default AlbumDetail;
