import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { natSelector, StoreTypes } from '../../redux';
import './Graph.scss';

export interface BarGraphProps {
  data: any;
  label: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, label }) => {
  console.log(data);
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
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />

          <Bar dataKey='number' fill='#ad3e9c' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    data: natSelector(store)
  };
};

export default connect(mapStateToProps)(BarGraph);
