import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/helpers";

function BalanceTrendChart({ data, isDarkMode }) {
  const axisColor = isDarkMode ? "#a8bfd6" : "#4c6073";

  return (
    <Card className="col-span-full md:col-span-2">
      <h3 className="text-lg font-semibold section-title mb-4">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke={axisColor} />
          <YAxis stroke={axisColor} />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: isDarkMode ? "#121c2f" : "#ffffff",
              color: isDarkMode ? "#e8f1fb" : "#102235",
              border: `1px solid ${isDarkMode ? "#334155" : "#cbd5e1"}`,
              borderRadius: "10px",
            }}
            labelStyle={{ color: isDarkMode ? "#a8bfd6" : "#4c6073" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Balance"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default BalanceTrendChart;
