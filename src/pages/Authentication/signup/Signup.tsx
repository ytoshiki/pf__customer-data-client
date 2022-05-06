import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../../redux';
import '../LoginPage.scss';

export interface SignupProps {
  setSuccess?: any;

  fetchAdmin: any;
}

export interface AuthInfo {
  name: string;
  password: string;
}

export interface AuthError {
  name: string;
  password: string;
  req: string;
}

const Signup: React.FC<SignupProps> = ({ setSuccess, fetchAdmin }) => {
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
      const request = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/register`, form);

      const response = await request.data;

      if (!response.success) {
        throw new Error();
      }

      sessionStorage.setItem('admin', response.token);

      fetchAdmin({
        name: response.admin.name,
        token: response.token
      });
    } catch (error) {
      console.log(error);
      setErrors({
        ...errors,
        req: `${form.name} is already taken. Try another one`
      });
    }
  };

  return (
    <div className='loginPage__form'>
      <div className='loginPage__form-inner'>
        <h1>Signup</h1>
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
          <button>sign up</button>
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

export default connect(null, mapDispatchToProps)(Signup);
