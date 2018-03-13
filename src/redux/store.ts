import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState?: object) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      sagaMiddleware, createLogger()
    )
  );
  // ssr testing
  // store.runSaga = sagaMiddleware.run;
  sagaMiddleware.run(rootSaga);
  return store;
}