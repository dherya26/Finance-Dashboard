import Card from "../ui/Card";
import { formatCurrency } from "../../utils/helpers";

function SummaryCard({ label, amount, icon, trend, trendLabel }) {
  const isPositive = trend >= 0;
  
  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-theme-muted text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-theme-primary mt-2">
            {formatCurrency(Math.abs(amount))}
          </p>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "↑" : "↓"} {Math.abs(trend)}% {trendLabel}
            </p>
          )}
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </Card>
  );
}

export default SummaryCard;
