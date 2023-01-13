import React from "react";
import { IoLogoAppleAppstore } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;
    gap: 1rem;
    .info {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px 40px;
      cursor: pointer;
      justify-content: center;
      gap: 10px;
      border: 1px solid grey;
      color: #fff;
      background-color: black;
      font-weight: 600;
    }
  }
`;
const Sorry = () => {
  return (
    <Container>
      <divc className="content">
        <div>Xin lỗi, chúng tôi chưa hỗ trợ mobile vào thời điểm này.</div>
        <div className="info">
          <a href="https://apps.apple.com/vn/app/zing-mp3-%C4%91%E1%BB%89nh-cao-%C3%A2m-nh%E1%BA%A1c/id992357547">
            Tải app tại
          </a>
          <IoLogoAppleAppstore size={24} />
        </div>
      </divc>
    </Container>
  );
};

export default Sorry;
