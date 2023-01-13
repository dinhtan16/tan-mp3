import thunk from "redux-thunk";
import {
  configureStore,
} from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";

const middleWare = [thunk];
const preloadedState = {};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(...middleWare),
  preloadedState,
});
export const persistor = persistStore(store);
