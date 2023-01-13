import React, { memo } from 'react'
import "./loading.css";

const albumLoading = () => {
  return (
    <div className='load-container'><span className="loader"></span></div>
  )
}

export default memo(albumLoading)