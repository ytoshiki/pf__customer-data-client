import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { dateFormatter, generateKey, kFormatter } from '../../helpers';
import logo from '../../images/avator.png';
import { ReviewData } from '../review/AllReviews';
import { CustomerData } from './newlyRegistered';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export interface ProductData {
  _id: string;
  name: string;
  price: number;
}

export interface PurchaseData {
  _id: string;
  product: ProductData;
  customer: string;
  createdAt: string;
}

export interface CustomerByIdProps {}

const CustomerById: React.FC<CustomerByIdProps> = () => {
  const history = useHistory();
  const params = useParams();

  const id: string = (params as any).id;

  const [customer, setCustomer] = useState<CustomerData>();
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    if (customer) {
      return;
    }

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/${id}`);

        const data = await response.data;

        if (!data.success) {
          return;
        }

        setCustomer(data.customer);
      } catch (error) {
        return;
      }
    };

    if (!customer) {
      fetchCustomer();
    }
  }, [customer, setCustomer, id]);

  useEffect(() => {
    if (purchases.length > 0) {
      return;
    }

    const logPurchases = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/purchase/${id}`);

        const data = await response.data;

        if (!data.success) {
          return;
        }

        setPurchases(data.purchases);
      } catch (error) {
        return;
      }
    };

    if (purchases.length === 0) {
      logPurchases();
    }
  }, [id, purchases, setPurchases]);

  useEffect(() => {
    if (reviews.length > 0) {
      return;
    }

    const logReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews/customer/${id}`);

        const data = await response.data;

        if (!data.success) {
          return;
        }

        setReviews(data.reviews);
      } catch (error) {
        return;
      }
    };

    if (reviews.length === 0) {
      logReviews();
    }
  }, [id, reviews, setReviews]);

  const onClick = (id: string) => {
    history.push(`/reviews/${id}`);
  };

  const checkReviewed = (product_id: string) => {
    let result: string | Element = '';

    if (reviews) {
      reviews.forEach((review) => {
        if ((review.product as any)._id === product_id) {
          (result as any) = <div onClick={() => onClick(review._id)}>View</div>;
          return result;
        }
      });
    }

    return result;
  };
  console.log(purchases);

  return (
    <div>
      <div className='customer-page-detail'>
        {/* <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>Customer with ID of {id}</h1>
        </div> */}

        {customer && (
          <div className='customer-individual'>
            <div className='customer-individual__profile'>
              <div className='content'>
                <div className='img-wrapper'>
                  <img src={customer.avator ? customer.avator : logo} alt='' />
                </div>
                <div className='detail'>
                  <p className='name'>{customer.username}</p>
                  <div className='email'>{customer.email}</div>
                </div>
              </div>
            </div>
            <div className='customer-individual-cards'>
              <div className='card'>
                <p>Total Expenses</p>
                <span className='data'>
                  <FontAwesomeIcon icon={faShoppingCart} className='card-icon-md' />
                  {purchases.length > 0
                    ? '$' +
                      kFormatter(
                        purchases.reduce(function (acc, obj) {
                          return acc + obj.product.price;
                        }, 0)
                      )
                    : 0}
                </span>
              </div>
              <div className='card'>
                <p>Reviews</p>
                <span className='data'>
                  <FontAwesomeIcon icon={faPen} className='card-icon-md' />
                  {reviews.length}
                </span>
              </div>
            </div>
            <div className='customer-individual__purchases'>
              <h2>Items Purchased</h2>
              {purchases.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price($)</th>
                      <th>Date</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase, index) => (
                      <tr key={generateKey(purchase._id)}>
                        <td>
                          <Link to={`/products/${purchase.product._id}`}>
                            <div className='product-item'>
                              <div className='image-wrapper'>
                                <img src={(purchase.product as any).images[0]} alt='' />
                              </div>
                              <span>{purchase.product?.name}</span>
                            </div>
                          </Link>
                        </td>
                        <td>{purchase.product?.price}</td>
                        <td>{dateFormatter(purchase.createdAt)}</td>
                        <td className={checkReviewed(purchase.product._id) && 'pointer'}>{checkReviewed(purchase.product._id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                'No Purchase Record'
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerById;
