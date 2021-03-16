import { combineReducers } from 'redux';
import { customerReducer } from './customer/customerReducer';
import { productReducer } from './product/productReducer';
import { categoryReducer } from './category/categoryReducer';
import { reviewReducer } from './review/reviewReducer';
import { purchaseReducer } from './purchase/purchaseReducer';

export const reducers = combineReducers({
  customers: customerReducer,
  products: productReducer,
  categories: categoryReducer,
  reviews: reviewReducer,
  purchases: purchaseReducer
});
