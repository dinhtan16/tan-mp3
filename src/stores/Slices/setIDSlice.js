import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "song",
  initialState: {
    currSongID: null,
    currAlbumID: null,
    isPlayAudio: false,
    atAlbum: false,
    isActiveTab: null,
    isActiveRight: false,
    isLoadingAlbum: false,
  },
  reducers: {
    setCurrSong: (state, action) => {
      return {
        ...state,
        currSongID: action.payload,
      };
    },
    setCurrAlbum: (state, action) => {
      return {
        ...state,
        currAlbumID: action.payload,
      };
    },
    setIsPlayAudio: (state, action) => {
      return {
        ...state,
        isPlayAudio: action.payload,
      };
    },

    setAtAlbum: (state, action) => {
      return {
        ...state,
        atAlbum: action.payload,
      };
    },
    setIsActiveTab: (state, action) => {
      return {
        ...state,
        isActiveTab: action.payload,
      };
    },
    setIsActiveRight: (state, action) => {
      return {
        ...state,
        isActiveRight: action.payload,
      };
    },
    setIsLoadingAlbum: (state, action) => {
      return {
        ...state,
        isLoadingAlbum: action.payload,
      };
    },
  },
});

export const {
  setCurrSong,
  setCurrAlbum,
  setIsPlayAudio,
  setAtAlbum,
  setIsActiveTab,
  setIsActiveRight,
  setIsLoadingAlbum,
} = songSlice.actions;
export default songSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },
