import { PurchaseData } from '../../pages/customer/CustomerById';
import Table from '../table/CustomerTable';

export interface PurchaseListProps {
  items: PurchaseData[];
}

const PurchaseList: React.FC<PurchaseListProps> = ({ items }) => {
  const data = items.map((item) => {
    return {
      _id: item.product?._id,
      name: item.product?.name,
      price: item.product?.price,
      createdAt: item.createdAt
    };
  });

  return (
    <div>
      <Table data={data} head={['product id', 'name', 'price($)', 'purchase date']} body={['_id', 'name', 'price', 'createdAt']} />
    </div>
  );
};

export default PurchaseList;
