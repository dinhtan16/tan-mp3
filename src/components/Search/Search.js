import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,createSearchParams } from "react-router-dom";
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  Loading,
  ClearIcon
} from "../../styles/search/styled.search";

import {  Discuss } from "react-loader-spinner";
import { CiSearch } from "react-icons/ci";
import { getSearchData } from "../../stores/Slices/SearchSlice";
import useDebounce from "../customHook/useDebounce";
import { setKeyword as setKeyRedux } from "../../stores/Slices/SearchSlice";
import { MdOutlineClear } from "react-icons/md";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useDebounce
  const debounce = useDebounce(keyword, 200);
  // console.log(debounce)
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      setIsLoading(true);
      await dispatch(getSearchData({ keyword: debounce }));
      setIsLoading(false);
      dispatch(setKeyRedux(debounce))
      navigate({
        pathname:'/tim-kiem/tat-ca',
        search:`?${createSearchParams({
          q: debounce
      })}`
      });
      setKeyword('')
    }
  };
    // useEffect(() => {
    //   dispatch(getSearchData({ keyword: debounce }));
    // },[debounce])
  return (
    <SearchContainer>
      
      <SearchInput
       
        placeholder="Tìm kiếm bài hát, hay ca sĩ..."
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
      <SearchIcon  style={{display:`${isLoading ? 'none' : 'block'}`}}>
        <CiSearch />
      </SearchIcon>
      {debounce  && <ClearIcon onClick={() => setKeyword('')}>
        <MdOutlineClear />
      </ClearIcon>}
      <Loading>
        <Discuss
          visible={isLoading ? true : false}
          height="30"
          width="30"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </Loading>
    </SearchContainer>
  );
};

export default Search;
