import { connect, Provider } from 'react-redux';
import { StrictMode } from 'react';
import { setInput, setResult, setDisplayText, resetDisplay, powerOff } from '../app/slices/displayTextSlice';
import App from "./App";
import store from '../app/store';



const mapStateToProps = (state) => {
  return {
    appState: state
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setInput: newInput => {
      dispatch(setInput(newInput));
    },
    setResult: newResult => {
      dispatch(setResult(newResult));
    },
    setDisplayText: displayText => {
      dispatch(setDisplayText(displayText));
    },
    resetDisplay: () => {
      dispatch(resetDisplay());
    },
    powerOff: () => {
      dispatch(powerOff());
    },
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(App);
const AppWrapper = () => {

  return (

    <StrictMode>
      <Provider store={store}>
        <Container />
      </Provider>
    </StrictMode>

  );

};



export default AppWrapper;