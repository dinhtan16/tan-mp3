import styled from "styled-components";


export const LayoutContainer = styled.div`
  display: flex;
`;
export const TopStyle = styled.div`


padding: 0 59px;
height: 60px;
/* background-color: #e5e3df;  */
`;

export const LeftSidebarStyle = styled.div`
  min-width: 160px;
  @media screen and (min-width:880px) {
    width: 240px; 

  }
`;
export const MidBarStyle = styled.div`
min-height: calc(100% - 158px);
  /* height: calc(100vh - 72px); */
  /* background-color: #E5E3DF; */
  flex:1;
  display: flex;
  /* height: 100%; */
  width: calc(100% - 240px - 300px);
  flex-direction: column;
`;





export const DefaultLayout = styled.div`
`
export const PlayerStyle = styled.div`
position: fixed;
bottom: 0;
right: 0;
left: 0;
/* background-color: #dedad1; */
z-index: 9999;
`