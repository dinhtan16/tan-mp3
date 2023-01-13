import React, { memo } from 'react'
import {Audio} from 'react-loader-spinner'
import styled from 'styled-components'
const AudioLoading = styled.div`
  border: 0.5px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 999px;
     
      `
const AudioPlaying = () => {
  return (
 <AudioLoading>
      <Audio
        height="40"
        width="40"
        color="#fff"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
 </AudioLoading>
  )
}

export default memo(AudioPlaying)