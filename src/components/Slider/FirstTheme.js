import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ThemeContainer = styled.div`
  display: flex;
  gap: 1rem;
  /* flex-wrap: nowrap; */
  width: 100%;
  /* @media screen and (max-width:1000px) {
  grid-template-columns: repeat(4, 1fr);
  display: grid;
    
  } */
  /* margin-bottom: 1rem; */
`;
const ThemeItem = styled.div`
  width: 25%;
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

  img {
    vertical-align: top;
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.1);

        
    }
  }
`;
const ThemeBottom = styled.div`
  margin-top: 0.5rem;
  a {
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
      color:${props => props.theme.hoverTitle};
    }
  }
  .description {
    margin-top: 0.3rem;
    color:${props => props.theme.fontColor};
    font-weight: 300;
    font-size: 0.8rem;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; 
    max-width: 250px;
  overflow: hidden;
  }
`;
const FirstTheme = ({ data }) => {
    const navigate = useNavigate()
  // console.log(data)
//   const {title,thumbnailM,link,sortDescription} = data
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
    <div className="margin" style={{marginTop:30,marginBottom:20}}>
      <h3 style={{ marginBottom: "1rem",marginTop:48}}>{data?.title}</h3>
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
                <div className="description">{item.sortDescription}</div>
              </ThemeBottom>
            </ThemeItem>
          );
        })}
      </ThemeContainer>
    </div>
  );
};

export default FirstTheme;
