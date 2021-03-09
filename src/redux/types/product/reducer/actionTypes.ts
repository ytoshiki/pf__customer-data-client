import { ProductActionName } from '../actionName';

interface FETCH_PRODUCTS {
  type: ProductActionName.FETCH_PRODUCTS;
  payload: {
    name: string;
    id: string;
    price: number;
    images: string[];
    category: string;
    reviews: null | string[];
    createdAt: string;
  }[];
}

interface INIT {
  type: ProductActionName.START_PRODUCTS_ACTION;
}

export type ActionTypes = FETCH_PRODUCTS | INIT;
