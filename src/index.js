import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import './static/bootstrap/css/bootstrap.css'
import './static/bootstrap/css/bootstrap-theme.css';

import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom';

import AccessCodeApp from './AccessCodeApp'
import registerServiceWorker from './registerServiceWorker'

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store)

import { store, history } from './store'

import agent from './agent'
import { ApolloProvider } from 'react-apollo';

import client from './client'

import ApolloApp from './ApolloApp'

// TODO: TRY A VERSION WITH NO REDUX
ReactDOM.render(
  <ApolloProvider client={client}>
  <HashRouter>
    <div>
      <Route path='/' component={ApolloApp} />
    </div>
  </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)


/*
ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route path='/' component={AccessCodeApp} />
      </div>
    </HashRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
*/

registerServiceWorker()
