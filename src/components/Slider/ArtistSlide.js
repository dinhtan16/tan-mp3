import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
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
      color: #844d4d;
    }
  }
  .description {
    margin-top: 0.3rem;
    color: #333;
    font-weight: 300;
    font-size: 0.8rem;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; 
    max-width: 250px;
  overflow: hidden;
  }
`;
const MarginTop =styled.div`
 @media screen and (max-width:880px) {
        margin-top: 2rem;
      }
      margin-top: 2rem;
      @media screen and (min-width:970px) {
        margin-top: 7rem;
      }
`
const ArtistSlide = ({data}) => {
    const navigate = useNavigate()
  // console.log(data)
//   const {title,thumbnailM,link,sortDescription} = data
  const dataCut = data?.slice(0,5)
  return (
    <MarginTop>
      <h3 style={{ marginBottom: "1rem" }}>Nghệ sĩ thịnh hành 🔥</h3>
      <ThemeContainer>
        {dataCut?.map((item, i) => {
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
    </MarginTop>
  );
}

export default ArtistSlide