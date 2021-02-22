import axios from 'axios';
import { generateKey, randomPurchase } from '../../helpers';
import { ActionTypes } from '../types/customer/reducer/actionTypes';
import { CustomerActionName } from '../types/customer/actionName';

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
          age: Math.floor(Math.random() * 40 + 10),
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
