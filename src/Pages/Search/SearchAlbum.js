import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getArtistData } from '../../stores/Slices/SearchSlice'
import { useNavigate } from 'react-router-dom';
import AlbumLoading from '../../components/Loading/albumLoading';


const Playlist = styled.section`
    height: 480px;
    overflow-y: scroll;
  .playlist-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .playlist-item {
    /* display: flex; */
    width: 18%;
    flex-direction: column;
    .top {
      img {
        border-radius: 8px;
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
        &:hover{
          color:#af8f8e;

        }
      }
      .artists-title {
        font-size: 0.8rem;
        color: grey;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        a:hover{
          text-decoration: underline;
          color:#af8f8e;
          
        }
      }
    }
  }
`;
const SearchAlbum = () => {
    const artistData = useSelector(state => state.search.artistData)
    const searchData = useSelector(state => state.search.searchData)
    // console.log(artistData)
    // const keyword = useSelector(state => state.search.keyword)
    const [isLoading,setIsLoading]= useState(false)
    // console.log(artistData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const playlistData = artistData?.sections?.filter(item => item.sectionType === "playlist").map((item) => item.items)
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            await dispatch(getArtistData({name: searchData?.top && searchData?.top.alias  || searchData?.top && searchData?.top?.artists?.map((item) => item.alias).join('') || searchData.artists.slice(0,1).map((item) => item.alias).join('')}))
            
            setIsLoading(false)
        }
        fetch()
    
    },[])
    // useEffect(()=>{
    //     if(artistData === undefined){
    //      dispatch(getArtistData({name:keyword || searchData?.top && searchData?.top.alias ||keyword || searchData?.top && searchData?.top?.artists?.map((item) => item.alias).join('') || searchData.artists.slice(0,1).map((item) => item.alias).join('')}))
    //         console.log('1')
    //         }
    // },[artistData])
  return (
<Playlist>
          <div className="playlist-title">Playlist/album</div>
          <div className="playlist-content">
            {isLoading ? <AlbumLoading /> : playlistData?.length === undefined ? <h1 style={{marginTop:20}}>Dữ liệu chưa được cập nhật, mong quý khách thông cảm</h1> :
            playlistData?.map((item) => {
                return item.map((item) => {
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
                })
            })}
          </div>
        </Playlist>
  )
}

export default SearchAlbum