import { ActionTypes } from '../../types/product/reducer/actionTypes';
import { ProductActionName } from '../../types/product/actionName';

export interface StateTypes {
  products: {
    name: string;
    id: string;
    price: number;
    images: string[];
    category: string;
    reviews: null | string[];
    createdAt: string;
  }[];
  loading: boolean;
}

export const initialState = {
  products: [],
  loading: false
};

export const productReducer = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ProductActionName.START_PRODUCTS_ACTION:
      return {
        ...state,
        loading: true
      };
    case ProductActionName.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case ProductActionName.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.push(action.payload),
        loading: false
      };
    case ProductActionName.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.push(action.payload),
        loading: false
      };
    case ProductActionName.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload.id),
        loading: false
      };
    default:
      return state;
  }
};
