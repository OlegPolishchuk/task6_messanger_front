import {Api} from "api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleAxiosError} from "store/utils/handleAxiosError";


export const loginUser = createAsyncThunk('app/login',
  async (username: string, {rejectWithValue}) => {
  try {
    const {data} = await Api.loginUser(username);

    return data;
  } catch (e) {
    return rejectWithValue(handleAxiosError(e))
  }
})

