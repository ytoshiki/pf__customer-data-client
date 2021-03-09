import { createSelector } from 'reselect';
import { productReducer } from '../../reducers/product/productReducer';
import { StoreTypes } from '../../store/storeTypes';

const productsSelector = (state: StoreTypes) => state.products.products;

// For newly Added Products

export const newlyAddedSelector = createSelector(productsSelector, (products) => {
  const now = new Date().setMonth(new Date().getMonth() - 1);

  const newlyAdded = products.filter((customer) => {
    const date = new Date(customer.createdAt);
    return date > new Date(now);
  }).length;

  return newlyAdded;
});
