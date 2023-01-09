import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHome } from "../../api/getHomeAPI";


export const getHomeData = createAsyncThunk("homeData/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const banner =items?.find(item => item.sectionType === "banner")
  return banner;
});
const homeDataSlice = createSlice({
  name: "homeData",
  initialState: {
    banner: [],
  },
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(getHomeData.fulfilled,(state,action) => {
      state.banner = action.payload;

      })
  }

});

// export const { getHomeData } = homeDataSlice.actions;
export default homeDataSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },