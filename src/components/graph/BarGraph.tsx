import { useHistory } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './Graph.scss';

export interface BarGraphProps {
  data: any;
  label: string;
  x: string;
  y: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, label, x, y }) => {
  const history = useHistory();

  const onClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    const event: any = e;

    let keyword: string = '';
    if (label === 'Nationality') {
      keyword = 'nat';
    }

    if (event.hasOwnProperty('country')) {
      history.push(`/customers/${keyword}/${event.country}`);
    }
  };
  return (
    <div className='bar-chart'>
      <p className='bar-chart__label'>{label}</p>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          // width={500}
          // height={400}
          data={data}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5
          // }}
        >
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar background={{ fill: '#eee' }} dataKey={y} fill='#ad3e9c' onClick={onClick} barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
