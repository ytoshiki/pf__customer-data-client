import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../helpers';
import { ReviewData } from '../../pages/review/AllReviews';
import './ReviewItem.scss';

export interface ReviewItemProps {
  review: ReviewData;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  console.log(review);
  return (
    <li className='review_item'>
      <div className='content'>
        <div className='description'>
          <Link to={`/customers/${(review.customer as any)._id}`} className='main'>
            <div className='image-wrapper'>
              <img src={(review.customer as any).avator} alt='' />
            </div>

            <div>
              <p className='username'>{(review.customer as any).username}</p>
              <div className='rating'>
                <Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />
                <span className='rate'>{String(review.rating).split('.').length > 1 ? review.rating : review.rating + '.0'}</span>
              </div>
            </div>
          </Link>

          <p className='date'>{dateFormatter(review.createdAt as string)}</p>
        </div>
        {review.comment && <div className='comment'>{review.comment}</div>}
      </div>
    </li>
  );
};

export default ReviewItem;
