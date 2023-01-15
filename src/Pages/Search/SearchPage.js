import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, Outlet, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const SearchPageContainer = styled.div`
  padding: 0 59px;
  width: 100%;
  margin-top: 10px;
  .top {
    display: flex;
    gap: 1.4rem;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ceccc8;

    span {
      cursor: pointer;
      text-transform: uppercase;
      /* font-weight: 600; */
      font-size: 0.9rem;

      &.active {
        color: #844d4d;
        font-weight: bold;
        text-decoration: underline;
        /* offset-position: left 10px; */
      }
    }
    .first {
      text-transform: none;
      border-right: 1px solid #ceccc8;

      padding: 5px 10px;
      font-weight: 700;
      font-size: 1.6rem;
    }
  }
`;

const SearchPage = () => {
  // const data = useParams();
  const keyword = useSelector(state => state.search.keyword)
  // console.log(keyword)
  var tabs = document.querySelectorAll(".tabs");
  tabs.forEach(function (tab) {
    // console.log(button);
    tab.addEventListener("click", function () {
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
    });
  });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({
      pathname:'/tim-kiem/bai-hat',
      search:`?${createSearchParams({
        q: keyword
    })}`
    });
  }
  const handleNavigateAll = () => {
    navigate({
      pathname:'/tim-kiem/tat-ca',
      search:`?${createSearchParams({
        q: keyword
    })}`
    });
  }
  return (
    <SearchPageContainer>
      <div className="top">
        <div className="first">Kết Quả Tìm Kiếm</div>
        <span
          className="tabs active"
          onClick={handleNavigateAll}
        >
          tất cả
        </span>
        <span className="tabs" onClick={handleNavigate}>
          bài hát
        </span>
        <span className="tabs">playlist/album</span>
        <span className="tabs">nghệ sĩ/OA</span>
        <span className="tabs">MV</span>
      </div>
      <div>
        <Outlet />
      </div>
    </SearchPageContainer>
  );
};

export default SearchPage;
