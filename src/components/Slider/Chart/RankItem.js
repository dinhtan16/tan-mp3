import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import moment from 'moment'
// import 'moment/locale/vi'
// import { useDispatch } from "react-redux";
// import { setCurrSong, setIsPlayAudio } from "../../stores/Slices/setIDSlice";
const RankItemStyle = styled.div`
  width: 100%;
  /* margin-top: 0.5rem; */
  display: flex;
  align-items: center;
  justify-content: stretch;
  gap: 10px;
  @media screen and (max-width: 964px) {
    width: 100%;
    /* margin-top: 0.7rem; */
  }
  .container-item{
    cursor: pointer;
    padding: 10px;
    width: 100%;
    background-color: rgba(255,255,255,0.1);
    margin-top: 8px;
    &:hover{
      background-color: rgba(255,255,255,0.4);
      color: white;

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
            color: #999;
            margin-top: 5px;

            a:hover{
                color: #5A3F3F;
            }
        }
         .info-artist{
          word-break: break-word;
         }
         
    }
  }
`;
const RankItem = ({ data,rank,percent }) => {
  // console.log(data)
  // const dispatch = useDispatch()
  // const handleSong = () => {
  //    dispatch(setCurrSong(data?.encodeId))
  //    dispatch(setIsPlayAudio(true))

  // }
  return (
    <RankItemStyle>
        <div style={{fontWeight:700}}>
          #{ rank + 1}
        </div>
      <div className="container-item">
        <div className="item-img">
            <img src={data?.thumbnailM} alt="" />
        </div>
       <div className="info">
            <div className="info-title">
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
       </div>
            <div style={{fontWeight:700}}>{percent}%</div>
      
      </div>
    </RankItemStyle>
          
  );
};

export default memo(RankItem);
