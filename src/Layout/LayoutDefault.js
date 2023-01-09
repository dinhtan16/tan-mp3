import React from "react";
import Header from "../components/Header/Header";
import Player from "../components/Player/Player";
import SideBarLeft from "../components/SideBar/SideBarLeft";
import SideBarRight from "../components/SideBar/SideBarRight";
import RouteLayout from "../routes/route";
import {
  LayoutContainer,
  LeftSidebarStyle,
  MidBarStyle,
  RightSidebarStyle,
  DefaultLayout,
  PlayerStyle,
} from "../styles/layout/styled.layout";
const LayoutDefault = () => {
  return (
    <DefaultLayout>
      <LayoutContainer>
        <LeftSidebarStyle>
          <SideBarLeft />
        </LeftSidebarStyle>
        <MidBarStyle>
          <Header />
          <RouteLayout />
        </MidBarStyle>
        <RightSidebarStyle>
          <SideBarRight />
        </RightSidebarStyle>
      </LayoutContainer>
      <PlayerStyle>
        <Player />
      </PlayerStyle>
    </DefaultLayout>
  );
};

export default LayoutDefault;
