import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FilterProduct from '../../components/filter/FilterProduct';
import SearchProduct from '../../components/search/SearchProduct';
import ProductTable from '../../components/table/ProductTable';
import { fetchAllProducts, StoreTypes } from '../../redux';
import { Product } from '../ProductPage';
import './EditProduct.scss';

export interface EditProductPageProps {
  products: Product[];
  fetchProducts: any;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ products, fetchProducts }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    fetchProducts();
  }, [products, fetchProducts]);

  let customProducts: Product[] = [];
  if (products.length) {
    customProducts = products.filter((product) => product.name.includes(text.trim()));
  }
  return (
    <>
      <FilterProduct text={text} setText={setText} />
      <div className='edit-product'>{customProducts.length > 0 && <ProductTable data={customProducts} head={['product', '', 'price($)', 'category', 'added']} body={['images', 'name', 'price', 'category_row', 'createdAt', 'update', 'delete']} link={false} />}</div>
    </>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    products: store.products.products
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);
