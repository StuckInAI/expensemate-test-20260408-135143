'use client';

import { Category, CATEGORY_INFO } from '../types';

interface Props {
  categoryTotals: Record<Category, number>;
  totalSpent: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function CategoryChart({ categoryTotals, totalSpent }: Props) {
  const categories = (Object.keys(categoryTotals) as Category[]).filter(
    cat => categoryTotals[cat] > 0
  ).sort((a, b) => categoryTotals[b] - categoryTotals[a]);

  if (categories.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '24px 0' }}>
        <div className="empty-state-icon">📊</div>
        <div className="empty-state-text">No spending data this month.</div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-bar-list">
        {categories.map(cat => {
          const info = CATEGORY_INFO[cat];
          const pct = totalSpent > 0 ? (categoryTotals[cat] / totalSpent) * 100 : 0;
          return (
            <div key={cat} className="chart-bar-item">
              <div className="chart-bar-header">
                <span className="chart-bar-label">
                  {info.icon} {info.label}
                </span>
                <span className="chart-bar-value">
                  {formatCurrency(categoryTotals[cat])} ({pct.toFixed(1)}%)
                </span>
              </div>
              <div className="chart-bar-bg">
                <div
                  className="chart-bar-fill"
                  style={{ width: `${pct}%`, background: info.barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
