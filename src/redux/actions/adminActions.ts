import { AdminActionName } from '../types/admin/AdminActionName';

export const fetchAdmin = (auth: { name: string; token: string }) => {
  return (dispatch: any) => {
    dispatch({
      type: AdminActionName.FETCH_ADMIN,
      payload: auth
    });
  };
};

export const logOutAdmin = () => {
  return (dispatch: any) => {
    sessionStorage.removeItem('admin-name');
    sessionStorage.removeItem('admin-token');
    dispatch({
      type: AdminActionName.LOGOUT_ADMIN
    });
  };
};
