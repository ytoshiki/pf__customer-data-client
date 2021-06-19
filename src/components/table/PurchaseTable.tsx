import { useHistory } from 'react-router-dom';
import { dateFormatter, generateKey } from '../../helpers';

import { PurchaseData } from '../../pages/customer/CustomerById';
import './PurchaseTable.scss';

export interface PurchaseTableProps {
  data: PurchaseData[];
  head: string[];
  body: string[];
}

const PurchaseTable: React.FC<PurchaseTableProps> = ({ data, head, body }) => {
  const history = useHistory();

  const onClick = (link: string, id: string) => {
    history.push(`/${link}/${id}`);
  };

  return (
    <table className='purchaseTable'>
      <thead>
        <tr>
          {head.map((th, index) => (
            <th key={generateKey(String(index))}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj: any, index) => (
          <tr key={generateKey(String(index))}>
            {body.map((td, index) => {
              if (td === 'createdAt' || td === 'dateRegistered') {
                let date;

                let key = 'dateRegistered';

                if (td === 'createdAt') {
                  key = 'createdAt';
                }

                date = dateFormatter(obj[key]);

                return <td key={generateKey(String(index))}>{date}</td>;
              } else if (td === 'product') {
                if (obj[td] !== null) {
                  return (
                    <td key={generateKey(String(index))} onClick={() => onClick('products', obj['product']._id)} className='td-link'>
                      {obj[td].name}
                    </td>
                  );
                }

                return <td key={generateKey(String(index))}></td>;
              } else if (td === 'price') {
                if (obj['product'] !== null) {
                  return <td key={generateKey(String(index))}>{obj['product'].price}</td>;
                }

                return <td key={generateKey(String(index))}></td>;
              } else if (td === 'customer') {
                if (obj[td] !== null) {
                  return (
                    <td key={generateKey(String(index))} onClick={() => onClick('customers', obj[td]._id)} className='td-link'>
                      {obj[td].username}
                    </td>
                  );
                }

                return <td key={generateKey(String(index))}></td>;
              } else {
                return <td key={generateKey(String(index))}>{obj[td]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PurchaseTable;
