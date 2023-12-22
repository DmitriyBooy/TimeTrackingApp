import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'moment/locale/ru'
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './store'


import {
    BrowserRouter,
} from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <Provider store={store}>
          <BrowserRouter>
              <App/>
              {/*<AnimatedRoutes />*/}
          </BrowserRouter>
      </Provider>
);

reportWebVitals();
