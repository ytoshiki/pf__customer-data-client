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
    default:
      return state;
  }
};
