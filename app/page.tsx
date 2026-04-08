'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import BudgetProgress from '../components/BudgetProgress';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import CategoryChart from '../components/CategoryChart';
import BudgetSetting from '../components/BudgetSetting';
import ToastContainer from '../components/ToastContainer';
import { Expense, Toast, Category } from '../types';

const STORAGE_KEY_EXPENSES = 'expense_tracker_expenses';
const STORAGE_KEY_BUDGET = 'expense_tracker_budget';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(3000);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSES);
    const savedBudget = localStorage.getItem(STORAGE_KEY_BUDGET);
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch {
        setExpenses([]);
      }
    }
    if (savedBudget) {
      setMonthlyBudget(parseFloat(savedBudget));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY_BUDGET, String(monthlyBudget));
    }
  }, [monthlyBudget, mounted]);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    addToast('Expense added successfully!', 'success');
  }, [addToast]);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    addToast('Expense deleted.', 'info');
  }, [addToast]);

  const updateBudget = useCallback((budget: number) => {
    setMonthlyBudget(budget);
    addToast('Budget updated!', 'success');
  }, [addToast]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalSpent = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = monthlyBudget - totalSpent;

  const filteredExpenses = expenses.filter(e => {
    const matchCategory = filterCategory === 'all' || e.category === filterCategory;
    const matchSearch = e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categoryTotals: Record<Category, number> = {
    food: 0,
    transport: 0,
    housing: 0,
    entertainment: 0,
    health: 0,
    shopping: 0,
    utilities: 0,
    other: 0,
  };

  thisMonthExpenses.forEach(e => {
    categoryTotals[e.category] += e.amount;
  });

  if (!mounted) {
    return (
      <div className="page-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="container" style={{ paddingTop: 30 }}>
        <SummaryCards
          totalSpent={totalSpent}
          monthlyBudget={monthlyBudget}
          remaining={remaining}
          transactionCount={thisMonthExpenses.length}
        />
        <BudgetProgress
          totalSpent={totalSpent}
          monthlyBudget={monthlyBudget}
        />
        <div className="main-layout">
          <div>
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">📋 All Expenses</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{filteredExpenses.length} record{filteredExpenses.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="panel-body">
                <div className="filter-bar">
                  <input
                    className="search-input"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="filter-select"
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="food">🍔 Food</option>
                    <option value="transport">🚗 Transport</option>
                    <option value="housing">🏠 Housing</option>
                    <option value="entertainment">🎬 Entertainment</option>
                    <option value="health">💊 Health</option>
                    <option value="shopping">🛍️ Shopping</option>
                    <option value="utilities">💡 Utilities</option>
                    <option value="other">📦 Other</option>
                  </select>
                </div>
                <ExpenseList
                  expenses={filteredExpenses}
                  onDelete={deleteExpense}
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">➕ Add Expense</h2>
              </div>
              <div className="panel-body">
                <ExpenseForm onAdd={addExpense} />
              </div>
            </div>
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">💰 Monthly Budget</h2>
              </div>
              <div className="panel-body">
                <BudgetSetting currentBudget={monthlyBudget} onUpdate={updateBudget} />
              </div>
            </div>
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">📊 Spending by Category</h2>
              </div>
              <div className="panel-body">
                <CategoryChart categoryTotals={categoryTotals} totalSpent={totalSpent} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer toasts={toasts} />
    </div>
  );
}
