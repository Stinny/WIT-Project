import { combineReducers } from 'redux';
import users from './users';
import listings from './listings';
import errors from './errors';
import { LOGOUT_SUCCESS } from '../actions/types';

//apps top level reducers
const appReducer = combineReducers({ users, listings, errors });

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
