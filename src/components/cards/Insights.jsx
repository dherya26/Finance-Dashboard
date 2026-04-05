import Card from "../ui/Card";
import { formatCurrency } from "../../utils/helpers";

function Insights({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const categoryTotals = {};
  expenses.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + Math.abs(tx.amount);
  });
  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const totalIncome = income.reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = Math.abs(
    expenses.reduce((sum, tx) => sum + tx.amount, 0)
  );
  const balance = totalIncome - totalExpenses;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthExpenses = expenses.filter((tx) => {
    const date = new Date(tx.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const monthlyTotal = Math.abs(currentMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0));
  const averageExpense = totalExpenses / (expenses.length || 1);

  const insights = [
    {
      icon: "💰",
      title: "Total Balance",
      value: formatCurrency(balance),
      description: income.length > 0 ? "Income minus expenses" : "No transactions yet",
    },
    {
      icon: "🏆",
      title: "Top Spending",
      value: highestCategory ? highestCategory[0] : "N/A",
      description: highestCategory
        ? `${formatCurrency(highestCategory[1])} spent`
        : "No expense data",
    },
    {
      icon: "📊",
      title: "Avg. Expense",
      value: formatCurrency(averageExpense),
      description: `Per transaction (${expenses.length} total)`,
    },
    {
      icon: "📈",
      title: "This Month",
      value: formatCurrency(monthlyTotal),
      description: `${currentMonthExpenses.length} transactions`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
      {insights.map((insight, index) => (
        <Card key={index}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-theme-muted text-sm font-medium">{insight.title}</p>
              <p className="text-2xl font-bold text-theme-primary mt-2">{insight.value}</p>
              <p className="text-xs text-theme-muted mt-1">{insight.description}</p>
            </div>
            <div className="text-3xl">{insight.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Insights;
