import { AdminActionName } from '../../types/admin/AdminActionName';
import { ActionTypes } from '../../types/admin/reducer/actionTypes';

export interface Admin {
  token: string;
  name: string;
}

export const initialState = {
  token: '',
  name: ''
};

export const adminReducer = (state: Admin = initialState, action: ActionTypes) => {
  switch (action.type) {
    case AdminActionName.FETCH_ADMIN:
      return action.payload;
    case AdminActionName.LOGOUT_ADMIN:
      return initialState;
    default:
      return state;
  }
};
