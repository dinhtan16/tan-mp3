import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtist } from "../../api/getArtist";
import { getSearch } from "../../api/getSearchAPI";
export const getSearchData = createAsyncThunk(
  "search/fetch",
  async (data) => {
    const {keyword} = data
    try {
      // console.log(id)
      const res = await getSearch(keyword);
      // console.log(res)
    
        return res?.data?.data
    } catch (error) {
       
      console.log(error);
    }
  }
);
export const getArtistData = createAsyncThunk(
  "artist/fetch",
  async (data) => {
    const {name} = data
    try {
      // console.log(id)
      const res = await getArtist(name);
      // console.log(res)
    
        return res?.data?.data
    } catch (error) {
       
      console.log(error);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
    keyword:null,
    artistData:[]
  },
  reducers: {
    setKeyword:(state,action) => {
      state.keyword = action.payload
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getSearchData.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
    builder.addCase(getArtistData.fulfilled,(state,action) => {
      state.artistData = action.payload
    })
    
  },
});

export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },
