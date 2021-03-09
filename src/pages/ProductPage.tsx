import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RankingGraph from '../components/graph/RankingGraph';
import ShapePieGraph from '../components/graph/ShapePieGraph';
import Header from '../components/Header';
import { getAllPurchases } from '../helpers/getPurchases';
import { StoreTypes, fetchAllCategories, fetchAllProducts, newlyAddedSelector } from '../redux';
import { fetchAllReviews } from '../redux/actions/reviewActions';
import { Category } from '../redux/reducers/category/categoryReducer';
import { Review } from '../redux/reducers/review/reviewReducer';
import { overallratingSelector } from '../redux/selectors/review';

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

      console.log(returndata);
      setRankingData(returndata);
    });
  }, [rankingData, setRankingData]);
  return (
    <div>
      <Header category='Product' />
      {products.length && (
        <div>
          <div>
            <h3>Newly Added Products</h3>
            <span>{newlyAdded}</span>
          </div>
          <div>
            <h3>Total Amount of Products</h3>
            <span>{products.length}</span>
          </div>
          {categories.length && (
            <div>
              <h3>Total Amount of Categories</h3>
              <span>{categories.length}</span>
            </div>
          )}
          {overallRating && (
            <div>
              <h3>Over All Rating</h3>
              <span>{overallRating}/5</span>
            </div>
          )}
        </div>
      )}
      <ShapePieGraph label='View By Rating: 1-5' />
      {rankingData.length && (
        <div>
          <RankingGraph label='Most Purchased Products' data={rankingData} x='name' y='sold' others={['price']} />
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
