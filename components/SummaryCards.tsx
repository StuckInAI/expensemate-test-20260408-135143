'use client';

interface Props {
  totalSpent: number;
  monthlyBudget: number;
  remaining: number;
  transactionCount: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function SummaryCards({ totalSpent, monthlyBudget, remaining, transactionCount }: Props) {
  return (
    <div className="summary-grid">
      <div className="summary-card budget">
        <div className="summary-icon">🎯</div>
        <div className="summary-label">Monthly Budget</div>
        <div className="summary-value">{formatCurrency(monthlyBudget)}</div>
      </div>
      <div className="summary-card spent">
        <div className="summary-icon">💳</div>
        <div className="summary-label">Total Spent</div>
        <div className="summary-value danger">{formatCurrency(totalSpent)}</div>
      </div>
      <div className="summary-card remaining">
        <div className="summary-icon">💰</div>
        <div className="summary-label">Remaining</div>
        <div className={`summary-value ${remaining >= 0 ? 'success' : 'danger'}`}>
          {formatCurrency(remaining)}
        </div>
      </div>
      <div className="summary-card transactions">
        <div className="summary-icon">📝</div>
        <div className="summary-label">This Month</div>
        <div className="summary-value">{transactionCount} txns</div>
      </div>
    </div>
  );
}
