import { useHistory } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Graph.scss';

export interface PieGraphProps {
  data: any;
  label: string;
}

const PieGraph: React.FC<PieGraphProps> = ({ data, label }) => {
  const history = useHistory();

  const COLORS = ['#4a47a3', '#ad3e9c', '#ee3f7a', '#ff6b4a', '#ffa600'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    const node = e.currentTarget;
    // if (node.getAttribute('name') === 'male' || node.getAttribute('name') === 'female')

    if (node.getAttribute('name')) {
      history.push(`/customers/${label.toLowerCase()}/${node.getAttribute('name')}`);
    }
  };

  return (
    <>
      <div className='pie-chart'>
        <p className='pie-chart__label'>{label}</p>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart
          // width={730}
          // height={250}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5
          // }}
          >
            <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' fill='#828433' label={renderCustomizedLabel} labelLine={false}>
              {data.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={onClick} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PieGraph;
