import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ThemeContainer = styled.div`
  /* display: flex; */
  gap: 1rem;
  /* flex-wrap: nowrap; */
  width: 100%;
  /* gap: 1rem; */
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  /* justify-content: center; */
  @media screen and (min-width:880px) {
    grid-template-columns: repeat(4, 1fr);
  display: grid;
  }
  @media screen and (min-width:1000px) {
    grid-template-columns: repeat(5, 1fr);
  display: grid;
  }
`;
const ThemeItem = styled.div`
  /* width: 25%; */
  height: 204px;
  flex-shrink: 1;
  cursor: pointer;
`;
const ThemeTop = styled.div`
    overflow: hidden;
    position: relative;
    height: fit-content;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  
    &:hover{

        &::after{
                position: absolute;
                content: '';
                top: 0;
                bottom:  0;
                left:  0;
                right: 0;
                background: rgb(0,0,0,0.5);
                width: 100%;
                height: 100%;
            }
    }
    /* min-width: 150px; */
    height: auto;
  img {
    vertical-align: top;
    border-radius: 0.5rem;
    width: 100%;
 
    height: auto;
    object-fit: cover;
    overflow: hidden;
    transition: all 0.3s ease;
    /* min-height: 150px; */
    &:hover {
        transform: scale(1.1);

        
    }
  }
`;
const ThemeBottom = styled.div`
  margin-top: 0.5rem;
 display: flex;
 flex-direction: column;
 gap:0.2rem;
 align-items: center;
  a {
    overflow:hidden;
  /* line-height: 2rem; */
  /* max-height: 8rem; */
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  height: auto;
  -webkit-line-clamp: 2;
    font-size: 0.9rem;
    font-weight: bold;
    max-width: 190px;
    text-align: center;
    /* height: 30px; */
    &:hover {
      color:${props => props.theme.hoverTitle};
    }
  }
  .description {
    /* flex:1; */
    margin-top: 0.3rem;
    color:${props => props.theme.fontColor};
    font-weight: 300;
    /* min-height: 30px; */
    font-size: 0.8rem;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; 
    max-width: 220px;
  overflow: hidden;
  /* height: 3rem; */
  margin-bottom: 2rem;
  }
`;
const MarginTop = styled.div`
  /* margin-top: 9rem;

  @media screen  and (max-width: 964px){
    margin-top: 7rem;
  } */
`
const Section = ({ data,title }) => {
    const navigate = useNavigate()
  // console.log(data)
  const [dataSection,setDataSection] = useState([])
//   const {title,thumbnailM,link,sortDescription} = data
useEffect(() => {
  if(window.innerWidth < 1000){
    const dataCut = data?.slice(0,4)
    setDataSection(dataCut)
  }
   if (window.innerWidth < 880){
    const dataCut = data?.slice(1,4)
    setDataSection(dataCut)

  }
  if(window.innerWidth > 1000){
    const dataCut = data?.slice(0,5)
    setDataSection(dataCut)
  }
  return () => {
    setDataSection(null)
  }
},[window.innerWidth])
  return (
    <MarginTop>
      <h3 style={{ marginBottom: "1rem",marginTop:12}}>{title}</h3>
      <ThemeContainer>
        {dataSection?.map((item, i) => {
          const linkCut = item.link.split(".")[0]
          return (
            <ThemeItem key={item.encodeId} onClick={() => navigate(`${linkCut}`)}>
              <ThemeTop>
                <img src={item.thumbnailM} alt="" />
              </ThemeTop>
              <ThemeBottom>
                <Link to={linkCut}>{item.title}</Link>
                <div className="description" title={item.sortDescription}>{item.sortDescription}</div>
              </ThemeBottom>
            </ThemeItem>
          );
        })}
      </ThemeContainer>
    </MarginTop>
  );
};

export default Section;
