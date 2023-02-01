import styled from "styled-components";


export const ArtistPage = styled.div`
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
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
  @media screen and (min-height:1124px) {
    height: 968px;
  }
  @media screen and (max-height:500px) {
    height: 210px;
  }
`;
export const ArtistTop = styled.section`
  position: relative;
  width: 100%;
  .img-cover {
    width: 100%;
    height:330px;
    object-fit: cover;
    /* border-radius: 10px; */
  }
  .overlay {
      /* z-index: 1; */
      /* border-radius: 10px; */
      bottom:4px !important;
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        180deg,
        transparent 27%,
        rgba(0, 0, 0, 0.78)
      );
    }
  .top-info {
    width: 100%;
    padding: 10px 59px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-wrap: wrap;
    color: white;
    .top-info-left {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .name {
        font-size: 3em;
        /* background-color: rgba(0, 0, 0, 0.17); */
        width: fit-content;
        font-weight: bold;
        flex-shrink: 0;
      }
      .follow {
        font-size: 0.9rem;
        color: #fff;

        display: flex;
        align-items: center;
        gap: 2rem;
        .follow-text {
          /* background-color: rgba(0, 0, 0, 0.3); */
          /* width: fit-content; */
          min-width: 50px;
        }
        .care {
          /* background-color: rgba(0,0,0,0.2); */
          width: fit-content;
        }
        button {
          cursor: pointer;
          padding: 5px 20px;
          border-radius: 999px;
          background-color: rgba(0, 0, 0, 0.2);
          outline: none;
          border: 1px solid #fff;
          color: #fff;
          /* font-weight: bold; */
        }
      }
    }
    .top-info-right {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
`;
export const ArtistContent = styled.section`
  padding: 0 59px;
`;

export const SpotMusic = styled.section`
  margin-top: 30px;

  .spot-info {
    @media screen and (max-width: 1124px) {
      flex-direction: column;
      .spot-left {
        width: 100% !important;
      }
      .song-lists {
        width: 100%;
      }
    }
    display: flex;
    /* align-items: flex-end; */
    gap: 1rem;
    .spot-left {
      display: flex;
      flex-direction: column;
      width: 40%;
      .title-album-hot {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 20px 0;
      }
    }
    .spot-right {
      flex: 1;
      .title-spot {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .album-spot {
    /* padding: 0 20px; */
    width: 100%;
    height: fit-content;
    background-color: ${props => props.theme.hover};
    border-radius: 20px;
    padding: ${props => props.theme.padding};
    .album-item {
      display: flex;
      align-items: center;
      padding: 20px;
      gap: 1rem;
      .left {
        width: 35%;

        img {
          display: block;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }
      .right {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .type-album {
          font-size: 0.8rem;
          color: grey;
        }
        .title-album {
          font-weight: bold;
          font-size: 1rem;
          &:hover {
            color: #af8f8e;
          }
        }
        .artists-album {
          font-size: 0.8rem;
          color: grey;
          a:hover {
            text-decoration: underline;
            color: #af8f8e;
          }
        }
        .date {
          font-size: 0.8rem;
          color: grey;
        }
      }
    }
  }

  .song-lists {
    width: 100%;
    display: flex;
    /* gap: 10px; */
    flex-wrap: wrap;
    cursor: pointer;
    .song-item {
      width: 50%;
      @media screen and (max-width: 1124px) {
        width: 100%;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #d9d7d3;
      &:hover {
        background-color:${props => props.theme.hover};
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }
      .left {
        display: flex;
        gap: 10px;
        width: 100%;
        .info-left {
          display: flex;
          flex-direction: column;
          width: 100%;
          .title {
            /**Major Properties**/
            font-size: 0.8rem;
            font-weight: bold;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            width: 70%;

            &:hover {
              color: #af8f8e;
            }
          }
          .artist {
            font-size: 0.7rem;
            color: grey;
            margin-top: 5px;
            a:hover {
              text-decoration: underline;
              color: #af8f8e;
            }
          }
        }
      }
      .duration {
        font-size: 0.8rem;
        color: grey;
      }
    }
  }
`;
export const Playlist = styled.section`
  .playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 2rem;
  }
  .playlist-item {
    /* display: flex; */
    width: 25%;
    flex-direction: column;
    .top {
      img {
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
        &:hover {
          color: #646464;
        }
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
      }
      .artists-title {
        font-size: 0.9rem;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;

        a:hover {
          text-decoration: underline;
          color: #af8f8e;
        }
      }
    }
  }
`;
export const AlbumList = styled.div`
  .playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 2rem;
  }
  .playlist-item {
    /* display: flex; */
    width: 25%;
    flex-direction: column;
    .top {
      img {
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
        &:hover {
          color: #646464;
        }
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
      }
      .artists-title {
        font-size: 0.9rem;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        a:hover {
          text-decoration: underline;
          color: #af8f8e;
        }
      }
    }
  }
`;
export const MusicVideo = styled.section`
  .mv-title {
    font-size: 1.2rem;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .mv-lists {
    display: flex;
    gap: 1rem;
    .mv-item {
      width: 35%;
      .top {
        position: relative;
        .duration {
          position: absolute;
          bottom: 15px;
          right: 10px;
          background-color: black;
          color: #fff;
          font-size: 0.8rem;
        }
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .bottom {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        .bottom-left {
          img {
            width: 50px;
            height: 50px;
            border-radius: 999px;
          }
        }
        .bottom-right {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          .title-mv {
            font-weight: bold;
            overflow: hidden;
            /* line-height: 2rem; */
            max-height: 8rem;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;

            &:hover {
              color: #af8f8e;
            }
          }
          .artists-mv {
            font-size: 0.8rem;
            color: grey;
            overflow: hidden;
            line-height: 2rem;
            max-height: 8rem;
            -webkit-box-orient: vertical;
            display: block;
            display: -webkit-box;
            overflow: hidden !important;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            a:hover {
              text-decoration: underline;
              color: #af8f8e;
            }
          }
        }
      }
    }
  }
`;
export const ComboList = styled.section`
  .playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 2rem;
  }
  .playlist-item {
    /* display: flex; */
    width: 25%;
    flex-direction: column;
    .top {
      img {
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
        &:hover {
          color: #646464;
        }
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
      }
      .artists-title {
        font-size: 0.9rem;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;

        a:hover {
          text-decoration: underline;
          color: #af8f8e;
        }
      }
    }
  }
`;
export const Familiar = styled.section`
  .playlist-title {
    font-size: 1.2rem;
    margin-bottom: 20px;
    margin-top: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .playlist-content {
    display: flex;
    gap: 2rem;
  }
  .playlist-item {
    /* display: flex; */
    width: 25%;
    flex-direction: column;
    .top {
      img {
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
        &:hover {
          color: #646464;
        }
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
      }
      .artists-title {
        font-size: 0.9rem;
        overflow: hidden;
        /* line-height: 2rem; */
        max-height: 8rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;

        a:hover {
          text-decoration: underline;
          color: #af8f8e;
        }
      }
    }
  }
`;
export const YouLike = styled.div`
  .artist-title {
    font-size: 1.2rem;
    margin-top: 5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .artists-list {
    display: flex;
    gap: 1rem;
    /* flex-direction: column; */
    flex-wrap: wrap;
    .artist-item {
      margin-top: 20px;
      width: 150px;

      @media screen and (max-width: 866px) {
        /* max-width: 29%; */
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        overflow: hidden;
        transition: all 0.3s ease;

        border-radius: 50%;
        width: 100%;
        /* height: auto; */
        object-fit: cover;
      }
      /* .item-img {
          width: 25%;
          border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        &:hover img {
            transform: scale(1.09);
        }
        &:hover{
            transform: scale(1);
        } */
    }
    .item-info {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50px;
      gap: 10px;

      .info-name {
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        &:hover {
          color: ${props => props.theme.colorActive};
        }
      }
      .info-follow {
        font-size: 0.82rem;
        color: grey;
        height: 30px;
      }
    }
    .item-btn {
      margin-top: 10px;
      padding: 8px 20px;
      border-radius: 999px;
      outline: none;
      border: none;
      text-transform: uppercase;
      background-color: ${props => props.theme.buttonBgr};
      color: #fff;
      /* height: 50px; */
    }
  }
`;
export const About = styled.section`
  .about-title {
    font-weight: 700;
    margin-top: 2rem;
    font-size: 1.4rem;
  }
  .about-info {
    margin-top: 20px;
    display: flex;
    gap: 1rem;
    @media screen and (max-width: 1124px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .info-img {
    width: 40%;
    img {
      width: 100%;
      object-fit: cover;
      max-height: 320px;
      border-radius: 10px;
    }
  }
  .info {
    width: 50%;
    @media screen and (max-width: 1124px) {
      width: 100%;
    }
    .description {
      .bio {
        line-height: 1.8;
        color: ${props => props.theme.fontColor};
        font-size: 0.9rem;
      }
      .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: none;
      }
      .overlay.active {
        display: block;
      }
      .zm-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 1080;
        /* background-color: var(--dark-alpha-80); */
        display: flex;
        justify-content: center;
        align-items: center;
        /* display: none; */

        /* &:active{
          display: block;
        } */
        .modal.active {
          display: block;
        }
        .modal {
          position: fixed;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5.4px);
          -webkit-backdrop-filter: blur(5.4px);
          border: 1px solid rgba(255, 255, 255, 0.34);
          max-width: 500px;
          display: none;

          .modal-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            img {
              margin-top: 20px;
              width: 30%;
              border-radius: 999px;
            }
            .bio-full {
              margin-top: 20px;
              width: 60%;
              text-align: justify;
              line-height: 1.5;
              overflow-y: scroll;
              height: 250px;
              color: #999898;
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
            }
            .close {
              position: absolute;
              top: 20px;
              right: 30px;
              font-size: 1.7rem;
            }
          }
        }
      }
    }
    .award-artist {
      display: flex;
      gap: 2rem;
      align-items: center;
      margin-top: 30px;
      .follow-award {
        font-weight: bold;
        font-size: 1.2rem;
        .care-award {
          font-weight: normal;
          color: grey;
          font-size: 0.8rem;
        }
      }
      .number-length {
        font-weight: bold;
        font-size: 1.2rem;
        .length-award {
          font-weight: normal;
          color: grey;
          font-size: 0.8rem;
          margin-left: 5px;
        }
      }
    }
  }
`;