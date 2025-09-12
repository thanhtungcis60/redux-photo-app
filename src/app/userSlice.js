import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

const { default: reducer } = require("features/Photo/photoSlice");

export const getMe = createAsyncThunk("user/getMe", async () => {
  //Call api to get current user info
  const response = await userApi.getMe();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    loading: false,
    error: "",
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Fetch failed";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.error = "";
      });
  },
});
const { reducer: userReducer } = userSlice;
export default userReducer;
