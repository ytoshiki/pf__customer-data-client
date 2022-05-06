import axios from 'axios';
import { useState } from 'react';

export interface AdminFormProps {}

const AdminForm: React.FC<AdminFormProps> = () => {
  const [form, setForm] = useState<{ name: string; password: string }>({ name: '', password: '' });

  const [errors, setErrors] = useState<{ name: string; password: string; request: string }>({ name: '', password: '', request: '' });

  const [successMessage, setSuccessMessage] = useState('');

  const submitForm = async () => {
    try {
      const request = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/register`, form);

      const response = await request.data;

      console.log(response);
      if (!response.success) {
        throw new Error(response.message || 'FETCH ERROR');
      }

      setSuccessMessage('Admin Created Successfully');
    } catch (error) {
      console.log(error.message || 'FETCH ERROR');
      setErrors({ ...errors, request: 'Something went wrong. Parhaps the admin name is already used. Try another one' });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setErrors({ name: '', password: '', request: '' });

    let tempo_errors = {
      name: '',
      password: '',
      request: ''
    };

    let error = false;

    if (form.password.length < 6) {
      tempo_errors.password = 'Password must include at least 6 characters';
      if (!error) error = true;
    }

    if (form.name.length < 3) {
      tempo_errors.name = "Admin's name must include at least 3 characters";
      if (!error) error = true;
    }

    if (error) {
      setErrors(tempo_errors);
      return;
    }

    submitForm();
  };

  return (
    <div>
      {successMessage && successMessage}
      {errors.request && errors.request}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor=''>name</label>
          <input type='text' onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name && errors.name}
        </div>
        <div>
          <label htmlFor=''>password</label>
          <input type='password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {errors.password && errors.password}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
