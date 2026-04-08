'use client';

interface Props {
  totalSpent: number;
  monthlyBudget: number;
}

export default function BudgetProgress({ totalSpent, monthlyBudget }: Props) {
  const pct = monthlyBudget > 0 ? Math.min((totalSpent / monthlyBudget) * 100, 100) : 0;
  const fillClass = pct >= 90 ? 'danger' : pct >= 70 ? 'warning' : 'safe';

  return (
    <div className="budget-progress">
      <div className="budget-progress-header">
        <span className="budget-progress-title">Budget Used This Month</span>
        <span className="budget-progress-pct">{pct.toFixed(1)}%</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className={`progress-bar-fill ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
