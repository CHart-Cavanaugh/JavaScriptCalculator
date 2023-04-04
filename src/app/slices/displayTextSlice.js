import { createSlice } from "@reduxjs/toolkit";



export const displayTextSlice = createSlice({

  name: "displayText",
  initialState: {

    input: "",
    result: "",

  },
  reducers: {

    setInput: (state, action) => {
      state.input = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setDisplayText: (state, action) => {
      state.input = action.payload.input;
      state.result = action.payload.result;
    },
    resetDisplay: state => {
      state.input = "";
      state.result = "0";
    },
    powerOff: state => {
      state.input = "";
      state.result = "";
    },

  },
});



export const { setInput, setResult, setDisplayText, resetDisplay, powerOff } = displayTextSlice.actions;
export default displayTextSlice.reducer;