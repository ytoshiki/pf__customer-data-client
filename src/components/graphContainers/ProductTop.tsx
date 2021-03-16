import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts, StoreTypes } from '../../redux';
import VerticalGraph from '../graph/VerticalGraph';
import './productTop.scss';
import CircularBar from '../graph/Circular';
import { ratingPercentageSelector } from '../../redux/selectors/review';

export interface ProductTopProps {
  ratingPercentage: {
    top: number;
    middle: number;
    bottom: number;
  };
}

interface RatingData {
  name: string;
  id: string;
  rating: number;
}

const ProductTop: React.FC<ProductTopProps> = ({ ratingPercentage }) => {
  const [init, setInit] = useState(true);
  const [ratingData, setRatingData] = useState<RatingData[]>([]);

  useEffect(() => {
    if (!init) {
      return;
    }

    const fetchProductRating = async () => {
      try {
        const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/products/rating`);

        const data = response.data;

        if (!data.success) {
          console.log(data.message || 'Fetch Error');
          return;
        }

        setRatingData(data.data);
      } catch (error) {}
    };

    if (ratingData.length === 0) {
      fetchProductRating();
    }

    setInit(false);
  }, [init, setInit, ratingData, setRatingData]);

  return (
    <div className='product-top'>
      <div className='product-top__avarage-rating'>
        {ratingData.length > 0 && <VerticalGraph label='Avarage Rating per Product' data={ratingData} x='name' y='rating' />}
        <div className='product-top__avarage-rating-facts'>
          <div className='card'>
            <span className='label'>Above 4.5</span>
            <CircularBar percentage={ratingPercentage.top} color='102, 201, 102' />
          </div>
          <div className='card'>
            <span className='label'>3.0 - 4.4</span>
            <CircularBar percentage={ratingPercentage.middle} color='74, 71, 163' />
          </div>
          <div className='card'>
            <span className='label'>Below 3.0</span>
            <CircularBar percentage={ratingPercentage.bottom} color='207, 39, 39' />
          </div>
        </div>
      </div>
      {/* <div className='product-top__all-rating'>
        <ShapePieGraph label='All Ratings' />
      </div> */}
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    products: store.products.products,
    ratingPercentage: ratingPercentageSelector(store)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTop);
