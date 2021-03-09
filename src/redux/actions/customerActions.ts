import axios from 'axios';
import { CustomerActionName } from '../types/customer/actionName';
import { store } from '../store/store';
import { StoreTypes } from '../store/storeTypes';

interface CustomerData {
  gender: string;
  username: string;
  purchasedItems: string[];
  email: string;
  _id: string;
  age: number;
  avator: string;
  nat: string;
  dateRegistered: Date;
}

export const fetchAllCustomers = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CustomerActionName.START_CUSTOMERS_ACTION
    });

    try {
      const response_01 = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers`);
      const data_01 = await response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const customers_01: CustomerData[] = data_01.customers;

      const customers_02 = customers_01.map((customer) => {
        return {
          id: customer._id,
          name: customer.username,
          age: customer.age,
          purchase: customer.purchasedItems,
          nationality: customer.nat,
          avator: customer.avator,
          email: customer.email,
          dateRegistered: customer.dateRegistered,
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
