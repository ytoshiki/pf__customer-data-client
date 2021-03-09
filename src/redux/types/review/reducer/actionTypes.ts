import { Review } from '../../../reducers/review/reviewReducer';
import { ReviewActionNames } from '../actionName';

interface FETCH_REVIEWS {
  type: ReviewActionNames.FETCH_REVIEWS;
  payload: Review[];
}

interface INIT {
  type: ReviewActionNames.START_REVIEWS_ACTION;
}

export type ActionTypes = FETCH_REVIEWS | INIT;
