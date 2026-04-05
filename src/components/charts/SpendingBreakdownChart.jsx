import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/helpers";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

function SpendingBreakdownChart({ data, isDarkMode }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold section-title mb-4">Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: isDarkMode ? "#121c2f" : "#ffffff",
              color: isDarkMode ? "#e8f1fb" : "#102235",
              border: `1px solid ${isDarkMode ? "#334155" : "#cbd5e1"}`,
              borderRadius: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default SpendingBreakdownChart;
