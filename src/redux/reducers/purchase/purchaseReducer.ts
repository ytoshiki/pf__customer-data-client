import { ActionTypes } from '../../types/purchase/reducer/actionTypes';

import { PurchaseActionNames } from '../../types/purchase/actionNames';

export interface Purchase {
  id: string;
  customer: string;
  product: string;
  createdAt: Date;
}

export interface StateTypes {
  purchases: Purchase[];
  loading: boolean;
}

const initialState = {
  purchases: [],
  loading: false
};

export const purchaseReducer = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PurchaseActionNames.START_PURCHASES_ACTION:
      return {
        ...state,
        loading: true
      };
    case PurchaseActionNames.FETCH_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
