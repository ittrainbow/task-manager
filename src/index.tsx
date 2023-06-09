import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.scss'

import App from './App'
import { store } from './redux/store'
import { ContextProvider } from './context/Context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
)
