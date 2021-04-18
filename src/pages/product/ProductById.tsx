import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { ProductData } from '../customer/CustomerById';
import axios from 'axios';
import Slideshow from '../../components/slider/Slide';
import ProductTable from '../../components/table/ProductTable';
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

  console.log(product);

  return (
    <div>
      <div className='product-page-detail'>
        {/* <div className='product-page-detail__title-wrapper'>
          <h1 className='product-page-detail__title'>Product with ID of {id}</h1>
        </div> */}
        {product && (
          <div className='product-detail'>
            <div className='heading'>
              <div className='slide'>
                <Slideshow images={product.images} />
              </div>
              <div>
                <h3>{product.name}</h3>
                <p className='category'>{product.category !== null && product.category.name}</p>
                <p className='price'>${product.price}</p>
                <p className='date'>Added on {dateFormatter(product.createdAt)}</p>
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
                <p>0</p>
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
