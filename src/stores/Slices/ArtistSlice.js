import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtist } from "../../api/getArtist";

export const getArtistPage = createAsyncThunk(
  "artist/fetch",
  async (data) => {
    const {name} = data
    try {
      // console.log(id)
      const res = await getArtist(name);
      // console.log(res.data.data)
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
const ArtistSlice = createSlice({
  name: "artist",
  initialState: {
    artist: [],
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getArtistPage.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
    
  },
});

// export const { getHomeData } = homeDataSlice.actions;
export default ArtistSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },
