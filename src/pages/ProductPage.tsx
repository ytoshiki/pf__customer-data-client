import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RankingGraph from '../components/graph/RankingGraph';
import ProductTop from '../components/graphContainers/ProductTop';
import Header from '../components/Header';
import { getAllPurchases } from '../helpers/getPurchases';
import { StoreTypes, fetchAllCategories, fetchAllProducts, newlyAddedSelector } from '../redux';
import { fetchAllReviews } from '../redux/actions/reviewActions';
import { Category } from '../redux/reducers/category/categoryReducer';
import { Review } from '../redux/reducers/review/reviewReducer';
import { overallratingSelector } from '../redux/selectors/review';
import './ProductPage.scss';

export interface Product {
  name: string;
  id: string;
  price: number;
  images: string[];
  category: string;
  reviews: null | string[];
  createdAt: string;
}

export interface ProductPageProps {
  products: Product[];
  fetchProducts: any;
  newlyAdded: number;
  categories: Category[];
  fetchCategories: any;
  reviews: Review[];
  fetchReviews: any;
  overallRating: number;
}

interface Purchase {
  product: null | {
    name: string;
    _id: string;
    price: number;
    purchasedItems: string[];
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ products, fetchProducts, newlyAdded, fetchCategories, categories, fetchReviews, reviews, overallRating }) => {
  const [rankingData, setRankingData] = useState<{ name: string; id: string; sold: number }[]>([]);

  const compare = (a: { sold: number }, b: { sold: number }) => {
    if (a.sold < b.sold) {
      return 1;
    }
    if (a.sold > b.sold) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    if (products.length < 1) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  useEffect(() => {
    if (categories.length < 1) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  useEffect(() => {
    if (reviews.length < 1) {
      fetchReviews();
    }
  }, [reviews, fetchReviews]);

  useEffect(() => {
    if (rankingData.length > 0) {
      return;
    }

    const logPurchases = async () => await getAllPurchases();

    const data = logPurchases();

    let nameLists: { name: string; id: string }[] = [];
    let returndata: { name: string; id: string; sold: number; price: number }[] = [];

    data.then((purchases) => {
      purchases
        .filter((purchase: Purchase) => {
          return purchase.product !== null;
        })
        .forEach((purchase: Purchase) => {
          if (
            nameLists.some((list) => {
              return list.id === purchase.product?._id;
            })
          ) {
            returndata.map((obj: { name: string; id: string; sold: number }) => {
              if (obj.id === purchase.product?._id) {
                obj.sold++;
              }
              return obj;
            });
          } else {
            nameLists.push({
              name: purchase.product?.name as string,
              id: purchase.product?._id as string
            });

            returndata.push({
              name: purchase.product?.name as string,
              id: purchase.product?._id as string,
              price: purchase.product?.price as number,
              sold: 1
            });
          }
        });

      returndata.sort(compare);

      setRankingData(returndata.slice(0, 10));
    });
  }, [rankingData, setRankingData]);

  return (
    <div className='productpage'>
      <Header category='Product' />
      {products.length && (
        <div className='product-cards'>
          <Link to={newlyAdded ? '/products/new' : '/products'} className={newlyAdded ? '' : 'is-non-link'}>
            <div className='product-cards__card'>
              <h3>Newly Added Products</h3>
              <span className='data'>{newlyAdded}+</span>
            </div>
          </Link>

          <Link to={products.length ? '/products/all' : '/products'} className={products.length ? '' : 'is-non-link'}>
            <div className='product-cards__card'>
              <h3>Total Amount of Products</h3>
              <span className='data'>{products.length}</span>
            </div>
          </Link>

          <Link to={reviews.length ? '/reviews/all' : '/products'} className={reviews.length ? '' : 'is-non-link'}>
            <div className='product-cards__card'>
              <h3>Total Amount of Reviews</h3>
              <span className='data'>{reviews.length}</span>
            </div>
          </Link>

          <Link to={reviews.length ? '/reviews/all' : '/products'} className={reviews.length ? '' : 'is-non-link'}>
            <div className='product-cards__card'>
              <h3>Over All Rating</h3>
              <span className='data'>{overallRating}/5.0</span>
            </div>
          </Link>
        </div>
      )}

      <ProductTop />
      {rankingData.length && (
        <div>
          <RankingGraph label='Most Purchased Products' data={rankingData} x='name' y='sold' others={['price']} link='products' />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    products: store.products.products,
    newlyAdded: newlyAddedSelector(store),
    categories: store.categories.categories,
    reviews: store.reviews.reviews,
    overallRating: overallratingSelector(store)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts()),
    fetchCategories: () => dispatch(fetchAllCategories()),
    fetchReviews: () => dispatch(fetchAllReviews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
