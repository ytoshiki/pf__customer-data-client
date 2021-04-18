import { useState } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../../redux';

export interface CategoryFormProps {
  addCategory: any;
}

export interface CategoryFormData {
  name: string;
  image: string;
  heading: string;
  paragraph: string | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ addCategory }) => {
  const [form, setForm] = useState<CategoryFormData>({ name: '', image: '', heading: '', paragraph: null });

  const [errors, setErrors] = useState<{ name: string; image: string; heading: string; paragraph: string; request: string }>({ name: '', image: '', heading: '', paragraph: '', request: '' });

  const [successMessage, setSuccessMessage] = useState('');

  const submitForm = async () => {
    const success = await addCategory(form);

    console.log(success);

    if (!success) {
      setErrors({ ...errors, request: 'Something went wrong. Try another one' });
      return;
    }

    setSuccessMessage('Category Created Successfully');
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setErrors({ name: '', image: '', heading: '', paragraph: '', request: '' });

    let tempo_errors = {
      name: '',
      image: '',
      heading: '',
      paragraph: '',
      request: ''
    };

    let error = false;

    if (!form.name) {
      tempo_errors.name = 'Category name is required';
      if (!error) error = true;
    }

    if (!form.image) {
      tempo_errors.image = 'Category image is required';
      if (!error) error = true;
    }

    if (!form.heading) {
      tempo_errors.heading = 'Category heading is required';
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
          <label htmlFor=''>image</label>
          <input type='text' onChange={(e) => setForm({ ...form, image: e.target.value })} />
          {errors.image && errors.image}
        </div>
        <div>
          <label htmlFor=''>heading</label>
          <input type='text' onChange={(e) => setForm({ ...form, heading: e.target.value })} />
          {errors.heading && errors.heading}
        </div>
        <div>
          <label htmlFor=''>paragraph</label>
          <input type='text' onChange={(e) => setForm({ ...form, paragraph: e.target.value })} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCategory: (form: CategoryFormData) => dispatch(addCategory(form))
  };
};

export default connect(null, mapDispatchToProps)(CategoryForm);
