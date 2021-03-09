import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.scss';

export interface RankingGraphProps {
  data: any;
  label: string;
  x: string;
  y: string;
  others: null | string[];
}

const RankingGraph: React.FC<RankingGraphProps> = ({ data, label, x, y, others = null }) => {
  if (data.length < 1) {
    return <div>No Data</div>;
  }

  console.log(x, y, others);

  return (
    <div className='ranking-chart'>
      <p className='ranking-chart__label'>{label}</p>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          // width={500}
          // height={300}
          data={data}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5
          // }}
          barSize={20}
        >
          <XAxis dataKey={x} scale='point' padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid />
          <Bar dataKey={y} fill='#ff6b4a' background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingGraph;
