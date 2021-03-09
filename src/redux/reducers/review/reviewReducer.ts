import { ActionTypes } from '../../types/review/reducer/actionTypes';
import { ReviewActionNames } from '../../types/review/actionName';

export interface Review {
  id: string;
  rating: number;
  product: string;
  customer: string;
  comment: null | string;
  createdAt: string;
}

export interface StateTypes {
  reviews: Review[];
  loading: boolean;
}

const initialState = {
  reviews: [],
  loading: false
};

export const reviewReducer = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ReviewActionNames.START_REVIEWS_ACTION:
      return {
        ...state,
        loading: true
      };
    case ReviewActionNames.FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
