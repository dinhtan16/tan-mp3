import React from "react";
import { useSelector } from "react-redux";
import { createSearchParams, NavLink, Outlet } from "react-router-dom";
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
      display: flex;
      gap:2rem;
      a.active {
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
  
  const navLink = [{
    id:1,
    name:'Tất cả',
    path:'/tim-kiem/tat-ca'
  },
{
  id:2,
  name:'Bài hát',
  path:'/tim-kiem/bai-hat'
},{
  id:3,
  name:'Playlist/OA',
  path:'/tim-kiem/playlist'
}]
  return (
    <SearchPageContainer>
      <div className="top">
        <div className="first">Kết Quả Tìm Kiếm</div>
        <span>
          {
            navLink.map((item) => {
             return <NavLink key={item.id}  className={({ isActive }) => (isActive ? "active" : "link")}  to={{
              pathname:item.path,
              search:`?${createSearchParams({
                q: keyword
            })}`
            } }>
                {item.name}
              </NavLink>
            })
          }
        </span>
      </div>
      <div>
        <Outlet />
      </div>
    </SearchPageContainer>
  );
};

export default SearchPage;
