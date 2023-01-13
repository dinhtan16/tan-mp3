import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    songData: [],
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getPlaylistData.fulfilled, (state, action) => {
      state.songData = action.payload;
    });
  },
});

// export const { getHomeData } = homeDataSlice.actions;
export default playlistSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },
