import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface CircularBarProps {
  percentage: number;
  color?: string;
}

const CircularBar: React.SFC<CircularBarProps> = ({ percentage, color }) => {
  if (!color) {
    color = '255, 107, 74';
  }

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 0.25,

        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'butt',

        // Text size
        textSize: '16px',

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',

        // Colors
        pathColor: `rgba(${color}, ${percentage / 30})`,

        textColor: `rgb(${color})`,
        trailColor: '#d6d6d6',
        backgroundColor: '#3e98c7'
      })}
    />
  );
};

export default CircularBar;
