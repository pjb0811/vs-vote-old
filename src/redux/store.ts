import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState?: object) {
  const sagaMiddleware = createSagaMiddleware();
  const store: any = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware, createLogger())
  );

  sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
