import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginUser} from "store/reducer/actions/actions";
import {InitialState} from "store/reducer/types";
import {LoginResponse} from "api/types";
import {handleAxiosError} from "store/utils/handleAxiosError";
import {Message} from "store/reducer/types/Message";
import {ExistedUsers} from "store/reducer/types/InitialState";


const initialState: InitialState = {
  user: {
    username: '',
    id: '',
  },
  messages: [],
  existedUsers: [],
  error: '',
  isLoading: false,
  isEntered: false,
  socketId: '',
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      console.log(`setMessages`, action.payload)
      state.messages = action.payload;
    },

    setSingleMessage: (state, action: PayloadAction<Message>) => {
      console.log(`setSingleMessage`, action.payload)
      state.messages = [action.payload, ...state.messages]
    },

    setExistedUsers: (state, action: PayloadAction<ExistedUsers[]>) => {
      state.existedUsers = action.payload;
    },

    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload.user;
      state.isEntered = true;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = handleAxiosError(action.payload);
    })
  }
})

export const appReducer = appSlice.reducer;
export const {setMessages, setExistedUsers, setSingleMessage, setSocketId} = appSlice.actions;