import axios from 'axios';
import { ProductFormData } from '../../components/form/ProductForm';
import { ProductActionName } from '../types/product/actionName';

interface ProductData {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: any;
  reviews: null | string[];
  createdAt: string;
}

export const fetchAllProducts = () => {
  return async (dispatch: any) => {
    dispatch({
      type: ProductActionName.START_PRODUCTS_ACTION
    });

    try {
      const response_01 = await axios(`${process.env.REACT_APP_API_ENDPOINT}/products`);

      const data_01 = response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const products_01: ProductData[] = data_01.products;

      const products_02 = products_01.map((product) => {
        let category = '';
        if (product.category !== null) {
          category = product.category.name;
        }
        return {
          name: product.name,
          id: product._id,
          price: product.price,
          images: product.images,
          category: category,
          reviews: product.reviews,
          createdAt: product.createdAt
        };
      });

      dispatch({
        type: ProductActionName.FETCH_PRODUCTS,
        payload: products_02
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addProduct = (form: ProductFormData) => {
  return async (dispatch: any) => {
    dispatch({
      type: ProductActionName.START_PRODUCTS_ACTION
    });

    const requestData = {
      name: form.name,
      price: form.price,
      images: [form.images.img1, form.images.img2],
      category: form.category
    };
    try {
      const response_01 = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/products`, requestData);

      const data_01 = response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const product: ProductData = data_01.newProduct;

      const products_02 = {
        name: product.name,
        id: product._id,
        price: product.price,
        images: product.images,
        category: product.category.name,
        reviews: product.reviews,
        createdAt: product.createdAt
      };

      dispatch({
        type: ProductActionName.ADD_PRODUCT,
        payload: products_02
      });

      return true;
    } catch (error) {
      console.log(error.message || 'REQUEST ERROR');
      return false;
    }
  };
};

export const updateProduct = (id: string, form: ProductFormData) => {
  return async (dispatch: any) => {
    dispatch({
      type: ProductActionName.START_PRODUCTS_ACTION
    });

    const requestData = {
      name: form.name,
      price: form.price,
      images: [form.images.img1 && form.images.img1, form.images.img2 && form.images.img2],
      category: form.category
    };
    try {
      const response_01 = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/products/${id}`, requestData);

      const data_01 = response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const product: ProductData = data_01.product;

      const products_02 = {
        name: product.name,
        id: product._id,
        price: product.price,
        images: product.images,
        category: product.category.name,
        reviews: product.reviews,
        createdAt: product.createdAt
      };

      dispatch({
        type: ProductActionName.UPDATE_PRODUCT,
        payload: products_02
      });

      return true;
    } catch (error) {
      console.log(error.message || 'REQUEST ERROR');
      return false;
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: ProductActionName.START_PRODUCTS_ACTION
    });

    try {
      const response_01 = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/products/${id}`);

      const data_01 = response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const product: ProductData = data_01.product;

      const products_02 = {
        name: product.name,
        id: product._id,
        price: product.price,
        images: product.images,
        category: product.category.name,
        reviews: product.reviews,
        createdAt: product.createdAt
      };

      dispatch({
        type: ProductActionName.DELETE_PRODUCT,
        payload: products_02
      });

      return true;
    } catch (error) {
      console.log(error.message || 'REQUEST ERROR');
      return false;
    }
  };
};
