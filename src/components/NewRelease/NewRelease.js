import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SongItem from "../SongItem/SongItem";

const ListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* gap: 0.7rem; */
  margin-top: 10px;
`;
const ButtonStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  button {
    cursor: pointer;
    border-radius: 20px;
    border: 0.2px solid grey;
    outline: none;
    padding: 8px 28px;
    background-color: transparent;
    transition: all 0.2s ease;
    &:hover {
      background-color: #5a3f3f;
      color: #fff;
      border: 0.2px solid transparent;
    }
    &.active {
      background-color: #5a3f3f;
      color: #fff;
      border: 0.2px solid transparent;
    }
  }
`;
const NewRelease = ({ data, title }) => {
  // console.log(data.all)
  const [dataList, setDataList] = useState(data?.all);
  useEffect(() => {
    setDataList(data?.all);
  }, [data]);
  const handle = (e) => {
    let target = e.target.name;
    if (target === "việt nam") {
      setDataList(data?.vPop);
    }
    if (target === "all") {
      setDataList(data?.all);
    }
    if (target === "others") {
      setDataList(data?.others);
    }
  };
  var buttons = document.querySelectorAll(".btn");
//   console.log(buttons);
  buttons.forEach(function (button) {
    // console.log(button);
    button.addEventListener("click", function () {
      buttons.forEach(function (button) {
        button.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: "1.2rem", margin: "10px 0" }}>
        {title}
      </div>
      <ButtonStyle>
        <button
          name="all"
          onClick={handle}
          className='btn active'
        >
          TẤT CẢ
        </button>
        <button
          name="việt nam"
          onClick={handle}
          className='btn'
        >
          VIỆT NAM
        </button>
        <button name="others" onClick={handle} className='btn'>
          QUỐC TẾ
        </button>
      </ButtonStyle>
      <ListStyle>
        {dataList?.map((item) => {
          return <SongItem data={item} key={item.encodeId} />;
        })}
      </ListStyle>
    </div>
  );
};

export default NewRelease;
