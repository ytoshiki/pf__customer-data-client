import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useHistory } from 'react-router-dom';

export interface VerticalGraphProps {
  data: any[];
  label: string;
  x: string;
  y: string;
}

const VerticalGraph: React.FC<VerticalGraphProps> = ({ data, label, x, y }) => {
  const history = useHistory();

  const onClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    const event: any = e;

    if (event.hasOwnProperty('id')) {
      history.push(`/products/${event.id}`);
    }
  };

  return (
    <div className='vertical-chart'>
      <div className='vertical-chart__label'>{label}</div>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 50,
            bottom: 30
          }}
          layout={'vertical'}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#555555' />

          <XAxis type='number' tickCount={1} />
          <YAxis dataKey={x} type='category' />
          <Tooltip />
          <Legend />
          <Bar dataKey={y} fill='rgb(255, 166, 0)' barSize={20} onClick={onClick} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalGraph;
