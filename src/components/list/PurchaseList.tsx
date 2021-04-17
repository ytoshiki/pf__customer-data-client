import { PurchaseData } from '../../pages/customer/CustomerById';
import Table from '../table/CustomerTable';
import PurchaseTable from '../table/PurchaseTable';

export interface PurchaseListProps {
  items: PurchaseData[] | any;
}

const PurchaseList: React.FC<PurchaseListProps> = ({ items }) => {
  const data = items.map((item: any) => {
    return {
      _id: item.product?._id,
      name: item.product?.name,
      price: item.product?.price,
      createdAt: item.createdAt
    };
  });

  return <div>{<PurchaseTable data={data} head={['product id', 'name', 'price($)', 'purchase date']} body={['_id', 'name', 'price', 'createdAt']} />}</div>;
};

export default PurchaseList;
