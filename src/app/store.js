import { legacy_createStore, combineReducers } from "redux";
import displayTextReducer from './slices/displayTextSlice';



const rootReducer = combineReducers({
  displayText: displayTextReducer,
});
const createStore = legacy_createStore;
const store = createStore(rootReducer);



export default store;