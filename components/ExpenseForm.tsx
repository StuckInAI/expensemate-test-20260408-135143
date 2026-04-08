'use client';

import { useState } from 'react';
import { Expense, Category } from '../types';

interface Props {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

const defaultDate = () => new Date().toISOString().split('T')[0];

export default function ExpenseForm({ onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('food');
  const [date, setDate] = useState(defaultDate);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }
    setError('');
    onAdd({
      description: description.trim(),
      amount: amt,
      category,
      date,
      note: note.trim() || undefined,
    });
    setDescription('');
    setAmount('');
    setCategory('food');
    setDate(defaultDate());
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', marginBottom: 16, fontWeight: 500 }}>
          ⚠️ {error}
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Description *</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Grocery shopping"
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={80}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Amount ($) *</label>
          <input
            className="form-input"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Category *</label>
        <select
          className="form-input"
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
        >
          <option value="food">🍔 Food &amp; Dining</option>
          <option value="transport">🚗 Transport</option>
          <option value="housing">🏠 Housing</option>
          <option value="entertainment">🎬 Entertainment</option>
          <option value="health">💊 Health</option>
          <option value="shopping">🛍️ Shopping</option>
          <option value="utilities">💡 Utilities</option>
          <option value="other">📦 Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Note (optional)</label>
        <input
          className="form-input"
          type="text"
          placeholder="Any extra details..."
          value={note}
          onChange={e => setNote(e.target.value)}
          maxLength={120}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        ➕ Add Expense
      </button>
    </form>
  );
}
