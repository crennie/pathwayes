import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import promise from 'redux-promise'
import reducers from './forms/reducers';

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

//Configure middleware w/ redux-promise for AJAX requests
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
  logger
)(createStore)

export const store = createStoreWithMiddleware(reducers)
