import { AdminActionName } from '../types/admin/AdminActionName';

export const fetchAdmin = (auth: { name: string; token: string }) => {
  return (dispatch: any) => {
    dispatch({
      type: AdminActionName.FETCH_ADMIN,
      payload: auth
    });
  };
};
