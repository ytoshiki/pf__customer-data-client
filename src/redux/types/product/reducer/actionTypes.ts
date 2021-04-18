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

interface ADD_PRODUCT {
  type: ProductActionName.ADD_PRODUCT;
  payload: {
    name: string;
    id: string;
    price: number;
    images: string[];
    category: string;
    reviews: null | string[];
    createdAt: string;
  };
}

interface UPDATE_PRODUCT {
  type: ProductActionName.UPDATE_PRODUCT;
  payload: {
    name: string;
    id: string;
    price: number;
    images: string[];
    category: string;
    reviews: null | string[];
    createdAt: string;
  };
}

interface DELETE_PRODUCT {
  type: ProductActionName.DELETE_PRODUCT;
  payload: {
    name: string;
    id: string;
    price: number;
    images: string[];
    category: string;
    reviews: null | string[];
    createdAt: string;
  };
}

export type ActionTypes = FETCH_PRODUCTS | INIT | ADD_PRODUCT | UPDATE_PRODUCT | DELETE_PRODUCT;
