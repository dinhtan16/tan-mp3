import { combineReducers } from "redux";

import homeDataReducer from "./Slices/HomeDataSlice";
import setIDReducer from "./Slices/setIDSlice";

import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const bannerConfig = {
    ...persistConfig,
    key:'banner',
    whitelist:['banner']
}
const setIDConfig = {
  ...persistConfig,
  key:'setID',
  whitelist:['currSongID','currAlbumID']
}
const rootReducer = combineReducers({
  homeData: persistReducer(bannerConfig,homeDataReducer),
  setID:persistReducer(setIDConfig,setIDReducer),
});
export default rootReducer;
