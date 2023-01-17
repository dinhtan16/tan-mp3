import React, { memo } from 'react'
import "./loading.css";

const AlbumLoading = () => {
  return (
    <div className='load-container'><span className="loader"></span></div>
  )
}

export default memo(AlbumLoading)