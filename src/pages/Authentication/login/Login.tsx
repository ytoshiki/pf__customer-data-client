import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../../redux';
import '../LoginPage.scss';

import { AuthError, AuthInfo } from '../signup/Signup';

export interface LoginProps {
  fetchAdmin: any;
}

const Login: React.FC<LoginProps> = ({ fetchAdmin }) => {
  const [errors, setErrors] = useState<AuthError>({
    name: '',
    password: '',
    req: ''
  });
  const [form, setForm] = useState<AuthInfo>({
    name: '',
    password: ''
  });

  const checkValidation = () => {
    let success = true;

    const temError = {
      name: '',
      password: ''
    };

    if (!form.name) {
      temError.name = 'Name is required';

      if (success) success = false;
    }

    if (!form.password) {
      temError.password = 'Password is required';

      if (success) success = false;
    }

    if (form.password.length < 6) {
      temError.password = 'Password must include at least 6 characters';

      if (success) success = false;
    }

    if (temError.name || temError.password) {
      setErrors({
        ...errors,
        name: temError.name,
        password: temError.password
      });
    }

    return success;
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const valid = checkValidation();

    if (!valid) return;

    try {
      const request = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/login`, form);
      const response = request.data;

      if (!response.success) {
        throw new Error();
      }

      sessionStorage.setItem('admin-token', response.token);
      sessionStorage.setItem('admin-name', response.admin.name);
      fetchAdmin({
        name: response.admin.name,
        token: response.token
      });
    } catch (error) {
      setErrors({
        ...errors,
        req: `Either name or password is incorrect`
      });
    }
  };

  return (
    <div className='loginPage__form'>
      <div className='loginPage__form-inner'>
        <h1>Login</h1>
        {errors.req && errors.req}
        <form action='' onSubmit={submitForm}>
          <div className='loginPage__form-block'>
            <label htmlFor=''>Name</label>
            <input type='text' value={form?.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          {errors?.name}
          <div className='loginPage__form-block'>
            <label htmlFor=''>Password</label>
            <input type='password' value={form?.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {errors?.password}
          <button>log in</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAdmin: (auth: { name: string; token: string }) => dispatch(fetchAdmin(auth))
  };
};

export default connect(null, mapDispatchToProps)(Login);
