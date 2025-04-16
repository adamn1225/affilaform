'use client';

import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function AffiliateCharts({
    ctrData,
    earningsData,
}: {
    ctrData: { date: string; ctr: number }[];
    earningsData: { date: string; amount: number }[];
}) {
    const ctrChartData = {
        labels: ctrData.map(d => d.date),
        datasets: [
            {
                label: 'CTR (%)',
                data: ctrData.map(d => d.ctr),
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const earningsChartData = {
        labels: earningsData.map(d => d.date),
        datasets: [
            {
                label: 'Earnings ($)',
                data: earningsData.map(d => d.amount),
                backgroundColor: 'rgba(34,197,94,0.6)',
            },
        ],
    };

    return (
        <div className="w-full flex gap-2">
            <div className="bg-white border w-full p-4 rounded">
                <h3 className="text-md font-semibold mb-2">Click-Through Rate (CTR)</h3>
                <Line data={ctrChartData} />
            </div>
            <div className="bg-white border p-4 w-full rounded">
                <h3 className="text-md font-semibold mb-2">Earnings Over Time</h3>
                <Bar data={earningsChartData} />
            </div>
        </div>
    );
}
