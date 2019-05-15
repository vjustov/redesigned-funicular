import { createMiddleware } from 'redux-beacon';
import googleTagManager from '@redux-beacon/google-tag-manager';
import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  combineReducers,
  AnyAction
} from '../../../../Library/Caches/typescript/3.4.3/node_modules/redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const eventsMap = {
  ['CONFIRM_ADDRESS_SELECTION_FOR_DELIVERY']: (
    action: { type: 'ConfirmAddressSelectionForBilling' },
    state: {}
  ) => ({})
};

const createReduxBeaconMiddleware = () => {
  return createMiddleware(eventsMap, googleTagManager());
};

const composeEnhancers = (): StoreEnhancer<{}, {}> => {
  return composeWithDevTools(
    ...[applyMiddleware(...[createReduxBeaconMiddleware()])]
  );
};

export interface ReducerState {
  test: []
}
const initialState: ReducerState | undefined = { test: [] }
const reducer = combineReducers({
  app: (state = initialState, action: AnyAction): ReducerState => state,
})

const store = createStore<{ app: ReducerState; }, { type: {} }, {}, {}>(
  reducer,
  {},
  composeEnhancers()
);

ReactDOM.render(
  <Provider store={store}>
    <div />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
