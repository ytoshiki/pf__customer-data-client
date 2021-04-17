import { dateFormatter, generateKey } from '../../helpers';
import './ReviewTable.scss';

export interface ReviewTableProps {
  data: any[];
  head: string[];
  body: string[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ data, head, body }) => {
  return (
    <table className='reviewTable'>
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

export default ReviewTable;
