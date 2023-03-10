import { combineReducers } from "redux";

import homeDataReducer from "./Slices/HomeDataSlice";
import setIDReducer from "./Slices/setIDSlice";
import PlaylistReducer from "./Slices/PlaylistSlice";
import searchReducer from "./Slices/SearchSlice";
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import artistReducer from "./Slices/ArtistSlice";
const persistConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const homeConfig = {
    ...persistConfig,
    key:'homeData',
    whitelist:['banner','theme','musicEveryday','topHundred','xone' ,'hAlbum','artistHome','newRelease','weekChart']
}
const setIDConfig = {
  ...persistConfig,
  key:'setID',
  whitelist:['currSongID','currAlbumID','atAlbum','recentAlbumId','recentPlayedSong']
}
const playlistConfig = {
  ...persistConfig,
  key:'playlist',
  whitelist:['songSearchData','recentSongData']
}
const searchResultConfig = {
  ...persistConfig,
  key:'searchRes',
  whitelist:['searchData','keyword','artistData']
}
const rootReducer = combineReducers({
  homeData: persistReducer(homeConfig,homeDataReducer),
  setID:persistReducer(setIDConfig,setIDReducer),
  playlist:persistReducer(playlistConfig,PlaylistReducer),
  search:persistReducer(searchResultConfig,searchReducer),
  artist:artistReducer
});
export default rootReducer;
