import React, { useState } from 'react';
import MoneyUpdateForm from './components/MoneyUpdateForm.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleTransactionAdd = () => setRefreshKey((k) => k + 1);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Money Tracker</h1>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-4">
          <MoneyUpdateForm onTransactionAdd={handleTransactionAdd} />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-4 mt-6 md:mt-0">
          <Dashboard refresh={refreshKey} />
        </div>
      </div>
    </div>
  );
}
