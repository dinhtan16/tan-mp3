import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSongFromPlayList } from '../../stores/Slices/PlaylistSlice'
import format from 'format-duration'
import { Link } from 'react-router-dom'

import styled from 'styled-components';
import { setCurrSong, setIsPlayAudio } from '../../stores/Slices/setIDSlice'
import AlbumLoading from '../../components/Loading/albumLoading'

const Song = styled.section`
    height: 480px;
    overflow-y: scroll;
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


const SearchSong = () => {
  const dispatch = useDispatch()
  const searchData = useSelector(state => state.search.searchData)
  const songSearch = useSelector(state => state.playlist.songSearchData)
  const [isLoading,setIsLoading]= useState(false)
  // console.log( searchData.artists.slice(0,1).map((item) => item.id ).join(''))
  useEffect(() => {
      const fetch = async () => {
        setIsLoading(true)
        await dispatch(getSongFromPlayList({id: searchData?.top?.id || searchData?.top?.artists?.map((item) => item.id).join('') || searchData.artists.slice(0,1).map((item) => item.id ).join('')}))
        setIsLoading(false)
      }
      fetch()
  },[searchData])
  const handleSong = (item) => {
    dispatch(setCurrSong(item.encodeId))
    dispatch(setIsPlayAudio(true))
  }
  return (
    <Song>
          <div className="title-list">Bài hát</div>
          <div className="song-lists">
            {isLoading ? <AlbumLoading/>  :
              songSearch?.items?.map((item) => {
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
  )
}

export default SearchSong