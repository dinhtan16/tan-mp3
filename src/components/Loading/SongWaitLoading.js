import React, { memo } from "react";
import { RotatingLines } from "react-loader-spinner";
const SongWaitLoading = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="3"
      animationDuration="0.75"
      width="30"
      visible={true}
      
    />
  );
};

export default memo(SongWaitLoading);
