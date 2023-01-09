import React from "react";
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
} from "../../styles/search/styled.search";

import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput placeholder="Tìm kiếm bài hát, hay ca sĩ..." type="text" />
      <SearchIcon>
        <CiSearch />
      </SearchIcon>
    </SearchContainer>
  );
};

export default Search;
