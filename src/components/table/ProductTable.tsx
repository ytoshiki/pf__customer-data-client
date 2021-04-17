import { useHistory } from 'react-router';
import { dateFormatter, generateKey } from '../../helpers';
import './ProductTable.scss';

export interface ProductTableProps {
  data: any[];
  head: string[];
  body: string[];
  hover?: boolean;
}

const ProductTable: React.SFC<ProductTableProps> = ({ data, head, body }) => {
  const history = useHistory();

  const onClick = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <table className='productTable'>
      <thead>
        <tr>
          {head.map((th, index) => (
            <th key={generateKey(String(index))}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
          <tr key={generateKey(String(index))} onClick={() => onClick(obj._id || obj.id)}>
            {body.map((td, index) => {
              if (td === 'createdAt' || td === 'dateRegistered') {
                let date;

                let key = 'dateRegistered';

                if (td === 'createdAt') {
                  key = 'createdAt';
                }

                date = dateFormatter(obj[key]);

                return <td key={generateKey(String(index))}>{date}</td>;
              } else if (td === 'images') {
                return (
                  <td key={generateKey(String(index))}>
                    <div className='image-wrapper'>
                      <img src={obj['images'][0]} alt='' />
                    </div>
                  </td>
                );
              } else if (td === 'category') {
                return <td key={generateKey(String(index))}>{obj[td].name}</td>;
              } else if (td === 'category_row') {
                return <td key={generateKey(String(index))}>{obj['category']}</td>;
              } else if (td === 'update') {
                return <td key={generateKey(String(index))}>Update</td>;
              } else if (td === 'delete') {
                return <td key={generateKey(String(index))}>Delete</td>;
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

export default ProductTable;
