// import { ActionTypes } from '../types/todo/reducer/actionTypes';
// import { StateType } from '../types/todo/reducer/stateType';
// import { TodoActionType } from '../types/todo/action/actionTypes';
import { ActionTypes } from '../../types/customer/reducer/actionTypes';
import { CustomerActionName } from '../../types/customer/actionName';

export interface StateTypes {
  customers: {
    id: string;
    name: string;
    age: number;
    purchase: any[];
    nationality: string;
    avator: null | string;
    email: string;
    dateRegistered: string;
    gender: string;
  }[];
  loading: boolean;
  customCustomers: {
    id: string;
    name: string;
    age: number;
    purchase: any[];
    nationality: string;
    avator: null | string;
    email: string;
    dateRegistered: string;
    gender: string;
  }[];
  customKeyword: string;
}

export const initialState = {
  customers: [],
  loading: false,
  customCustomers: [],
  customKeyword: ''
};

export const customerReducer = (state: StateTypes = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CustomerActionName.START_CUSTOMERS_ACTION:
      return {
        ...state,
        loading: true
      };
    case CustomerActionName.FETCH_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false
      };
    case CustomerActionName.FETCH_CUSTOMERS_BY_GENDER:
      return {
        ...state,
        customCustomers: state.customers.filter((customer) => {
          return customer.gender === action.payload.keyword;
        }),
        customKeyword: action.payload.category,
        loading: false
      };
    case CustomerActionName.FETCH_CUSTOMERS_BY_AGE:
      return {
        ...state,
        customCustomers: action.payload,
        customKeyword: 'age',
        loading: false
      };
    case CustomerActionName.FETCH_CUSTOMERS_BY_NAT:
      return {
        ...state,
        customCustomers: state.customers.filter((customer) => {
          return customer.nationality === action.payload.keyword;
        }),
        customKeyword: action.payload.category,
        loading: false
      };
    default:
      return state;
  }
};
