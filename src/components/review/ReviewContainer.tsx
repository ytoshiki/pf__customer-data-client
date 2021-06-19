import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { ReviewData } from '../../pages/review/AllReviews';
import VerticalGraph from '../graph/VerticalGraph';
import './ReviewContainer.scss';
import ReviewList from './ReviewList';

export interface ReviewContainerProps {
  reviews: ReviewData[];
  p_id: string;
}

export interface GraphData {
  review: string;
  number: number;
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ reviews, p_id }) => {
  const [average, setAverage] = useState<number>();
  const [data, setData] = useState<GraphData[]>([]);

  useEffect(() => {
    let mounted = true;

    if (average) {
      return;
    }

    const sum = reviews.reduce((accu, review) => accu + review.rating, 0);

    const output = sum / reviews.length;

    if (mounted) setAverage(output);

    return () => {
      mounted = false;
    };
  }, [average, setAverage, reviews]);

  useEffect(() => {
    if (data.length > 0) {
      return;
    }

    let output: GraphData[] = [];
    const labels = ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'];
    labels.forEach((label) => {
      output.push({
        review: label,
        number: 0
      });
    });

    reviews.forEach((review) => {
      if (review.rating < 1.8) {
        output.map((obj) => {
          if (obj.review === 'Poor') {
            obj.number++;
          }

          return obj;
        });
      } else if (review.rating > 1.7 && review.rating < 2.6) {
        output.map((obj) => {
          if (obj.review === 'Below Average') {
            obj.number++;
          }

          return obj;
        });
      } else if (review.rating > 2.5 && review.rating < 3.4) {
        output.map((obj) => {
          if (obj.review === 'Average') {
            obj.number++;
          }

          return obj;
        });
      } else if (review.rating > 3.3 && review.rating < 4.2) {
        output.map((obj) => {
          if (obj.review === 'Good') {
            obj.number++;
          }

          return obj;
        });
      } else {
        output.map((obj) => {
          if (obj.review === 'Excellent') {
            obj.number++;
          }

          return obj;
        });
      }
    });

    setData(output);
  }, [reviews, data, setData]);

  return (
    <div className='reviews-container'>
      <h2>REVIEWS</h2>

      {reviews.length > 0 ? (
        <>
          <div className='rating'>
            <p className='number'>{String(average).split('.').length > 1 ? average : average + '.0'}</p>
            <Rating initialRating={average} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />
          </div>
          <VerticalGraph label='' x='review' y='number' data={data} />
          <ReviewList p_id={p_id} />
        </>
      ) : (
        <p className='no-reviews'>No Reviews Yet</p>
      )}
    </div>
  );
};

export default ReviewContainer;
