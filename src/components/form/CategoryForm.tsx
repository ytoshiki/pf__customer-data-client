import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCategory } from '../../redux';
import './AddForm.scss';

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

    if (!success) {
      setErrors({ ...errors, request: 'Something went wrong. Try another one' });
      return;
    }

    setSuccessMessage(`Category Created Successfully`);
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
    <div className='addForm'>
      {successMessage && <p className='addForm__result is-success'>{successMessage}</p>}
      {errors.request && errors.request}
      <h1>Add a New Category</h1>
      <form onSubmit={onSubmit} className='addForm__form'>
        <div className='addForm__block'>
          <label htmlFor=''>*name</label>
          <input type='text' onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <span className='addForm__error'>{errors.name && errors.name}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>*image</label>
          <input type='text' onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <span className='addForm__error'>{errors.image && errors.image}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>*heading</label>
          <input type='text' onChange={(e) => setForm({ ...form, heading: e.target.value })} />
          <span className='addForm__error'>{errors.heading && errors.heading}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>paragraph</label>
          <input type='text' onChange={(e) => setForm({ ...form, paragraph: e.target.value })} />
        </div>
        <button className='addForm__button'>Preview</button>
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
