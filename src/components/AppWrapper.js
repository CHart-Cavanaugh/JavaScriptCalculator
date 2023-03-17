import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import App from "./App";
import store from '../app/store';



const AppWrapper = () => {

  return (

    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>

  );

};



export default AppWrapper;