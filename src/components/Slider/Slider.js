// import { useEffect, useState } from "react";
import {  SliderImg } from "../../styles/Header/styled.slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {useNavigate} from 'react-router-dom'
import { setAtAlbum, setCurrAlbum,setCurrSong, setIsPlayAudio } from "../../stores/Slices/setIDSlice";
import {useDispatch,useSelector} from 'react-redux'


import Slider from "react-slick";
const SliderComponent = ({ data }) => {
  const dispatch = useDispatch()
  // const isPlay = useSelector(state => state.setID.isPlayAudio)
  const navigate = useNavigate()
  const settings = {
    // className: "center",
    // centerMode: true,
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick = (item) => {
    if(item?.type === 1) {
      dispatch(setCurrSong(item.encodeId))
        dispatch(setIsPlayAudio(true))
        dispatch(setAtAlbum(false))
    }
    if(item?.type ===4 || item?.type ===3){
      dispatch(setCurrAlbum(item?.encodeId))
      const albumLink = item?.link.split('.')[0]
      navigate(albumLink)
      
    }else{
      dispatch(setAtAlbum(false))

    }
  }
  return (
    <>
      <Slider {...settings}>
        {data?.map((item, index) => {
          return (
            <SliderImg key={index} >
              <img src={item.banner} className="slide-img" alt="none" onClick={() => handleClick(item)} />
            </SliderImg>
          );
        })}
      </Slider>
    </>
  );
};

export default SliderComponent;
