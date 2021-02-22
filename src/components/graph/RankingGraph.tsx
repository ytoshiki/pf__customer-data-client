import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { purchaseSelector, StoreTypes } from '../../redux';
import './Graph.scss';

export interface RankingGraphProps {
  data: any;
  label: string;
}

const RankingGraph: React.FC<RankingGraphProps> = ({ data, label }) => {
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
          <XAxis dataKey='name' scale='point' padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid />
          <Bar dataKey='purchase' fill='#ff6b4a' background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    data: purchaseSelector(store)
  };
};

export default connect(mapStateToProps)(RankingGraph);
