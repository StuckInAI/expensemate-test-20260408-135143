export type Category =
  | 'food'
  | 'transport'
  | 'housing'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'utilities'
  | 'other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface CategoryInfo {
  label: string;
  icon: string;
  colorClass: string;
  barColor: string;
}

export const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  food: { label: 'Food & Dining', icon: '🍔', colorClass: 'cat-food', barColor: '#f59e0b' },
  transport: { label: 'Transport', icon: '🚗', colorClass: 'cat-transport', barColor: '#6366f1' },
  housing: { label: 'Housing', icon: '🏠', colorClass: 'cat-housing', barColor: '#22c55e' },
  entertainment: { label: 'Entertainment', icon: '🎬', colorClass: 'cat-entertainment', barColor: '#a855f7' },
  health: { label: 'Health', icon: '💊', colorClass: 'cat-health', barColor: '#ef4444' },
  shopping: { label: 'Shopping', icon: '🛍️', colorClass: 'cat-shopping', barColor: '#f97316' },
  utilities: { label: 'Utilities', icon: '💡', colorClass: 'cat-utilities', barColor: '#0ea5e9' },
  other: { label: 'Other', icon: '📦', colorClass: 'cat-other', barColor: '#94a3b8' },
};
