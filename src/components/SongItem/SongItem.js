import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from "react-redux";
import { setCurrSong, setIsPlayAudio } from "../../stores/Slices/setIDSlice";
const SongItemStyle = styled.div`
  width: 30%;
  /* margin-top: 0.5rem; */

  @media screen and (max-width: 964px) {
    width: 50%;
    /* margin-top: 0.7rem; */
  }
  .container-item{
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: #D9D7D3;
    }
    display: flex;  
    align-items: center;
    gap: 0.4rem;
    .item-img {
        width: 60px;
        height: 60px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 8px;
        }
    }
    .info{
        flex: 1;
        .info-title{
            font-size: 0.9rem;
        }
        .info-artist,.info-release{
            font-size: 0.8rem;
            color: grey;
            margin-top: 5px;

            a:hover{
                color: #5A3F3F;
            }
        }
        
    }
  }
`;
const SongItem = ({ data }) => {
  // console.log(data)
  const dispatch = useDispatch()
  const handleSong = () => {
     dispatch(setCurrSong(data?.encodeId))
     dispatch(setIsPlayAudio(true))

  }
  return (
    <SongItemStyle>
      <div className="container-item">
        <div className="item-img">
            <img src={data.thumbnailM} alt="" />
        </div>
       <div className="info">
            <div className="info-title" onClick={handleSong}>
            {data?.title}
            </div>
            <div className="info-artist">
                {
                    data?.artists.map((item,index) => (
                        <Link key={index} to={item.link}>{ (index ? ', ' : '') + item.name } </Link>

                    )
                    )
                }
            </div>
            <div className="info-release">
                {moment(data?.releaseDate * 1000).fromNow() }
            </div>
       </div>
      </div>
    </SongItemStyle>
  );
};

export default memo(SongItem);
