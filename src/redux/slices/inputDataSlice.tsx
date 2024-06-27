import { createSlice } from "@reduxjs/toolkit";

interface inputState {
  inputData: any;
  openDialog: boolean;
}

const initialState: inputState = {
  inputData: {},
  openDialog: false,
};

const inputSlice = createSlice({
  name: "inputItems",
  initialState,
  reducers: {
    saveInput: (state, action) => {
      state.inputData = action.payload;
    },
    clearInput: (state) => {
      state.inputData = {};
    },
    openDialog: (state) => {
      state.openDialog = true;
    },
    closeDialog: (state) => {
      state.openDialog = false;
    },
  },
});

export const { saveInput, openDialog, closeDialog, clearInput } =
  inputSlice.actions;
export default inputSlice;
