import {RootState} from "store/store";

export const selectUsername = (state: RootState) => state.appReducer.user.username;