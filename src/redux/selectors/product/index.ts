import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const productsSelector = (state: StoreTypes) => state.products.products;

// For newly Added Products

export const newlyAddedSelector = createSelector(productsSelector, (products) => {
  const now = new Date();

  const lastMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

  const newlyAdded = products.filter((customer) => {
    const date = new Date(customer.createdAt);
    return date > new Date(lastMonth);
  }).length;

  return newlyAdded;
});
