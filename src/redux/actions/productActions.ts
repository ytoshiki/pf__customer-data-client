import axios from 'axios';
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
        return {
          name: product.name,
          id: product._id,
          price: product.price,
          images: product.images,
          category: product.category.name,
          reviews: product.reviews,
          createdAt: product.createdAt
        };
      });

      console.log(products_02);

      dispatch({
        type: ProductActionName.FETCH_PRODUCTS,
        payload: products_02
      });
    } catch (error) {}
  };
};
