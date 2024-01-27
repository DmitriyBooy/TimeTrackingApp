import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import 'moment/locale/ru'

import { Provider } from 'react-redux'
import store from './store'
import router from './router'

import { RouterProvider } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
)
