import { createStore, subscribe } from 'redux';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
console.log('[store/index.js] persistedState', persistedState)
import reducers from '../reducers';

const store = createStore(
  reducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  saveState(store.getState());
})
export default store;