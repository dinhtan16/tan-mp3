import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex:auto;

`;
export const LeftSidebarStyle = styled.div`
  width: 240px;
  flex: none;
  background-color: #e5e3df;
  
`;
export const MidBarStyle = styled.div`
  /* flex: auto; */
  background-color: #e5e3df;
  padding: 0 59px;
  /* width: 100%; */
  /* overflow: scroll; */
  /* width:100%; */
  flex:1;
  /* height: 100%; */
  min-width:calc(100vw - 240px);

  @media screen and (max-width: 1200px){
    min-width:calc(100vw - 240px);


    /* display: block; */
  }
`;
export const RightSidebarStyle = styled.div`
  width: 300px;
  flex: none;
  background-color: white;
  z-index: 909999;
  /* display: none; */
  transition: all .3s linear;
  transform: translateX(100%);

  /* margin-right: -300px; */
  @media screen and (min-width: 1200px){
    transform: translateX(0%);


    /* display: block; */
  }
`;

export const DefaultLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`
export const PlayerStyle = styled.div`
height: 90px;
min-width: 768px;
flex:none;
background-color: #DEDAD1;
overflow-y: hidden;

`