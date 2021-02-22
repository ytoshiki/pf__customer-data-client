import { CustomerActionName } from '../actionName';

interface FETCH_CUSTOMERS {
  type: CustomerActionName.FETCH_CUSTOMERS;
  payload: {
    id: string;
    name: string;
    age: number;
    purchase: any[];
    nationality: string;
    avator: null | string;
    email: string;
    dateRegistered: string;
  }[];
}

interface INIT {
  type: CustomerActionName.START_CUSTOMERS_ACTION;
}

export type ActionTypes = FETCH_CUSTOMERS | INIT;
