import React, { useEffect, useState } from "react";

import { HomeContainer } from "../styles/home/styled.home";
import Loading from "../components/Loading/Loading";
import SliderComponent from "../components/Slider/Slider";


import {getHomeData} from '.././stores/Slices/HomeDataSlice'
import {useSelector,useDispatch} from 'react-redux'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getHomeData())
}, []);

  const banner = useSelector(state => state.homeData.banner)
  // const banner = homeData?.find(item => item.sectionType === "banner")


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout();
    };
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <HomeContainer>
      <SliderComponent data={banner?.items}/>
    </HomeContainer>
  );
};

export default Home;
