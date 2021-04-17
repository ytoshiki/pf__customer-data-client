import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductTable from '../../components/table/ProductTable';

import { ProductData } from '../customer/CustomerById';
import './ProductPageDetail.scss';

export interface AllProductsProps {}

const AllProducts: React.SFC<AllProductsProps> = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/products`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      setProducts(data.products);
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, setProducts]);

  return (
    <div>
      <div className='product-page-detail'>
        <div className='product-page-detail__title-wrapper'>
          <h1 className='product-page-detail__title'>All Products</h1>
        </div>
        {products && <ProductTable data={products} head={['id', '', 'title', 'price($)', 'category', 'added']} body={['_id', 'images', 'name', 'price', 'category', 'createdAt']} />}
      </div>
    </div>
  );
};

export default AllProducts;
