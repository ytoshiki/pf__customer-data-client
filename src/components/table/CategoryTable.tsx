import { useHistory } from 'react-router-dom';
import { dateFormatter, generateKey } from '../../helpers';
import { Img } from 'react-image';
import './CategoryTable.scss';

export interface CategoryTableProps {
  data: any[];
  head: string[];
  body: string[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, head, body }) => {
  const history = useHistory();

  const onClick = (id: string) => {
    history.push(`/customers/${id}`);
  };

  return (
    <table className='category-table'>
      <thead>
        <tr>
          {head.map((th, index) => (
            <th key={generateKey(String(index))}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
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
              } else if (td === 'image') {
                return (
                  <td key={generateKey(String(index))} className='image-container'>
                    <Img src={obj['image']} alt={obj['name'] || ''} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<p>Image Not Found</p>} />
                  </td>
                );
              } else if (td === 'update') {
                return (
                  <td key={generateKey(String(index))} onClick={() => console.log('')}>
                    Update
                  </td>
                );
              } else if (td === 'delete') {
                return (
                  <td key={generateKey(String(index))} onClick={() => console.log('')}>
                    Delete
                  </td>
                );
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

export default CategoryTable;
