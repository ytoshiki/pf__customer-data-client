import { StateTypes as ReviewTypes } from '../reducers/review/reviewReducer';

export interface StoreTypes {
  customers: {
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
  };
  products: {
    products: {
      name: string;
      id: string;
      price: number;
      images: string[];
      category: string;
      reviews: null | string[];
      createdAt: string;
    }[];
    loading: boolean;
  };
  categories: {
    categories: {
      id: string;
      name: string;
      image: string;
      heading: string;
      paragraph: string;
      products: [] | string[];
    }[];
    loading: boolean;
  };
  reviews: ReviewTypes;
}
