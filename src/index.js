import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './static/bootstrap/css/bootstrap.css'
import './static/bootstrap/css/bootstrap-theme.css';

import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker'
import { store, history } from './store'
import { ApolloProvider } from 'react-apollo';
import client from './client'
import ApolloApp from './ApolloApp'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HashRouter>
        <div>
          <Route path='/' component={ApolloApp} />
        </div>
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
