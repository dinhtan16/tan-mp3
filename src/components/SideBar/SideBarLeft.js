import React from "react";
import { useNavigate } from "react-router-dom";

import { MdOutlineLibraryMusic, MdRadio } from "react-icons/md";
import { IoDiscOutline } from "react-icons/io5";
import { BiNetworkChart } from "react-icons/bi";
import logo from "../../assets/logo/logo.png";
import {
  SideLeftContainer,
  LogoSideBar,
  MainMenu,
  NavbarLink,
} from "../../styles/sidebar/styled.sidebar";
// import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Cá nhân",
    link: "profile",
    icon: <MdOutlineLibraryMusic />,
  },
  {
    name: "Khám phá",
    link: "/",
    icon: <IoDiscOutline />,
  },
  {
    name: "#zingchart",
    link: "chart",
    icon: <BiNetworkChart />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },
  {
    name: "Radio",
    link: "radio",
    icon: <MdRadio />,
  },

];
const SideBar = () => {
  const navigate = useNavigate();
  return (
    <SideLeftContainer>
      <LogoSideBar onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </LogoSideBar>
      <MainMenu>
        <ul>
          {menus.map((menu, index) => {
            return (
              <NavbarLink
                key={index}
                to={menu.link}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="icon-nav">{menu.icon} </span>
                <span className="icon-name">{menu.name}</span>
              </NavbarLink>
            );
          })}
        </ul>
      </MainMenu>
    </SideLeftContainer>
  );
};

export default SideBar;
