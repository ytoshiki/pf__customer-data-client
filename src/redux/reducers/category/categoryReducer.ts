import { ActionTypes } from '../../types/category/reducer/actionTypes';
import { CategoryActionName } from '../../types/category/actionName';

export interface StateTypes {
  categories: {
    id: string;
    name: string;
    image: string;
    heading: string;
    paragraph: string;
    products: [] | string[];
  }[];
  loading: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  heading: string;
  paragraph: string;
  products: [] | string[];
}

export const initialState = {
  categories: [],
  loading: false
};

export const categoryReducer = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CategoryActionName.START_CATEGORIES_ACTION:
      return {
        ...state,
        loading: true
      };
    case CategoryActionName.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case CategoryActionName.ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.push(action.payload),
        loading: false
      };
    case CategoryActionName.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.push(action.payload),
        loading: false
      };
    case CategoryActionName.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((product) => product.id !== action.payload._id),
        loading: false
      };
    default:
      return state;
  }
};
