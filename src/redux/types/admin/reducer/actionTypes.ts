import { AdminActionName } from '../AdminActionName';

interface FETCH_ADMIN {
  type: AdminActionName.FETCH_ADMIN;
  payload: {
    name: string;
    token: string;
  };
}

interface LOGOUT_ADMIN {
  type: AdminActionName.LOGOUT_ADMIN;
}

export type ActionTypes = FETCH_ADMIN | LOGOUT_ADMIN;
