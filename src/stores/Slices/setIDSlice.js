import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "song",
  initialState: {
    currSongID: null,
    currAlbumID: null,
    isPlayAudio: false,
    atAlbum: false,
    isActiveTab: null,
    isActiveRight: true,
    isLoadingAlbum: false,
    recentAlbumId:null,
    recentPlayedSong:[]
  },
  reducers: {
    setCurrSong: (state, action) => {
      return {
        ...state,
        currSongID: action.payload,
      };
    },
    setRecentAlbumId: (state, action) => {
      return {
        ...state,
        recentAlbumId: action.payload,
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
    setRecentPlayedSong: (state, action) => {
      let songLists = state.recentPlayedSong
      if(state.recentPlayedSong?.some(i => i.encodeId === action.payload.encodeId)){
        songLists= songLists.filter(i => i.encodeId !== action.payload.encodeId)
      }
      if(action.payload){
        if(songLists.length > 20){
          songLists = songLists.filter((i,index,self) => index !== self.length -1)
        }
      }
      songLists = [action.payload,...songLists]
      
      return {
        ...state,
        recentPlayedSong : songLists
    }
   } 
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
  setRecentAlbumId,
  setRecentPlayedSong
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
