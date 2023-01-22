import styled from "styled-components";

export const DetailPlaylistContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  /* max-height:calc(3/2); */
  height: 548px;

  @media screen and (min-height:1024px) {
    height: 920px;
  }
  @media screen and (max-height:500px) {
    height: 210px;
  }
  /* height: 100%; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftContent = styled.div`
  text-align: center;
  width: 30%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  .thumb-img {
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 300px;
    border-radius: 8px;
    position: relative;
    transition: all .3s ease;
    height: auto;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    animation: spinnerCDPause 300ms linear 0s both;
    -webkit-animation: spinnerCDPause 300ms linear 0s both;
   -moz-animation: spinnerCDPause 300ms linear 0s both;
    -o-animation: spinnerCDPause 300ms linear 0s  both;
    &:hover{
      img{
        transform: scale(1.02);
      }
      .start-play{
        display: block;
      }
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
      border-radius: 8px;
      width: 100%;
      transition: all .3s ease;

      
    }
    .playing,.start-play{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    
    }
    .playing{
      z-index:1;
    }
    .start-play{
      font-size: 2.5rem;
      color:white;
      z-index: 1;
      display: none;
    }
  }
  .thumb-img.active{
    border-radius: 50%;
    animation: spinnerCD 5s linear 0s infinite;
    -webkit-animation: spinnerCD 5s linear 0s infinite;
   -moz-animation: spinnerCD 5s linear 0s infinite;
    -o-animation: spinnerCD 5s linear 0s infinite; 
    &:hover{
      &::after{
                position: absolute;
                content: '';
                top: 0;
                bottom:  0;
                left:  0;
                right: 0;
                background: rgb(0,0,0,0.2) !important;
                width: 100%;
                height: 100%;
            }
    }
    .start-play{
      display: none;
    }
  }
  @keyframes spinnerCD {
  0% {
    -webkit-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -o-transform:rotate(0deg);
  }
  100% {
    -webkit-transform:rotate(360deg);
    -moz-transform:rotate(360deg);
    -o-transform:rotate(360deg);
  }
 
  }
  @keyframes spinnerCDPause {
  0% {
    border-radius: 99999px;

    -webkit-transform:rotate(360deg);
    -moz-transform:rotate(360deg);
    -o-transform:rotate(360deg);
  }
  100% {
    border-radius: 8px;
    -webkit-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -o-transform:rotate(0deg);
  }
 
  }
  .thumb-bottom {
    .title span {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.5;
      text-transform: none;
    }
    .update {
      margin: 0.5rem 0;
    color: ${props => props.theme.fontColor};
      font-size: 0.9rem;
    }
    .artist-content {
      margin-top: 0.2rem;
    }
    .artist-content .name a {
      font-size: 1rem;
      font-weight: 600;
      &:hover {
        color:  ${props => props.theme.buttonBgr};
        text-decoration: underline;
      }
    }
    .artist-content .name .follow {
      user-select: none;
      font-size: 0.5rem;
      color:  ${props => props.theme.fontColor};
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      /* margin-top: 0.5rem; */
    }

    .thumb-bottom-btn {
      margin-top: 1rem;

      .play-random-btn {
        display: flex;
        justify-content: center;
        button {
          background-color: ${props => props.theme.buttonBgr};

          cursor: pointer;
          display: flex;
          align-items: center !important;
          /* gap:5px; */
          span {
            padding-left: 2px;
            font-weight: 600;
            font-size: 1em;
          }
        }
      }

      .more-btn {
        display: flex;
        gap: 1rem;
        margin-top: 0.7rem;
        justify-content: center;

        button {
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1);

          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          outline: none;
          border: none;
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding-left: 10px;
    width: 100%;
    align-items: flex-start;
    .thumb-img {
      width: 300px;
      height: fit-content;
    }
    .thumb-bottom {
      flex: 1;
      text-align: left;
      max-width: 390px;
    }
    .play-random-btn {
      display: flex;
      justify-content: flex-start !important;
    }
    .more-btn {
      display: flex;
      justify-content: flex-start !important;
      -webkit-justify-content: flex-start;
    }
  }
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    .thumb-bottom {
      text-align: center;
    }
    .play-random-btn {
      display: flex;
      justify-content: center !important;
    }
    .more-btn {
      display: flex;
      justify-content: center !important;
    }
  }
`;
export const ArtistLeftContent = styled.div`
  width: 100%;
`;

export const RightContent = styled.div`
  flex: 1;
  .description{
    color: ${props => props.theme.fontColor};
  }
  .song-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 3px;
    }

    /* Track */

    height: 90%;
    z-index: 9999;
  }

  .title {
    user-select: none;
    display: flex;
    font-weight: 700;
    color:  ${props => props.theme.fontColor};

    /* justify-content: space-around; */
    padding: 10px;
    .title-name {
      width: 40%;
    }
    .icon-title {
      /* padding: 10px; */

      width: 4%;
      cursor: pointer;
    }
    .title-album {
      flex: 1;
    }
    .time-title {
      width: 20%;
      text-align: center;
    }
  }
  .song-main.active {
    background-color: #d9d7d3;
  }
  .song-main {
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.hover};
    }
    .icon {
      min-width: 4%;
      /* padding: 10px; */
    }
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .name-song {
      width: 40%;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      span {
        font-size: 14px;
      }
      .song-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        .title-song-info {
          font-weight: 500;
          cursor: pointer;
          width: 80%;
          line-height: 1.2;
          &:hover {
            color:  ${props => props.theme.colorActive};
          }
        }
        .artist {
          font-weight: 300;
          color:  ${props => props.theme.fontColor};
          font-size: 0.9rem;
          margin-top: 0.3rem;
          max-width: 70%;
          word-break: break-word;;
          span {
          }
          a {
            &:hover {
              color:  ${props => props.theme.colorActive};
              margin-left: 2px;
            }
          }
        }
      }
      .avatar-song {
        width: 50px;
        height: 50px;
        flex:none;
        img {
          border-radius: 5px;
          width: 100%;
        }
      }
    }
    .album-song {
      flex: 1;

      a {
        font-size: 0.9rem;
        font-weight: 300;
        color:  ${props => props.theme.fontColor};
        &:hover {
          color: #644646;
        }
      }
    }
    .duration-song {
      text-align: center;
      width: 20%;
      font-size: 0.9rem;
      font-weight: 300;
      user-select: none;
    }
  }
  .total-song {
    font-size: 0.8rem;
    user-select: none;
    margin-top: 1rem;

    padding: 0.6rem 1rem;
    border-top: 2px solid #dad8d5;
  }
`;
/* flex:1`; */
