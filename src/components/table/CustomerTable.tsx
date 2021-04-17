import { useHistory } from 'react-router-dom';
import { dateFormatter, generateKey } from '../../helpers';
import logo from '../../images/avator.png';
import './CustomerTable.scss';

export interface TableProps {
  data: any[];
  head: string[];
  body: string[];
}

const CustomerTable: React.FC<TableProps> = ({ data, head, body }) => {
  const history = useHistory();

  const onClick = (id: string) => {
    history.push(`/customers/${id}`);
  };

  return (
    <table className='customer-table'>
      <thead>
        <tr>
          {head.map((th, index) => (
            <th key={generateKey(String(index))}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
          <tr key={generateKey(String(index))} onClick={() => onClick(obj._id)}>
            {body.map((td, index) => {
              if (index === 0 && td === 'username') {
                return (
                  <td key={generateKey(String(index))} className='customer-td'>
                    <div className='image-container'>
                      <img src={obj['avator'] !== null ? obj['avator'] : logo} alt='' />
                    </div>
                    <span>{obj[td]}</span>
                  </td>
                );
              } else if (td === 'createdAt' || td === 'dateRegistered') {
                let date;

                let key = 'dateRegistered';

                if (td === 'createdAt') {
                  key = 'createdAt';
                }

                date = dateFormatter(obj[key]);

                return <td key={generateKey(String(index))}>{date}</td>;
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

export default CustomerTable;
