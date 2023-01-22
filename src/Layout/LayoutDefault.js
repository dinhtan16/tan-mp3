import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Player from "../components/Player/Player";
import SideBarLeft from "../components/SideBar/SideBarLeft";
import SideBarRight from "../components/SideBar/SideBarRight";
import Welcome from "../components/Welcome/Welcome";
import RouteLayout from "../routes/route";
import {
  LayoutContainer,
  LeftSidebarStyle,
  MidBarStyle,
  DefaultLayout,
  PlayerStyle,
  TopStyle,

} from "../styles/layout/styled.layout";

import { ThemeProvider } from "styled-components";
import { lightTheme,darkTheme ,GlobalStyles} from "../styles/themes";


const RightSidebarStyle = styled.div`
width: 330px;
/* display: none; */
position: fixed;
right: 0;
top: 0;
bottom: 96px;
background-color: white;
z-index: 999;
transition:  transform .2s linear;
transform: translateX(100%);

/* @media screen and (min-width: 1124px){
  transform: translateX(100%) !important;
} */

&.active {
  transform: translateX(0%);

}
`;

const StyledApp = styled.div`
`
const LayoutDefault = () => {
  const isActiveRight = useSelector(state => state.setID.isActiveRight)
 
  const [theme,setTheme] = useState('dark')
  const ThemeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
 
  return (
  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
    <StyledApp>
        <DefaultLayout>
          <LayoutContainer>
            <LeftSidebarStyle>
              <SideBarLeft />
            </LeftSidebarStyle>
            <MidBarStyle>
                  <TopStyle>
                    <Header handleTheme={ThemeToggler} isTheme={theme}/>
                  </TopStyle>
                            <RouteLayout />
                  <PlayerStyle>
                  <Player />
                </PlayerStyle>  
            </MidBarStyle>
            <RightSidebarStyle className={isActiveRight ? 'active' :''}>
              <SideBarRight />
            </RightSidebarStyle>
          </LayoutContainer>
         
        </DefaultLayout>
    </StyledApp>
  </ThemeProvider>
  );
};

export default LayoutDefault;
