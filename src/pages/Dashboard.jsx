import { useEffect, useMemo, useState } from "react";
import { useStore } from "../store/useStore";
import { summaryData, categoryBreakdown } from "../data/mockData";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import SummaryCard from "../components/cards/SummaryCard";
import Insights from "../components/cards/Insights";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "../components/charts/SpendingBreakdownChart";
import TransactionList from "../components/transactions/TransactionList";

function Dashboard() {
  const { transactions, role, setRole, addTransaction } = useStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("finance-theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("finance-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const { totalIncome, totalExpenses, balance, expenseCategories } = useMemo(() => {
    const incomeTotal = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expenseTotal = Math.abs(
      transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    const usedCategories = categoryBreakdown.filter((category) =>
      transactions.some(
        (transaction) => transaction.category === category.name && transaction.type === "expense"
      )
    );

    return {
      totalIncome: incomeTotal,
      totalExpenses: expenseTotal,
      balance: incomeTotal - expenseTotal,
      expenseCategories: usedCategories,
    };
  }, [transactions]);

  const isAdmin = role === "admin";
  const roleMessage = isAdmin
    ? ", you can add and manage transactions. Try adding a new transaction!"
    : ", you can only view transaction data. Switch to Admin role to add/edit transactions.";

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className="theme-shell min-h-screen relative overflow-hidden">
      <div className="theme-orb orb-a" />
      <div className="theme-orb orb-b" />
      {/* Header */}
      <header className="header-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-theme-primary tracking-tight">
                💰 Finance Dashboard
              </h1>
              <p className="text-sm text-theme-muted">
                Welcome to your financial overview
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="outline"
                className="text-lg w-11 h-11 !px-0"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </Button>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: "viewer", label: "👁️ Viewer" },
                  { value: "admin", label: "⚙️ Admin" },
                ]}
              />
            </div>
          </div>
          <div className="text-xs mt-2 text-theme-muted">
            Current Role: <span className="font-semibold uppercase">{role}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Total Balance"
            amount={balance}
            icon="💳"
            trend={12.5}
            trendLabel="vs last month"
          />
          <SummaryCard
            label="Total Income"
            amount={totalIncome}
            icon="💵"
            trend={8.2}
            trendLabel="vs last month"
          />
          <SummaryCard
            label="Total Expenses"
            amount={totalExpenses}
            icon="💸"
            trend={-5.3}
            trendLabel="vs last month"
          />
        </div>

        {/* Insights */}
        <Insights transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8">
          <BalanceTrendChart data={summaryData} isDarkMode={isDarkMode} />
          <SpendingBreakdownChart
            isDarkMode={isDarkMode}
            data={expenseCategories.length > 0 ? expenseCategories : categoryBreakdown}
          />
        </div>

        <div className="mt-8">
          <TransactionList
            transactions={transactions}
            onAddTransaction={addTransaction}
            isAdmin={isAdmin}
          />
        </div>

        <div className="mt-8 p-4 role-note">
          <p className="text-sm">
            <strong>Role Information:</strong> As a <strong>{isAdmin ? "Admin" : "Viewer"}</strong>
            {roleMessage}
          </p>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-theme-muted">
            Finance Dashboard © 2026. Track your finances with ease.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
