import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import './static/bootstrap/css/bootstrap.css'
import './static/bootstrap/css/bootstrap-theme.css';

import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';

import AccessCodeApp from './AccessCodeApp'
import registerServiceWorker from './registerServiceWorker'

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store)


import { store, history } from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' component={AccessCodeApp} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
