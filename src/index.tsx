import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './index.scss'

import App from './App'
import { store } from './redux/store'

const { REACT_APP_MONGO_URI } = process.env

const client = new ApolloClient({ uri: REACT_APP_MONGO_URI, cache: new InMemoryCache() })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)
