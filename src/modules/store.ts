import { DefaultRootState } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import createRootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['router', 'snackbar'],
};

export const history = createBrowserHistory();

export const store = configureStore({
  middleware: [sagaMiddleware, routerMiddleware(history)],
  reducer: persistReducer<DefaultRootState>(persistConfig, createRootReducer(history)),
});
export const persistor = persistStore(store);

// after mounting the saga middleware in the store
sagaMiddleware.run(rootSaga);
