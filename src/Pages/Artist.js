import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";


import Tippy from "@tippyjs/react";
import format from "format-duration";

import { getArtistPage } from "../stores/Slices/ArtistSlice";
import zingAward from "../assets/svg/svgexport-15.jpg";
import award from "../assets/svg/svgexport-16.jpg";

import { numberFollow } from "../components/customHook/fnNumber";
import { IoCloseOutline } from "react-icons/io5";
import AlbumLoading from "../components/Loading/albumLoading";


import { setCurrSong, setIsPlayAudio, setRecentPlayedSong } from "../stores/Slices/setIDSlice";

import {ArtistPage,
  ArtistTop,
  ArtistContent,
  SpotMusic,
  Playlist,
  AlbumList,
  MusicVideo,
  ComboList,
  Familiar,
  YouLike,
  About} from '../styles/Artist/Artist.styled'

const Artist = () => {
  const { name } = useParams();
  // console.log(name)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await dispatch(getArtistPage({ name: name }));
      setIsLoading(false);
    };
    fetch();
  }, [name]);
  const artistData = useSelector((state) => state.artist.artist);

  const spotMusic = artistData?.sections?.find(
    (item) => item.title === "Bài hát nổi bật"
  );
  const singleEp = artistData?.sections?.find(
    (item) => item.title === "Single & EP"
  );
  const albumList = artistData?.sections?.find(
    (item) => item.title === "Album"
  );
  const mvList = artistData?.sections?.find((item) => item.title === "MV");
  const comboList = artistData?.sections?.find(
    (item) => item.title === "Tuyển tập"
  );
  const familiar = artistData?.sections?.find(
    (item) => item.title === "Xuất hiện trong"
  );
  const youLike = artistData?.sections?.find(
    (item) => item.title === "Bạn Có Thể Thích"
  );

  // console.log(artistData?.awards.length)

  const handleSongArtist = (item) => {
    // console.log(item.encodeId)
    const {thumbnailM,title,encodeId,artists,duration} = item
    dispatch(setRecentPlayedSong({title,encodeId,artists,thumbnailM,duration}))
    dispatch(setCurrSong(item.encodeId));
    dispatch(setIsPlayAudio(true));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(albumList)
  return isLoading ? (
    <AlbumLoading />
  ) : (
    <ArtistPage>
      <ArtistTop>
        <img
          src={artistData?.cover}
          className="img-cover"
          alt="loading"
          loading="lazy"
        />
        <div className="overlay"></div>
        <div className="top-info">
          <div className="top-info-left">
            <div className="name">{artistData?.name}</div>
            <div className="follow">
              <span className="follow-text">
                <NumericFormat
                  displayType="text"
                  value={artistData?.follow}
                  thousandSeparator=","
                />
                <span style={{ marginLeft: 7 }} className="care">
                  người quan tâm
                </span>
              </span>
              <button>Quan tâm</button>
            </div>
          </div>
          <div className="top-info-right">
            <img src={zingAward} alt="none" />
            <Tippy content={artistData?.awards?.map((item) => item).join(",")}>
              <img src={award} alt="" />
            </Tippy>
          </div>
        </div>
      </ArtistTop>
      <ArtistContent>
        <SpotMusic>
          <div className="spot-info">
            <div className="spot-left">
              <span className="title-album-hot">Album Mới Phát Hành</span>
              <div className="album-spot">
                {!albumList ? (
                  <div style={{ backgroundColor: "transparent" }}>
                    Hiện nghệ sĩ chưa phát hành album nào gần đây
                  </div>
                ) : (
                  albumList?.items?.slice(0, 1).map((item) => {
                    return (
                      <div
                        key={item.encodeId}
                        className="album-item"
                        onClick={() => navigate(item.link.split(".")[0])}
                      >
                        <div className="left">
                          <img src={item.thumbnailM} alt="none" />
                        </div>
                        <div className="right">
                          <span className="type-album">Single</span>

                          <span className="title-album">{item.title}</span>
                          <span className="artists-album">
                            {item.artists?.map((item, index) => (
                              <Link to={item.link} key={index}>
                                {(index ? ", " : "") + item.name}
                              </Link>
                            ))}
                          </span>
                          <span className="date">{item.releaseDate}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="spot-right">
              <div className="title-spot">
                <span>{spotMusic?.title}</span>
                <span
                  className="all"
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.8rem",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("bai-hat")}
                >
                  TẤT CẢ
                </span>
              </div>
              <div className="song-lists">
                {spotMusic &&
                  spotMusic?.items?.slice(0, 6).map((item) => {
                    // console.log(item.encodeId)
                    return (
                      <div key={item.encodeId} className="song-item">
                        <div className="left">
                          <img src={item.thumbnailM} alt="" />
                          <div className="info-left">
                            <span
                              className="title"
                              onClick={() => handleSongArtist(item)}
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
            </div>
          </div>
        </SpotMusic>
        <Playlist>
          <div className="playlist-title">{singleEp?.title}</div>
          <div className="playlist-content">
            {singleEp?.items?.slice(0, 5).map((item) => {
              return (
                <div key={item.encodeId} className="playlist-item">
                  <div className="top">
                    <img src={item.thumbnailM} alt="none" />
                  </div>
                  <div className="bottom">
                    <span
                      className="title-playlist"
                      onClick={() => navigate(item.link.split(".")[0])}
                    >
                      {item.title}
                    </span>
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
        <AlbumList>
          <div className="playlist-title">{albumList?.title}</div>
          <div className="playlist-content">
            {albumList?.items?.slice(0, 5).map((item) => {
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
        </AlbumList>
        <MusicVideo>
          <div className="mv-title">{mvList?.title}</div>
          <div className="mv-lists">
            {mvList?.items?.slice(0, 3).map((item) => {
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
                      <img src={item.artist?.thumbnail} alt="none" />
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
        <ComboList>
          <div className="playlist-title">{comboList?.title}</div>
          <div className="playlist-content">
            {comboList?.items?.map((item) => {
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
        </ComboList>
        <Familiar>
          <div className="playlist-title">{familiar?.title}</div>
          <div className="playlist-content">
            {familiar?.items?.map((item) => {
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
        </Familiar>
        <YouLike>
          <div className="artist-title">{youLike?.title}</div>
          <div className="artists-list">
            {youLike?.items.map((item) => {
              return (
                <div className="artist-item" key={item.id}>
                  <img src={item.thumbnail} alt="none" />
                  <div
                    className="item-img"
                    onClick={() => navigate(item.link)}
                  ></div>
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
        </YouLike>
        <About>
          <div className="about-title">Về {artistData?.name}</div>
          <div className="about-info">
            <div className="info-img">
              <img src={artistData?.thumbnailM} alt="none" />
            </div>
            <div className="info">
              <div className="description">
                <span className="bio">
                  {artistData?.biography?.slice(0, 345).replace(/<br>/g, "") +
                    "..."}
                </span>
                <span
                  onClick={() => setIsModal(!isModal)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  Xem thêm
                </span>
                <div className={isModal ? "overlay active" : "overlay"}></div>
                <div className="zm-modal">
                  <div className={isModal ? "modal active" : "modal"}>
                    <div className="modal-content">
                      <img src={artistData?.thumbnail} alt="" />
                      <span
                        style={{
                          marginTop: 20,
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      >
                        {artistData?.name}
                      </span>
                      <span className="bio-full">
                        {artistData?.biography?.replace(/<br>/g, "")}
                      </span>
                      <span
                        className="close"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsModal(!isModal)}
                      >
                        <IoCloseOutline />
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="award-artist">
                <span className="follow-award">
                  <NumericFormat
                    displayType="text"
                    value={artistData?.follow}
                    thousandSeparator=","
                  />
                  <span style={{ marginLeft: 7 }} className="care-award">
                    người quan tâm
                  </span>
                </span>
                <span className="number-length">
                  {artistData?.awards?.length ? artistData?.awards?.length : 0}
                  <span className="length-award">giải thưởng</span>
                </span>
                <img src={zingAward} alt="none" />
                <Tippy
                  content={artistData?.awards?.map((item) => item).join(",")}
                >
                  <img src={award} alt="" />
                </Tippy>
              </div>
            </div>
          </div>
        </About>
      </ArtistContent>
    </ArtistPage>
  );
};

export default Artist;
