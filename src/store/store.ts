import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReducer} from "store/reducer/appReducer";

const rootReducer = combineReducers({
  appReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;