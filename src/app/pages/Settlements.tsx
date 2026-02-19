import React from 'react';
import { motion } from 'motion/react';
import { Download, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

const Settlements = () => {
  const transactions = [
    { id: 1, date: '2025-10-24 14:30', amount: 145.50, fee: 2.91, txHash: '0x8f...3a92', status: 'completed' },
    { id: 2, date: '2025-10-23 09:15', amount: 89.20, fee: 1.78, txHash: '0x7c...2b81', status: 'completed' },
    { id: 3, date: '2025-10-22 18:45', amount: 210.00, fee: 4.20, txHash: '0x6a...1c70', status: 'pending' },
    { id: 4, date: '2025-10-21 12:10', amount: 55.75, fee: 1.11, txHash: '0x5d...0d69', status: 'failed' },
    { id: 5, date: '2025-10-20 16:20', amount: 120.40, fee: 2.40, txHash: '0x4b...9e58', status: 'completed' },
    { id: 6, date: '2025-10-19 10:05', amount: 75.30, fee: 1.50, txHash: '0x3a...8f47', status: 'completed' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full text-xs font-bold border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs font-bold border border-red-500/20">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settlement History</h1>
          <p className="text-slate-400">Track your on-chain earnings and withdrawals.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Transaction Hash</th>
                <th className="px-6 py-4 font-medium">Amount (ADMC)</th>
                <th className="px-6 py-4 font-medium">Platform Fee</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {transactions.map((tx) => (
                <motion.tr 
                  key={tx.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-slate-700/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-slate-300 font-medium whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-indigo-400">
                      {tx.txHash}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-indigo-300" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-bold text-base">
                    {tx.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {tx.fee.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors text-xs underline">
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-700 flex justify-between items-center text-sm text-slate-400">
          <span>Showing 1-6 of 24 transactions</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlements;
