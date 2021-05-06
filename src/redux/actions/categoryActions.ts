import { CategoryActionName } from '../types/category/actionName';
import axios from 'axios';
import { CategoryFormProps } from '../../components/form/CategoryForm';

interface CategoryData {
  name: string;
  _id: string;
  image: string;
  heading: string;
  paragraph: string;
  products: [] | string[];
}

export const fetchAllCategories = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CategoryActionName.START_CATEGORIES_ACTION
    });

    try {
      const response_01 = await axios(`${process.env.REACT_APP_API_ENDPOINT}/categories`);
      const data_01 = await response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const categories_01: CategoryData[] = data_01.categories;

      const categories_02 = categories_01.map((category) => {
        return {
          id: category._id,
          name: category.name,
          image: category.image,
          heading: category.heading,
          paragraph: category.paragraph,
          products: category.products
        };
      });

      dispatch({
        type: CategoryActionName.FETCH_CATEGORIES,
        payload: categories_02
      });
    } catch (error) {}
  };
};

export const addCategory = (form: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: CategoryActionName.START_CATEGORIES_ACTION
    });

    try {
      const response_01 = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/categories`, form);
      const data_01 = await response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const category: CategoryData = data_01.newCategory;

      const categories_02 = {
        id: category._id,
        name: category.name,
        image: category.image,
        heading: category.heading,
        paragraph: category.paragraph,
        products: category.products
      };

      dispatch({
        type: CategoryActionName.ADD_CATEGORY,
        payload: categories_02
      });

      return category;
    } catch (error) {
      console.log(error.message || 'FETCH ERROR');
      return false;
    }
  };
};

export const deleteCategoryById = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: CategoryActionName.START_CATEGORIES_ACTION
      });

      const request = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/categories/${id}`);

      const response = request.data;

      if (!response.success) {
        throw new Error(response.message || 'Request Error');
      }

      dispatch({
        type: CategoryActionName.DELETE_CATEGORY,
        payload: response.category
      });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
};

export const updateCategoryById = (id: string, form: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: CategoryActionName.START_CATEGORIES_ACTION
      });

      const request = await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/categories/${id}`, form);

      const response = request.data;

      if (!response.success) {
        throw new Error(response.message || 'Request Error');
      }

      dispatch({
        type: CategoryActionName.UPDATE_CATEGORY,
        payload: response.category
      });

      console.log('Category updated', response.category);

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
};
