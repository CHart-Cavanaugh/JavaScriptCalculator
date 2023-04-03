import App from "./App";
import store from '../app/store';

import { Provider } from 'react-redux';
import { StrictMode } from 'react';



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