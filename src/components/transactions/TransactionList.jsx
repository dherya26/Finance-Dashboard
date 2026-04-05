import { useMemo, useState } from "react";
import { format } from "date-fns";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { formatCurrency } from "../../utils/helpers";

const sortTransactions = (items, sortBy) => {
  const sorted = [...items];

  if (sortBy === "amount") {
    return sorted.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
  }

  if (sortBy === "type") {
    return sorted.sort((a, b) => a.type.localeCompare(b.type));
  }

  return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
};

function TransactionList({ transactions, onAddTransaction, isAdmin }) {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const categories = useMemo(() => ["all", ...new Set(transactions.map((transaction) => transaction.category))], [transactions]);

  const filtered = useMemo(() => {
    const query = filter.toLowerCase().trim();

    return sortTransactions(
      transactions.filter((transaction) => {
        return (
          transaction.description.toLowerCase().includes(query) &&
          (categoryFilter === "all" || transaction.category === categoryFilter) &&
          (typeFilter === "all" || transaction.type === typeFilter)
        );
      }),
      sortBy
    );
  }, [transactions, filter, categoryFilter, typeFilter, sortBy]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) {
      alert("Please fill in all fields");
      return;
    }
    onAddTransaction({
      ...newTransaction,
      id: Math.max(...transactions.map((t) => t.id), 0) + 1,
      amount: newTransaction.type === "expense" 
        ? -Math.abs(parseFloat(newTransaction.amount))
        : Math.abs(parseFloat(newTransaction.amount)),
    });
    setNewTransaction({
      description: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: format(new Date(), "yyyy-MM-dd"),
    });
    setShowAddForm(false);
  };

  return (
    <Card className="col-span-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold section-title">Transactions</h3>
          {isAdmin && (
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              variant={showAddForm ? "secondary" : "primary"}
            >
              {showAddForm ? "Cancel" : "+ Add Transaction"}
            </Button>
          )}
        </div>

        {showAddForm && isAdmin && (
          <form onSubmit={handleAddTransaction} className="p-4 rounded-xl border" style={{ background: "var(--table-head)", borderColor: "var(--border-color)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, description: e.target.value })
                }
                className="ui-input"
              />
              <input
                type="number"
                placeholder="Amount (INR)"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                className="ui-input"
              />
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
                className="ui-select"
              >
                {categories.filter((c) => c !== "all").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                className="ui-select"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                className="ui-input col-span-full"
              />
            </div>
            <Button type="submit" variant="success" className="mt-4 w-full">
              Add Transaction
            </Button>
          </form>
        )}

        <div className="flex flex-wrap gap-3">
          <Input
            placeholder="Search transactions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categories.map((cat) => ({
              value: cat,
              label: cat === "all" ? "All Categories" : cat,
            }))}
            className="w-40"
          />
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: "all", label: "All Types" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
            className="w-40"
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "date", label: "Date (Newest)" },
              { value: "amount", label: "Amount" },
              { value: "type", label: "Type" },
            ]}
            className="w-40"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-theme-muted">
            No transactions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-theme">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 text-theme-muted">
                      {format(new Date(tx.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-4 py-3 font-medium">{tx.description}</td>
                    <td className="px-4 py-3 text-theme-muted">{tx.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tx.type === "income"
                            ? "pill-income"
                            : "pill-expense"
                        }`}
                      >
                        {tx.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span>{tx.amount > 0 ? "+" : ""}</span>
                      <span>{formatCurrency(Math.abs(tx.amount))}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-sm text-theme-muted text-right">
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      </div>
    </Card>
  );
}

export default TransactionList;
