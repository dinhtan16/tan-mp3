import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHome } from "../../api/getHomeAPI";


export const getHomeData = createAsyncThunk("homeData/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const banner =items?.find(item => item.sectionType === "banner")
  return banner;
});
export const getTheme1Data = createAsyncThunk("homeDataTheme/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const theme =items?.find(item => item.sectionId === "hAutoTheme1")
  return theme;
});
export const getArtistSlide = createAsyncThunk("artistHome/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const artistHomeSlide =items?.find(item => item.sectionId === "hArtistTheme")
  return artistHomeSlide;
});
export const getNewMusicEveryDay = createAsyncThunk("music_everyday/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const musicEveryday =items?.find(item => item.sectionId === "hAutoTheme2")
  return musicEveryday;
});
export const getTopHundred = createAsyncThunk("top100/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const getTop =items?.find(item => item.sectionId === "h100")
  return getTop;
});
export const getHXone = createAsyncThunk("HXone/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const getxone =items?.find(item => item.sectionId === "hXone")
  return getxone;
});
export const getHAlbum = createAsyncThunk("HAlbum/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const getHAlbum =items?.find(item => item.sectionId === "hAlbum")
  return getHAlbum;
});
export const getNewRelease = createAsyncThunk("newRelease/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const newRelease =items?.find(item => item.sectionType === "new-release")
  return newRelease;
});
export const getWeekChart = createAsyncThunk("weekChart/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const weekChart =items?.find(item => item.sectionType === "weekChart")
  return weekChart;
});
export const getEvent = createAsyncThunk("events/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const events =items?.find(item => item.title === "Sự kiện")
  return events;
});
export const getChart = createAsyncThunk("chart/fetch", async () => {
  const res = await getHome();
  const {data:{items}} = res.data
  const chart =items?.find(item => item.sectionType === "RTChart")
  return chart;
});
const homeDataSlice = createSlice({
  name: "homeData",
  initialState: {
    banner: [],
    theme :[],
    artistHome:[],
    musicEveryday:[],
    topHundred : [],
    xone:[],
    hAlbum:[],
    newRelease:[],
    weekChart:[],
    eventSlide:[],
    chart:[]
  },
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(getHomeData.fulfilled,(state,action) => {
      state.banner = action.payload;

      })
      .addCase(getTheme1Data.fulfilled,(state,action) => {
        state.theme = action.payload
      })
      .addCase(getArtistSlide.fulfilled,(state,action) => {
        state.artistHome = action.payload
      })
      .addCase(getNewMusicEveryDay.fulfilled,(state,action) => {
        state.musicEveryday= action.payload
      })
      .addCase(getTopHundred.fulfilled,(state,action) => {
        state.topHundred = action.payload
      })
      .addCase(getHXone.fulfilled,(state,action) => {
        state.xone = action.payload
      })
      .addCase(getHAlbum.fulfilled,(state,action) => {
        state.hAlbum = action.payload
      })
      .addCase(getNewRelease.fulfilled,(state,action) => {
        state.newRelease = action.payload
      })
      .addCase(getWeekChart.fulfilled,(state,action) => {
        state.weekChart = action.payload
      })
      .addCase(getEvent.fulfilled,(state,action) => {
        state.eventSlide= action.payload
      })
      .addCase(getChart.fulfilled,(state,action) => {
        state.chart = action.payload
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