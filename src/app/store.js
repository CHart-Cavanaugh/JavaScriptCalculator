import { configureStore } from "@reduxjs/toolkit";
import displayTextReducer from './slices/displayTextSlice';



const store = configureStore({

  reducer: {
    displayText: displayTextReducer,
  }

});



export default store;