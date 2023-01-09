import React from "react";
import Search from "../Search/Search";
import Actions from "../Header/Actions/Actions";
import { HeaderContainer } from "../../styles/Header/styled.header";
const Header = () => {
  return (
    <HeaderContainer>
      <Search />
      <Actions />
    </HeaderContainer>
  );
};

export default Header;
