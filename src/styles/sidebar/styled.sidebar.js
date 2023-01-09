import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarLink = styled(NavLink)`
  &.active {
    background-color: #ceccc9;
    color: #936766;
    border-left: 5px solid #936766;
  }
`;
export const SideLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1rem; */
  background-color: #d9d7d4;
  /* height: 1000vh; */
  /* position: relative; */
  /* height: 100%; */
  height: calc(100vh - 90px);
`;
export const LogoSideBar = styled.div`
  img {
    width: 120px;
  }
  padding: 1rem;
`;
export const MainMenu = styled.div`
  ul a {
    display: flex !important;
    align-items: center !important;
    padding: 0.6rem 0.8rem;
    font-weight: 600;
    font-size: 13px;
    gap: 0.5rem;
    line-height: 1rem;
    border-left: 5px solid transparent;

    &:hover {
      color: #936766;
    }
    .icon-nav {
      font-size: 1.3rem;
    }
  }
  ul .nav-icon {
  }
`;
