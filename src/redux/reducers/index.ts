import { combineReducers } from 'redux';
import { customerReducer } from './customer/customerReducer';

export const reducers = combineReducers({
  customers: customerReducer
});
