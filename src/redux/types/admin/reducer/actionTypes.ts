import { AdminActionName } from '../AdminActionName';

interface FETCH_ADMIN {
  type: AdminActionName.FETCH_ADMIN;
  payload: {
    name: string;
    token: string;
  };
}

export type ActionTypes = FETCH_ADMIN;
