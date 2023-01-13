import React, { memo } from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div className="container-fade">
      <div className="fade-loading"></div>
    </div>
  );
};

export default memo(Loading);
