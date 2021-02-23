import './Loading.scss';

export interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className='loading'>
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    </div>
  );
};

export default Loading;
