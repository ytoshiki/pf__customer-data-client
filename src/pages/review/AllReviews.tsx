import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from 'react-rating';
import ReviewTable from '../../components/table/ReviewTable';
import './ReviewPageDetail.scss';

export interface ReviewData {
  comment: null | string;
  createdAt: string | Date;
  customer:
    | {
        username: string;
        avator: string;
        _id: string;
      }
    | string;
  customer_id?: string;
  product:
    | {
        name: string;
        _id: string;
      }
    | string;
  product_id?: string;
  rating: number;
  _id: string;
}

export interface AllReviewsProps {}

const AllReviews: React.SFC<AllReviewsProps> = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [average, setAverage] = useState<number>();

  useEffect(() => {
    if (reviews.length > 0) {
      return;
    }

    const fetchReviews = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      const reviews: ReviewData[] = data.reviews;

      const reviewData = reviews.map((review) => {
        return {
          comment: review.comment,
          createdAt: review.createdAt,
          customer: (review.customer as any).username,
          customer_id: (review.customer as any)._id,
          product: (review.product as any).name,
          product_id: (review.product as any)._id,
          rating: review.rating,
          _id: review._id
        };
      });

      setReviews(reviewData);
    };

    if (reviews.length === 0) {
      fetchReviews();
    }
  }, [reviews, setReviews]);

  useEffect(() => {
    if (average) {
      return;
    }

    if (reviews.length === 0) {
      return;
    }

    const sum = reviews.reduce((accu, review) => accu + review.rating, 0);

    const output = Math.floor((sum / reviews.length) * 10) / 10;

    setAverage(output);
  }, [average, setAverage, reviews]);

  return (
    <div>
      <div className='review-page-detail'>
        <div className='review-page-detail__title-wrapper'>
          <h1 className='review-page-detail__title'>All Reviews</h1>
        </div>
        <div className='review-page-detail__top'>
          {average && (
            <>
              <div className='rating'>
                <h3>Average Rating: </h3>
                <p className='number'>{String(average).split('.').length > 1 ? average : average + '.0'}</p>
              </div>
              <Rating initialRating={average} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />
            </>
          )}
        </div>
        {reviews && <ReviewTable data={reviews} head={['rating', 'comment', 'reviewed on', 'reviewed by', 'date']} body={['rating', 'comment', 'product', 'customer', 'createdAt']} />}
      </div>
    </div>
  );
};

export default AllReviews;
