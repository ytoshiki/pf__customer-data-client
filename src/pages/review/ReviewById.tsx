import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from 'react-rating';

import { useParams } from 'react-router';
import ReviewTable from '../../components/table/ReviewTable';
import { ReviewData } from './AllReviews';

export interface ReviewByIdProps {}

const ReviewById: React.FC<ReviewByIdProps> = () => {
  const params = useParams();

  const id: string = (params as any).id;

  const [review, setReview] = useState<ReviewData>();

  useEffect(() => {
    if (review) {
      return;
    }

    const fetchReview = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews/${id}`);

        const data = await response.data;

        if (!data.success) {
          console.log(data.message || 'FETCH ERROR');
        }

        setReview(data.review);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, [id, review, setReview]);

  return (
    <div>
      <div className='review-page-detail'>
        {/* <div className='review-page-detail__title-wrapper'>
          <h1 className='review-page-detail__title'>All Reviews</h1>
        </div> */}
        <div>
          {review && (
            <div className='rating'>
              <h3>Rating</h3>
              <p className='number'>{String(review.rating).split('.').length > 1 ? review.rating : review.rating + '.0'}</p>
              <Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />
            </div>
          )}
        </div>
        {review && <ReviewTable data={[review]} head={['comment', 'reviewed on', 'reviewed by', 'date']} body={['comment', 'product', 'customer', 'createdAt']} />}
      </div>
    </div>
  );
};

export default ReviewById;
