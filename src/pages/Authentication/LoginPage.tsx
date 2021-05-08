import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router';
import { fetchAdmin, StoreTypes } from '../../redux';
import { Admin } from '../../redux/reducers/admin/adminReducer';
import Login from './login/Login';
import Signup from './signup/Signup';

export interface LoginPageProps {
  admin?: Admin;
  fetchAdmin?: any;
}

const LoginPage: React.FC<LoginPageProps> = ({ admin, fetchAdmin }) => {
  const [login, setLogin] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (admin?.name && admin?.token) return history.push('/');

    const name = sessionStorage.getItem('admin-name');
    const token = sessionStorage.getItem('admin-token');

    if (name && token) {
      fetchAdmin({
        name,
        token
      });

      return history.push('/');
    }
  }, [admin, fetchAdmin, history, location]);

  return (
    <>
      {admin?.name && admin.token ? (
        <Redirect to='/' />
      ) : (
        <div>
          {login ? <Login /> : <Signup />}
          <small>
            {login ? (
              <>
                <span>I don't have an accout yet.</span>
                <button onClick={() => setLogin(!login)}>Create a new account</button>
              </>
            ) : (
              <>
                <span>I already have an account.</span>
                <button onClick={() => setLogin(!login)}>Sign In</button>
              </>
            )}
          </small>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    admin: store.admin
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAdmin: (auth: { name: string; token: string }) => dispatch(fetchAdmin(auth))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
