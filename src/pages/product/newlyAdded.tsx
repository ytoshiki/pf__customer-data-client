import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductTable from '../../components/table/ProductTable';

import { ProductData } from '../customer/CustomerById';

export interface NewlyAddedProps {}

const NewlyAdded: React.SFC<NewlyAddedProps> = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/products/recent`);

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

  console.log(products);

  return (
    <div>
      <div className='product-page-detail'>
        <div className='product-page-detail__title-wrapper'>
          <h1 className='product-page-detail__title'>Newly Added Products</h1>
        </div>
        {products && <ProductTable data={products} head={['name', 'price($)', 'added']} body={['name', 'price', 'createdAt']} />}
      </div>
    </div>
  );
};

export default NewlyAdded;
