import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";

import styled from "styled-components";
import { getArtistPage } from "../stores/Slices/ArtistSlice";
import zingAward from '../assets/svg/svgexport-15.jpg'
import award from '../assets/svg/svgexport-16.jpg'
import format from "format-duration";

import { numberFollow } from "../components/customHook/fnNumber";
import {IoCloseOutline} from 'react-icons/io5'

import AlbumLoading from '../components/Loading/albumLoading'
import {setCurrSong, setIsPlayAudio} from '../stores/Slices/setIDSlice'

const ArtistPage = styled.div`
height: 500px;
overflow-y: scroll;
overflow-x: hidden;
`;
const ArtistTop = styled.section`
position: relative;
    width: 100%;
    .img-cover{
      width: 100%;
    }
    .top-info{
      width: 100%;
      padding: 10px 59px;
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      color: white;
      .top-info-left{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .name{
          font-size: 4rem;
          background-color: rgba(0,0,0,0.17);
          width: fit-content;
          font-weight: bold;
        }
        .follow{
          font-size: 0.9rem;
          color:#fff;
        

          display: flex;
          align-items: center;
          gap: 2rem;
          .follow-text{
            background-color: rgba(0,0,0,0.3);
            /* width: fit-content; */
            min-width: 50px;

          }
          .care{
            /* background-color: rgba(0,0,0,0.2); */
          width: fit-content;
          }
          button{
            cursor: pointer;
            padding: 5px 20px;
            border-radius: 999px;
            background-color: rgba(0,0,0,0.4);
            outline: none;
            border: 1px solid #fff;
            color: #fff;
            /* font-weight: bold; */
          }
        }
      }
      .top-info-right{
        display: flex;
        gap:1rem;
        align-items: center;
      }
    }
`;
const ArtistContent = styled.section`
        padding: 0 59px;
      `;

const SpotMusic = styled.section`
margin-top: 30px;
.title-spot{
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span{
    font-weight: light;
  }
}
.song-lists {
    display: flex;
    /* gap: 10px; */
    flex-wrap: wrap;
    cursor: pointer;
    .song-item {
      width: 50%;
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
          width: 100%;
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
            width: 70%;
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
  }`
  const Playlist = styled.section`
  .playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
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
        &:hover{
          color: #646464;
        }
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
const AlbumList = styled.div`
.playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
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
        &:hover{
          color: #646464;
        }
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
`
const MusicVideo = styled.section`
  .mv-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .mv-lists {
    display: flex;
    gap: 1rem;
    .mv-item {
      width: 35%;
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
const ComboList = styled.section`
.playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
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
        &:hover{
          color: #646464;
        }
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
`
const Familiar = styled.section`
.playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
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
        &:hover{
          color: #646464;
        }
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
`
const YouLike = styled.div`
  .artist-title {
    font-size: 1.2rem;
    margin-top: 5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .artists-list {
    display: flex;
    gap: 1rem;
    /* flex-direction: column; */
    flex-wrap: wrap;
    .artist-item {
      margin-top: 20px;
      width: 18%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
            overflow: hidden;
            transition: all .3s ease;

          border-radius: 50%;
          width: 100%;
          /* height: auto; */
          object-fit: cover;
        }
      /* .item-img {
          width: 25%;
          border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        &:hover img {
            transform: scale(1.09);
        }
        &:hover{
            transform: scale(1);
        } */
      
      }
      .item-info {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 50px;
        gap: 10px;

        .info-name {
          font-size: 1rem;
          font-weight: bold;
          text-align: center;
          &:hover{
            color:#644646;
          }
        }
        .info-follow {
          font-size: 0.82rem;
          color: grey;
          height: 30px;
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
  
`;
const About= styled.section`
.about-title{
  font-weight: 700;
  margin-top: 2rem;
  font-size: 1.4rem;
}
.about-info{
  margin-top: 20px;
display: flex;
gap: 1rem;
.info-img{
  width: 40%;
    img{
      width: 100%;
      object-fit: cover;
      max-height: 320px;
      border-radius: 10px;
    }
}
  .info{
    flex:1;
    .description{

      .bio{
        line-height: 1.8;
        color: #828281;
        font-size: 0.9rem;
      }
      .overlay{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.3);
        z-index: 999;
        display: none;
      }
      .overlay.active{
        display: block;
      }
      .zm-modal{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 1080;
        /* background-color: var(--dark-alpha-80); */
        display: flex;
        justify-content: center;
        align-items: center;
        /* display: none; */

        /* &:active{
          display: block;
        } */
        .modal.active{
          display: block;

        }
        .modal{
          position: fixed;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5.4px);
          -webkit-backdrop-filter: blur(5.4px);
          border: 1px solid rgba(255, 255, 255, 0.34);
          max-width: 500px;
          display: none;
         
          .modal-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            img{
              margin-top: 20px;
              width: 30%;
              border-radius: 999px;

            }
            .bio-full{
              margin-top: 20px;
              width: 60%;
              text-align: justify;
              line-height: 1.5;
              overflow-y: scroll;
              height: 250px;
              color:#999898;
            }
            .close{
              position: absolute;
              top: 20px;
              right: 30px;
              font-size: 1.7rem;
            }
          }
        }
      }

    }
  
  }
}
`
const Artist = () => {
  const { name } = useParams();
  // console.log(name)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isModal,setIsModal] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      await dispatch(getArtistPage({ name: name }));
      setIsLoading(false)
    };
    fetch();
  }, [name]);
  const artistData = useSelector((state) => state.artist.artist);

  const spotMusic = artistData?.sections?.find(item => item.title === "Bài hát nổi bật") 
  const singleEp = artistData?.sections?.find(item => item.title === "Single & EP")
  const albumList = artistData?.sections?.find(item => item.title === "Album")
  const mvList = artistData?.sections?.find(item => item.title === "MV")
  const comboList = artistData?.sections?.find(item => item.title === "Tuyển tập")
  const familiar = artistData?.sections?.find(item => item.title === "Xuất hiện trong")
  const youLike = artistData?.sections?.find(item => item.title === "Bạn Có Thể Thích")
  

  const handleSongArtist = (item) => {
    console.log(item.encodeId)
    dispatch(setCurrSong(item))
    dispatch(setIsPlayAudio(true))
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(albumList)
  return (
    isLoading ? <AlbumLoading />  :  <ArtistPage>
      <ArtistTop>
        <img src={artistData?.cover} className='img-cover' alt="loading" loading="lazy" />
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
                <span style={{marginLeft:7}} className='care'>người quan tâm</span>
             </span>
              <button>Quan tâm</button>
            </div>
          </div>
          <div className="top-info-right">
            <img src={zingAward} alt="none" />
            <Tippy content={artistData?.awards?.map(item => item).join(',')}>
            <img src={award} alt="" />
        
           </Tippy>
          </div>
        </div>
      </ArtistTop>
      <ArtistContent>
        <SpotMusic>
          <div className="title-spot">
            <span>{spotMusic?.title}</span> 
            <span className="all" style={{fontWeight:'normal',fontSize:'0.8rem',textDecoration:'underline'}}
            onClick={() => navigate('bai-hat')}
            >TẤT CẢ</span></div>
          <div className="song-lists">
            {spotMusic &&
              spotMusic?.items?.slice(0, 6).map((item) => {
                console.log(item.encodeId)
                return (
                  <>
                    <div key={item.encodeId} className="song-item">
                      <div className="left">
                        <img src={item.thumbnailM} alt="" />
                        <div className="info-left">
                          <span
                            className="title"
                            onClick={() => handleSongArtist(item.encodeId)}
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
        </SpotMusic>
        <Playlist>
          <div className="playlist-title">{singleEp?.title}</div>
          <div className="playlist-content">
            {singleEp?.items?.slice(0, 5).map((item) => {
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
        <AlbumList>
          <div className="playlist-title">{albumList?.title}</div>
          <div className="playlist-content">
            {albumList?.items?.slice(0,5).map((item) => {
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
                      <img src={item.artist?.thumbnail} alt='none' />
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
            <div className="item-img" onClick={() => navigate(item.link)}>
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
        </YouLike>
        <About>
        <div className="about-title">Về {artistData?.name}</div>
        <div className="about-info">
          <div className="info-img"><img src={artistData?.thumbnailM} alt="none" /></div>
          <div className="info">
            <div className="description">
              <span className="bio">
                {
                  artistData?.biography?.slice(0,345).replace(/<br>/g,'') + '...'
                }
              </span>
              <span onClick={() => setIsModal(!isModal)} style={{cursor:'pointer',fontWeight:'bold'}}>Xem thêm</span>
              <div className={isModal ? "overlay active" : "overlay"}>
                
              </div>
              <div className="zm-modal">
              <div className={isModal ? "modal active" : "modal"}>
                <div className="modal-content">
                    <img src={artistData?.thumbnail} alt="" />
                    <span style={{marginTop:20,fontWeight:'bold',fontSize:'1.2rem'}}>{artistData?.name}</span>
                    <span className="bio-full">{artistData?.biography?.replace(/<br>/g,'')}</span>
                    <span className="close" style={{cursor:'pointer'}} onClick={() => setIsModal(!isModal)} ><IoCloseOutline /></span>
                </div>
                </div>
              <div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </About>
      </ArtistContent>
    </ArtistPage>
  );
};

export default Artist;
