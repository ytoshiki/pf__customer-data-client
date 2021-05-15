import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Slideshow from '../../components/slider/Slide';

import { dateFormatter } from '../../helpers';
import ReviewContainer from '../../components/review/ReviewContainer';
import { ReviewData } from '../review/AllReviews';

export interface ProductByIdProps {}

export interface ProductDetail {
  _id: string;
  images: string[];
  reviews: ReviewData[];
  name: string;
  category: {
    _id: string;
    name: string;
  } | null;
  price: number;
  createdAt: string;
}

const ProductById: React.FC<ProductByIdProps> = () => {
  const params = useParams();

  const id: string = (params as any).id;

  const [product, setProduct] = useState<ProductDetail>();
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    if (product) {
      return;
    }

    const fetchProduct = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/products/${id}`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      setProduct(data.product);
    };

    if (!product) {
      fetchProduct();
    }
  }, [product, setProduct, id]);

  useEffect(() => {
    if (purchases.length) return;

    const fetchPurchases = async () => {
      try {
        const request = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/purchase/product/${id}`);
        const response = request.data;

        if (!response.success) throw new Error(response.message);

        setPurchases(response.purchases);
      } catch (error) {}
    };

    fetchPurchases();
  }, [purchases, setPurchases, id]);

  return (
    <div>
      <div className='product-page-detail'>
        {product && (
          <div className='product-detail'>
            <div className='heading'>
              <div className='slide'>
                <Slideshow images={product.images} />
              </div>
              <div>
                <h3>{product.name}</h3>
                <div className='product-detail__block'>
                  <p>
                    <span>id</span>: {product.category !== null && product.category._id}
                  </p>
                  <p className='category'>
                    <span>category</span>: {product.category !== null && product.category.name}
                  </p>
                  <p className='price'>
                    <span>price</span>: ${product.price}
                  </p>
                  <p className='date'>
                    <span>added</span>: {dateFormatter(product.createdAt)}
                  </p>
                </div>
                <div className='options'>
                  <button>EDIT</button>
                  <button>PREVIEW</button>
                </div>
              </div>
            </div>
            {/* <ProductTable data={[product]} body={['price', 'createdAt']} head={['price($)', 'sales start']} /> */}
            <div className='cards'>
              <div className='card'>
                <h3>Sold</h3>
                <p>{purchases.length}</p>
              </div>
              <div className='card'>
                <h3>Reviews</h3>
                <p>{product.reviews.length}</p>
              </div>
            </div>
            <ReviewContainer reviews={product.reviews} p_id={product._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductById;
