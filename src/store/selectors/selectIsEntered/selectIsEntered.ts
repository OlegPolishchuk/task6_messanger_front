import {RootState} from "store/store";

export const selectIsEntered = (state: RootState) => {
  return state.appReducer.isEntered
}