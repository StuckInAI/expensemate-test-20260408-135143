'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <span>💸</span>
          <span>ExpenseTracker</span>
        </div>
        <div className="navbar-date">{dateStr}</div>
      </div>
    </nav>
  );
}
