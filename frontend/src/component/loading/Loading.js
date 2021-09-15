import './styles.scss';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="Loading flex-col">
        <h2>Loading data...</h2>
        <Spin size="large" />
    </div>
  );
}

export default Loading;
