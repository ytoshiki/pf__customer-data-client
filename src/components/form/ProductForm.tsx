import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductData } from '../../pages/customer/CustomerById';
import { addProduct, fetchAllCategories, StoreTypes } from '../../redux';
import { Category } from '../../redux/reducers/category/categoryReducer';
import ProductModal from '../modal/ProductModal';

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
      tempoErrors.price = 'price must be number';

      if (result) result = false;
    }

    if (form.images.img1 === '' && form.images.img2 === '') {
      tempoErrors.image = 'at least one image is required';

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
    <>
      {successMessage && successMessage}
      {error.request && error.request}
      <ProductModal isOpen={openModal} setIsOpen={setOpenModal} data={form} comfirm={addProduct} />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor=''>name</label>
          <input type='text' onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
          {error.name && error.name}
        </div>
        <div>
          <label htmlFor=''>price</label>
          <input type='text' onChange={(e) => setForm({ ...form, price: e.target.value })} value={form.price} />
          {error.price && error.price}
        </div>
        <div>
          <label htmlFor=''>images</label>
          <small>Up to 2 urls</small>
          <input type='text' onChange={(e) => setForm({ ...form, images: { ...form.images, img1: e.target.value } })} value={form.images.img1} />
          <input type='text' onChange={(e) => setForm({ ...form, images: { ...form.images, img2: e.target.value } })} value={form.images.img2} />
          {error.image && error.image}
        </div>
        <div>
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
          {error.category && error.category}
        </div>
        <button>Submit</button>
      </form>
    </>
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
