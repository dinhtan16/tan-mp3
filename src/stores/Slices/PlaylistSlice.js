import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtistSong } from "../../api/getArtistSongAPI";
import { getDetailPlaylist } from "../../api/getDetailPlaylistAPI";
export const getPlaylistData = createAsyncThunk(
  "playlist/fetch",
  async (data) => {
    const {id} = data
    try {
      // console.log(id)
      const res = await getDetailPlaylist(id);

      // console.log(res.data?.data);
      return res.data.data.song?.items;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getSongFromPlayList = createAsyncThunk(
  "playlist-songSearch/fetch",
  async (data) => {
    const {id} = data
    try {
      // console.log(id)
      const res = await getArtistSong(id);
      if(res?.data.err === 0 ){
        return res?.data?.data
      }
      else{
        return
      }
      // console.log(res.data?.data);
      // return res.data.data.song?.items;
    } catch (error) {
      console.log(error);
    }
  }
);
const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    songData: [],
    songSearchData:[],
    recentSongData:[],
    recentTitlePlaylist:null,
    recentLink:null
  },
  reducers: {
    setRecentSongData:(state,action) =>{
      state.recentSongData = action.payload

    },
    setRecentTitle:(state,action) => {
      state.recentTitlePlaylist = action.payload
    },
    setRecentLink:(state,action) => {
      state.recentLink = action.payload
    }
    
  },
  extraReducers: (builder) => {

    builder.addCase(getPlaylistData.fulfilled, (state, action) => {
      state.songData = action.payload;
    });
    builder.addCase(getSongFromPlayList.fulfilled, (state, action) => {
      state.songSearchData = action.payload;
    });
  },
});

export const { setRecentSongData,setRecentTitle ,setRecentLink} = playlistSlice.actions;
export default playlistSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },
