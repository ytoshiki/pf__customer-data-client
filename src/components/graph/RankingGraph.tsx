import { useHistory } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.scss';

export interface RankingGraphProps {
  data: any;
  label: string;
  x: string;
  y: string;
  others: null | string[];
  link?: string;
}

const RankingGraph: React.FC<RankingGraphProps> = ({ data, label, x, y, others = null, link }) => {
  const history = useHistory();

  if (!link) {
    link = 'customers';
  }

  const onClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    const event: any = e;

    if (event.hasOwnProperty('id')) {
      history.push(`/${link}/${event.id}`);
    } else if (event.hasOwnProperty(x)) {
      history.push(`/${link}/${event.x}`);
    }
  };

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
          <XAxis dataKey={x} scale='point' padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid />
          <Bar dataKey={y} fill='#ff6b4a' background={{ fill: '#eee' }} onClick={onClick} barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingGraph;
