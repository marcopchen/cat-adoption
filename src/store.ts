import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

function saveToLocalStorage(state: object) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return initialState;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
