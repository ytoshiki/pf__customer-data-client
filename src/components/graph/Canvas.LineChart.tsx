import React from 'react';
import { useHistory } from 'react-router-dom';
import { CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart } from 'recharts';
import './Graph.scss';

export interface LineChartProps {
  data: any[];
  x: string;
  y: string;
}

const LineGraph: React.SFC<LineChartProps> = ({ data, x, y }) => {
  const history = useHistory();

  const onClick = (event: any, payload: any) => {
    // if (node.getAttribute('name') === 'male' || node.getAttribute('name') === 'female')

    const date = payload.payload.date;
    const profit = payload.payload.profit;

    if (profit < 1) {
      return;
    }

    history.push('/profit/' + date);

    // if (node.getAttribute(y)) {
    //   history.push(`/profit/${node}`);
    // }
  };

  return (
    <div className='line-graph'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='linear' dataKey={y} stroke='rgb(173, 62, 156)' activeDot={{ r: 8, onClick: onClick }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
