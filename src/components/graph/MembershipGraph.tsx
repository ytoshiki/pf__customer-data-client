import { connect } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { membershipSelector, natSelector, StoreTypes } from '../../redux';
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
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='number' fill='#4a47a3' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    data: membershipSelector(store)
  };
};

export default connect(mapStateToProps)(BarGraph);
