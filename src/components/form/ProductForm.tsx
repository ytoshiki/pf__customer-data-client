import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductData } from '../../pages/customer/CustomerById';
import { addProduct, fetchAllCategories, StoreTypes } from '../../redux';
import { Category } from '../../redux/reducers/category/categoryReducer';
import ProductModal from '../modal/ProductModal';
import './AddForm.scss';

export interface ProductFormProps {
  categories: Category[];
  fetchCategories: any;
  addNewProduct: any;
}

export interface ProductFormData {
  name: string;
  price: string;
  images: {
    img1: string;
    img2: string;
  };
  category: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ categories, fetchCategories, addNewProduct }) => {
  const [openModal, setOpenModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [form, setForm] = useState<ProductFormData>({
    name: '',
    price: '',
    images: {
      img1: '',
      img2: ''
    },
    category: ''
  });

  const [error, setError] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    request: ''
  });

  useEffect(() => {
    if (categories.length) {
      return;
    }

    fetchCategories();
  }, [categories, fetchCategories]);

  const addProduct = async () => {
    try {
      const success = await addNewProduct(form);

      if (!success) {
        setError({ ...error, request: 'Something went wrong. Try again' });
        return;
      }

      setSuccessMessage('Product Added Successfully');
    } catch (error) {}
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    setError({
      name: '',
      price: '',
      category: '',
      image: '',
      request: ''
    });

    const tempoErrors = {
      name: '',
      price: '',
      category: '',
      image: '',
      request: ''
    };

    let result = true;

    if (form.name.length < 3) {
      tempoErrors.name = 'Product name must include 3 characters';

      if (result) result = false;
    }

    if (!Number(form.price)) {
      tempoErrors.price = 'Price must be number';

      if (result) result = false;
    }

    if (form.images.img1 === '' && form.images.img2 === '') {
      tempoErrors.image = 'At least one image is required';

      if (result) result = false;
    }

    if (form.category === '') {
      tempoErrors.category = 'Category is required';

      if (result) result = false;
    }

    if (!result) {
      setError(tempoErrors);
      return;
    }

    setOpenModal(true);
  };

  return (
    <div className='addForm'>
      {successMessage && <p className='addForm__result is-success'>{successMessage}</p>}
      <span className='addForm__error'>{error.request && error.request}</span>
      <ProductModal isOpen={openModal} setIsOpen={setOpenModal} data={form} comfirm={addProduct} />
      <h1>Add a New Product</h1>
      <form onSubmit={onSubmit} className='addForm__form'>
        <div className='addForm__block'>
          <label htmlFor=''>*name</label>
          <input type='text' onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
          <span className='addForm__error'>{error.name && error.name}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>*price</label>
          <input type='text' onChange={(e) => setForm({ ...form, price: e.target.value })} value={form.price} />
          <span className='addForm__error'>{error.price && error.price}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>*images</label>
          <small className='addForm__option'>Up to 2 urls</small>
          <input type='text' onChange={(e) => setForm({ ...form, images: { ...form.images, img1: e.target.value } })} value={form.images.img1} />
          <input type='text' onChange={(e) => setForm({ ...form, images: { ...form.images, img2: e.target.value } })} value={form.images.img2} />
          <span className='addForm__error'>{error.image && error.image}</span>
        </div>
        <div className='addForm__block'>
          <label htmlFor=''>Category</label>
          {categories.length && (
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
            >
              <option>Select Category</option>
              {categories.map((category, index) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          )}
          <span className='addForm__error'>{error.category && error.category}</span>
        </div>
        <button className='addForm__button'>Preview</button>
      </form>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    categories: store.categories.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(fetchAllCategories()),
    addNewProduct: (form: ProductFormData) => dispatch(addProduct(form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
