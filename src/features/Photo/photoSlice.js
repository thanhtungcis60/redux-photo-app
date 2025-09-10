import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photo",
  initialState: [],
  reducers: {
    addPhoto(state, action) {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = photoSlice;
export const { addPhoto } = actions;

export default reducer;
