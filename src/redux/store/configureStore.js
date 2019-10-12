import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../ducks/createReducer';
// Constants
import { initialState } from '../../constants';

const rootReducer = createReducer();
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;
