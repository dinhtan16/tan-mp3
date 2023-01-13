import React, { useEffect, useState } from "react";

import { HomeContainer } from "../styles/home/styled.home";
import Loading from "../components/Loading/Loading";
import SliderComponent from "../components/Slider/Slider";


import {getArtistSlide, getHAlbum, getHomeData, getHXone, getNewMusicEveryDay, getNewRelease, getTheme1Data, getTopHundred} from '.././stores/Slices/HomeDataSlice'
import {useSelector,useDispatch} from 'react-redux'
import FirstTheme from "../components/Slider/FirstTheme";
// import ArtistSlide from "../components/Slider/ArtistSlide";
import Section from '../components/Slider/Section'
import NewRelease from "../components/NewRelease/NewRelease";
import styled from "styled-components";

const SectionStyle = styled.div`
  height: 100%;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  @media screen and (max-width:964px) {
  gap: 5rem;
    
  }
`
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getHomeData())
    dispatch(getTheme1Data())
    dispatch(getArtistSlide())
    dispatch(getNewMusicEveryDay())
    dispatch(getTopHundred())
    dispatch(getHXone())
    dispatch(getHAlbum())
    dispatch(getNewRelease())
}, []);

  const banner = useSelector(state => state.homeData.banner)
  const theme = useSelector(state => state.homeData.theme)
  const artistSlide = useSelector(state => state.homeData.artistHome)
  const musicEveryday = useSelector(state => state.homeData.musicEveryday)
  const topHundred = useSelector(state => state.homeData.topHundred)
  const xone = useSelector(state => state.homeData.xone)
  const hAlbum = useSelector(state => state.homeData.hAlbum)
  const newRelease = useSelector(state => state.homeData.newRelease)
  // console.log(xone)

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
      <FirstTheme data={theme?.items}/>
      {/* <ArtistSlide data={artistSlide?.items}/> */}
      <SectionStyle>
        <Section data={artistSlide?.items} title={artistSlide?.title} className='section-item'/>
        <Section data={musicEveryday?.items} title={musicEveryday?.title} className='section-item'/>
        <NewRelease data = {newRelease?.items} title={newRelease?.title}/>
        <Section data={topHundred?.items} title={topHundred?.title} className='section-item'/>
        <Section data={hAlbum?.items} title={hAlbum?.title} className='section-item'/>
        <Section data={xone?.items} title={xone?.title} className='section-item'/>
      </SectionStyle>

    </HomeContainer>
  );
};

export default Home;
