import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createRouterMiddleware, ReduxRouterState } from '@lagunovsky/redux-react-router';
import { browserHistory } from './history';
import rootSaga from './rootSaga';
import { rootReducer } from './reducers';

export type State = { router: ReduxRouterState };

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(browserHistory);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddle) => getDefaultMiddle().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
