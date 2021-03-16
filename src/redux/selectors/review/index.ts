import { createSelector } from 'reselect';
import { StoreTypes } from '../../store/storeTypes';

const reviewsSelector = (state: StoreTypes) => state.reviews.reviews;

export const overallratingSelector = createSelector(reviewsSelector, (reviews) => {
  const count = reviews.length;

  let sum = 0;
  for (let review of reviews) {
    sum += review.rating;
  }

  let avarage = sum / count;
  return Math.floor(avarage * 10) / 10;
});

export const ratingPercentageSelector = createSelector(reviewsSelector, (reviews) => {
  let top = 0;
  let middle = 0;
  let bottom = 0;

  reviews.forEach((review) => {
    if (review.rating > 4.4) {
      top++;
    } else if (review.rating > 2.9 && review.rating < 4.5) {
      middle++;
    } else {
      bottom++;
    }
  });

  return {
    top: Math.floor((top / reviews.length) * 1000) / 10,
    middle: Math.floor((middle / reviews.length) * 1000) / 10,
    bottom: Math.floor((bottom / reviews.length) * 1000) / 10
  };
});
