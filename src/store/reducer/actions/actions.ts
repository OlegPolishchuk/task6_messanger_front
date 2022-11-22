import {Api} from "api";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('app/login',
  async (username: string, {rejectWithValue}) => {
  try {
    const {data} = await Api.loginUser(username);

    return data;
  } catch (e) {
    return rejectWithValue(e)
  }
})
