import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import App from './containers/app';

const rootReducer = require('./reducers/index').default;
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default class Main extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <App />
      </Provider>
    );
  }
}
