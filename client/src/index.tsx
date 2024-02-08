import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import 'moment/locale/ru'

import { Provider } from 'react-redux'
import store from './store'
import router from './router'

import { RouterProvider } from 'react-router-dom'

import { ConfigProvider, theme } from 'antd'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
    >
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
)
