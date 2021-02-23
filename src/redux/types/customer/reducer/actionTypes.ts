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

interface FETCH_CUSTOMERS_BY_GENDER {
  type: CustomerActionName.FETCH_CUSTOMERS_BY_GENDER;
  payload: {
    keyword: string;
    category: string;
  };
}

interface FETCH_CUSTOMERS_BY_NAT {
  type: CustomerActionName.FETCH_CUSTOMERS_BY_NAT;
  payload: {
    keyword: string;
    category: string;
  };
}

interface FETCH_CUSTOMERS_BY_AGE {
  type: CustomerActionName.FETCH_CUSTOMERS_BY_AGE;
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

export type ActionTypes = FETCH_CUSTOMERS | INIT | FETCH_CUSTOMERS_BY_GENDER | FETCH_CUSTOMERS_BY_AGE | FETCH_CUSTOMERS_BY_NAT;
