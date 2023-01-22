import React, { memo } from "react";
import Search from "../Search/Search";
import Actions from "../Header/Actions/Actions";
import { HeaderContainer } from "../../styles/Header/styled.header";
import {
  GrFormNextLink,GrFormPreviousLink
} from 'react-icons/gr'
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";


const Header = ({handleTheme,isTheme}) => {
  // console.log(isTheme)
  const navigate=useNavigate()
  return (
    <HeaderContainer>
      <div className="navigate">
        <GrFormPreviousLink size={28} className='icon' onClick={() => navigate(-1)}/>
        <GrFormNextLink  size={28}className='icon' onClick={() => navigate(1)}/>
        <button className="toggle" onClick={handleTheme}>{isTheme === 'dark' ? 
        <div className="flex-center">
          <MdLightMode size={24}/>

        </div> : <div className="flex-center">
          <MdDarkMode size={24}/>

        </div>}</button>
        {/* <Switch onChange={() => handleTheme()} checked={isTheme}  offColor={isTheme === 'dark' ? '#888' : 'red'}/> */}
      </div>
      <Search />
      <Actions />
    </HeaderContainer>
  );
};

export default memo(Header);
