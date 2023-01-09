import { createSlice } from "@reduxjs/toolkit";



const songSlice = createSlice({
  name: "song",
  initialState: {
    currSongID:null,
    currAlbumID:null,
    isPlayAudio:false
  },
  reducers: {
    setCurrSong:(state,action) =>{
        return {
          ...state,
          currSongID:action.payload
        }
    },
    setCurrAlbum:(state,action) =>{
      return {
        ...state,
        currAlbumID:action.payload
      }
  },
  setIsPlayAudio:(state,action) =>{
    return {
      ...state,
      isPlayAudio:action.payload
    }
}
  },
 

});

export const { setCurrSong,setCurrAlbum ,setIsPlayAudio} = songSlice.actions;
export default songSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },