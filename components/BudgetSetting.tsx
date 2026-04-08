'use client';

import { useState } from 'react';

interface Props {
  currentBudget: number;
  onUpdate: (budget: number) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function BudgetSetting({ currentBudget, onUpdate }: Props) {
  const [value, setValue] = useState(String(currentBudget));
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid budget amount.');
      return;
    }
    setError('');
    onUpdate(num);
  };

  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        Current budget: <strong style={{ color: 'var(--text)' }}>{formatCurrency(currentBudget)}</strong>/month
      </p>
      {error && (
        <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: 12 }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="budget-setting-form">
        <div className="form-group">
          <label className="form-label">New Budget ($)</label>
          <input
            className="form-input"
            type="number"
            min="1"
            step="0.01"
            placeholder="3000.00"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: 'auto', marginTop: 22 }}>
          Update
        </button>
      </form>
    </div>
  );
}
