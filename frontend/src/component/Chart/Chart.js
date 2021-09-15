import './styles.scss';
import Chart from "react-google-charts";

const CandleChart = ({ data = [], coinName }) => {
    return (
        <Chart
            width={'100%'}
            height={350}
            chartType="CandlestickChart"
            data={[
                ['day', 'a', 'b', 'c', 'd'],
                ...data
            ]}
            options={{
                legend: 'left',
                title: coinName,
                tooltip: { isHtml: true, trigger: "visible" }
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}

export default CandleChart;
