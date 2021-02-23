import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { natSelector, StoreTypes } from '../../redux';
import './Graph.scss';

export interface BarGraphProps {
  data: any;
  label: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, label }) => {
  const history = useHistory();

  const onClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    const event: any = e;
    if (event.hasOwnProperty('name')) {
      history.push(`/category/${label.toLowerCase()}/${event.name}`);
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
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='number' fill='#ad3e9c' onClick={onClick} />
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
