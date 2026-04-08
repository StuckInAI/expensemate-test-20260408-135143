'use client';

import { Expense, CATEGORY_INFO } from '../types';

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <div className="empty-state-text">No expenses found.<br />Add your first expense!</div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map(expense => {
        const catInfo = CATEGORY_INFO[expense.category];
        return (
          <div key={expense.id} className="expense-item">
            <div className={`expense-category-icon ${catInfo.colorClass}`}>
              {catInfo.icon}
            </div>
            <div className="expense-info">
              <div className="expense-desc">{expense.description}</div>
              <div className="expense-meta">
                <span className={`category-badge ${catInfo.colorClass}`}>{catInfo.label}</span>
                {' · '}
                {formatDate(expense.date)}
                {expense.note && <> · <em>{expense.note}</em></>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span className="expense-amount">{formatCurrency(expense.amount)}</span>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(expense.id)}
                title="Delete expense"
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
