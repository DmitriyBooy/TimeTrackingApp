import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'moment/locale/ru'
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './store'
import router from './router'

import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <Provider store={store}>
          {/*<App />*/}
          <RouterProvider router={router} />
      </Provider>
);

reportWebVitals();
