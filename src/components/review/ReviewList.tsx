import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReviewData } from '../../pages/review/AllReviews';
import ReviewItem from './ReviewItem';
import './ReviewList.scss';

export interface ReviewListProps {
  p_id: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ p_id }) => {
  const [data, setData] = useState<ReviewData[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      return;
    }

    let mounted = true;

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews/product/${p_id}`);

        const data = await response.data;

        if (!data.success) {
          console.log(data.message || 'FETCH_ERROR');
          return;
        }

        if (mounted) setData(data.reviews);
      } catch (error) {}
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, [p_id, data, setData]);

  return (
    <ul className='review-list'>
      {data.map((obj) => (
        <ReviewItem review={obj} key={obj._id} />
      ))}
    </ul>
  );
};

export default ReviewList;
