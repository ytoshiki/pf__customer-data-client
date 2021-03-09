import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const reviewsSelector = (state: StoreTypes) => state.reviews.reviews;

export const overallratingSelector = createSelector(reviewsSelector, (reviews) => {
  const count = reviews.length;

  let sum = 0;
  for (let review of reviews) {
    sum += review.rating;
  }

  return sum / count;
});
