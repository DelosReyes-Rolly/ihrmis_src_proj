import React from 'react';
import ReactDOM from 'react-dom';
import MainPageLayout from './views/index';
import './helpers/sass/styles.css'
import { Provider } from 'react-redux';
import store from './features/store/store';
ReactDOM.render(


  <React.StrictMode>
    <Provider store={store}>
      <MainPageLayout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


