import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancers
);

const store = createStore(reducer, composedEnhancers);

sagaMiddleware.run(saga);

export default store;
