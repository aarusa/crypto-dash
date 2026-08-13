import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Filler } from "chart.js";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {

    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=aud&days=7`);

            const data = await res.json();

            // console.log(data);

            const prices = data.prices.map((price) => ({
                x: price[0],
                y: price[1]
            }));

            console.log(prices);

            setChartData({
                datasets: [
                    {
                        label: 'Price (AUD)',
                        data: prices,
                        fill: true,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        pointRadius: 0, //hides the points
                        tension: 0.3 //smooth out the line
                    },
                ],
            });

            setLoading(false);
        };

        fetchPrices();
    }, [coinId]);

    return ( 
        <div style={{ marginTop: '30px' }}>
            { loading ? (
                <p>Loading chart...</p>
            ) : (
                <Line 
                    data={chartData}
                    options={{
                        responsive:true,
                        plugins:{
                            legend: {display:false},
                            tooltip: {mode:'index', intersect:false},
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                },
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 7
                                }
                            },
                            y: {
                                ticks: {
                                    callback: (value) => `$${value.toLocaleString()}` 
                                }
                            }
                        }
                    }}
                />
            )}
        </div>
     );
}
 
export default CoinChart;