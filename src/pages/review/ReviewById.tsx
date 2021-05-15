import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Rating from 'react-rating';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReviewTable from '../../components/table/ReviewTable';
import { dateFormatter } from '../../helpers';
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
        {review && (
          <div className='review-page-detail__inner'>
            <div className='review-page-detail__customer'>
              <div className='review-page-detail__customer-info'>
                <div className='review-page-detail__customer-img'>
                  <img src={(review.customer as any).avator} alt='' />
                </div>
                <p className='review-page-detail__customer-name'>{(review.customer as any).username}</p>
              </div>
              <div className='review-page-detail__customer-review'>
                <div>
                  <Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />
                </div>
                <p className='review-page-detail__customer-date'>Reviewed on {dateFormatter(review.createdAt as any)}</p>
                <p className='review-page-detail__customer-comment'>{review.comment}</p>
              </div>
            </div>
            <div className='review-page-detail__product'>
              <div className='review-page-detail__product-inner'>
                <div className='review-page-detail__product-img'>
                  <img src={(review.product as any).images[0]} alt='' />
                </div>
                <div className='review-page-detail__product-name'>
                  <Link to={`/products/${(review.product as any)._id}`}>{(review.product as any).name}</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewById;
