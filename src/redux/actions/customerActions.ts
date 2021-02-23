import axios from 'axios';
import { generateKey, randomPurchase } from '../../helpers';
import { ActionTypes } from '../types/customer/reducer/actionTypes';
import { CustomerActionName } from '../types/customer/actionName';
import { store } from '../store/store';
import { StoreTypes } from '../store/storeTypes';

interface CustomerData {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
    medium: string;
  };
  nat: string;
  registered: {
    date: string;
  };
}

export const fetchAllCustomers = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CustomerActionName.START_CUSTOMERS_ACTION
    });

    try {
      const response_01 = await axios('https://randomuser.me/api/?results=200&nat=gb,dk,fr,no,nl');
      const data_01 = await response_01.data;

      if (data_01.error) {
        throw new Error('Server Error');
      }

      const customers_01: CustomerData[] = data_01.results;

      const customers_02 = customers_01.map((customer) => {
        return {
          id: generateKey(customer.name.first),
          name: customer.name.first + ' ' + customer.name.last,
          age: Math.floor(Math.random() * 25 + 17),
          purchase: [randomPurchase()],
          nationality: customer.nat,
          avator: customer.picture.large,
          email: customer.email,
          dateRegistered: customer.registered.date,
          gender: customer.gender
        };
      });

      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS,
        payload: customers_02
      });
    } catch (error) {}
  };
};

export const getCustomersByGender = (keyword: string) => {
  return (dispatch: any) => {
    dispatch({
      type: CustomerActionName.START_CUSTOMERS_ACTION
    });

    if (keyword === 'male') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_GENDER,
        payload: {
          keyword: 'male',
          category: 'gender'
        }
      });
    } else if (keyword === 'female') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_GENDER,
        payload: {
          keyword: 'female',
          category: 'gender'
        }
      });
    } else {
      return;
    }
  };
};

export const getCustomersByAge = (keyword: string) => {
  return (dispatch: any) => {
    dispatch({
      type: CustomerActionName.START_CUSTOMERS_ACTION
    });

    const state: StoreTypes = store.getState();

    const customers = state.customers.customers;

    if (!customers.length) {
      return;
    }

    if (keyword === '<20') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_AGE,
        payload: customers.filter((customer) => {
          return customer.age < 20;
        })
      });
    } else if (keyword === '20-29') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_AGE,
        payload: customers.filter((customer) => {
          return customer.age > 19 && customer.age < 30;
        })
      });
    } else if (keyword === '30-39') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_AGE,
        payload: customers.filter((customer) => {
          return customer.age > 29 && customer.age < 40;
        })
      });
    } else if (keyword === '>40') {
      dispatch({
        type: CustomerActionName.FETCH_CUSTOMERS_BY_AGE,
        payload: customers.filter((customer) => {
          return customer.age > 40;
        })
      });
    }
  };
};

export const getCustomersByNat = (keyword: string) => {
  return (dispatch: any) => {
    dispatch({
      type: CustomerActionName.START_CUSTOMERS_ACTION
    });

    const nats = ['GB', 'FR', 'DK', 'NO', 'NL'];

    if (!nats.includes(keyword)) {
      return;
    }

    dispatch({
      type: CustomerActionName.FETCH_CUSTOMERS_BY_NAT,
      payload: {
        keyword: keyword,
        category: 'nat'
      }
    });
  };
};
