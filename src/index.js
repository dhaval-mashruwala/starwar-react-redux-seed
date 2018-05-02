import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './store';
import './main.css';

 import App from './App';

/* Add provider which makes store available to all the components in the application bootstrap the application */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
