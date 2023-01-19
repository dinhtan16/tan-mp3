import React from "react";
import Search from "../Search/Search";
import Actions from "../Header/Actions/Actions";
import { HeaderContainer } from "../../styles/Header/styled.header";
import {
  GrFormNextLink,GrFormPreviousLink
} from 'react-icons/gr'
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate=useNavigate()
  return (
    <HeaderContainer>
      <div className="navigate">
        <GrFormPreviousLink size={28} className='icon' onClick={() => navigate(-1)}/>
        <GrFormNextLink  size={28}className='icon' onClick={() => navigate(1)}/>
      </div>
      <Search />
      <Actions />
    </HeaderContainer>
  );
};

export default Header;
