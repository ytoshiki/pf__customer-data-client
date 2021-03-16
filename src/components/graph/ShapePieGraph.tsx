import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { useState } from 'react';

export interface ShapePieGraphProps {
  label: string;
}

const ShapePieGraph: React.FC<ShapePieGraphProps> = ({ label }) => {
  const data = [
    { name: 'Rating: 5', value: 400 },
    { name: 'Rating: 4 - 4.5', value: 77 },
    { name: 'Rating: 3 - 3.5', value: 45 },
    { name: 'Rating: 2 - 2.5', value: 5 },
    { name: 'Rating: 1 - 1.5', value: 2 }
  ];

  const COLORS = ['#4a47a3', '#ad3e9c', '#ee3f7a', '#ff6b4a', '#ffa600'];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
          {payload.name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={COLORS[0]} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={COLORS[2]} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#999'>{`${value} ratings`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  return (
    <div className='shapePie-chart'>
      <div className='shapePie-chart__label'>{label}</div>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx='50%' cy='50%' innerRadius={60} outerRadius={80} fill='#8884d8' dataKey='value' onMouseEnter={onPieEnter} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShapePieGraph;
