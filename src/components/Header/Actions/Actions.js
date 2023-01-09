import React from "react";
import {
  ActionContainer,
  ActionItem,
} from "../../../styles/Header/styled.actions";
import Tippy from "@tippyjs/react";
import { RiVipLine, RiLoginCircleLine } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

import TippyHeadless from "@tippyjs/react/headless"; //

const Action = () => {
  return (
    <ActionContainer>
      <Tippy content="Nâng cấp VIP">
        <ActionItem>
          <RiVipLine />
        </ActionItem>
      </Tippy>
      <Tippy content="Tải nhạc lên">
        <ActionItem>
          <IoCloudUploadOutline />
        </ActionItem>
      </Tippy>
      <TippyHeadless
        interactive
        trigger="click"
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <ul>danh sach</ul>
          </div>
        )}
      >
        <ActionItem>
          <CiSettings />
        </ActionItem>
      </TippyHeadless>
      <Tippy content="Đăng nhập">
        <ActionItem>
          <RiLoginCircleLine />
        </ActionItem>
      </Tippy>
    </ActionContainer>
  );
};

export default Action;
