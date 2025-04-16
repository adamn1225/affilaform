import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartPoint, getFormChartData } from '@/lib/api/forms'

export default function VFormAnalytics({ data }: { data: ChartPoint[] }) {
    return (
        <div className="w-full h-80 bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Views vs Submissions</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                    <Line type="monotone" dataKey="submissions" stroke="#82ca9d" name="Submissions" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}