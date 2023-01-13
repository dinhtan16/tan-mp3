import { combineReducers } from "redux";

import homeDataReducer from "./Slices/HomeDataSlice";
import setIDReducer from "./Slices/setIDSlice";
import PlaylistReducer from "./Slices/PlaylistSlice";

import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const bannerConfig = {
    ...persistConfig,
    key:'homeData',
    whitelist:['banner','theme','musicEveryday','topHundred','xone' ,'hAlbum','artistHome','newRelease']
}
const setIDConfig = {
  ...persistConfig,
  key:'setID',
  whitelist:['currSongID','currAlbumID','atAlbum']
}
const playlistConfig = {
  ...persistConfig,
  key:'playlist',
  // whitelist:['songData']
}
const rootReducer = combineReducers({
  homeData: persistReducer(bannerConfig,homeDataReducer),
  setID:persistReducer(setIDConfig,setIDReducer),
  playlist:persistReducer(playlistConfig,PlaylistReducer)
});
export default rootReducer;