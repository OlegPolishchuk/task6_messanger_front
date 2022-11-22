import {RootState} from "store/store";

export const selectUser = (state: RootState) => {
  return state.appReducer.user
}