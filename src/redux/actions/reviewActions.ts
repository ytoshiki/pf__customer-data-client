import axios from 'axios';
import { ReviewActionNames } from '../types/review/actionName';

interface ReviewData {
  _id: string;
  rating: number;
  product: string;
  customer: string;
  comment: null | string;
  createdAt: string;
}

export const fetchAllReviews = () => {
  return async (dispatch: any) => {
    dispatch({
      type: ReviewActionNames.START_REVIEWS_ACTION
    });

    try {
      const response_01 = await axios(`${process.env.REACT_APP_API_ENDPOINT}/reviews`);
      const data_01 = await response_01.data;

      if (!data_01.success) {
        throw new Error(data_01.message || 'Fetch Error');
      }

      const reviews_01: ReviewData[] = data_01.reviews;

      const reviews_02 = reviews_01.map((review) => {
        return {
          id: review._id,
          rating: review.rating,
          product: review.product,
          customer: review.customer,
          comment: review.comment,
          createdAt: review.createdAt
        };
      });

      dispatch({
        type: ReviewActionNames.FETCH_REVIEWS,
        payload: reviews_02
      });
    } catch (error) {}
  };
};
