import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, Coins, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const CreateCampaign = () => {
  const [budget, setBudget] = useState(100);
  const [rewardPerView, setRewardPerView] = useState(0.05);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const estimatedViews = Math.floor(budget / rewardPerView);
  const platformFee = budget * 0.02; // 2% fee

  const handleDeposit = () => {
    setShowConfirm(true);
  };

  const confirmTransaction = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Interacting with Smart Contract...',
        success: () => {
          setShowConfirm(false);
          return 'Campaign created! Funds locked in escrow.';
        },
        error: 'Transaction failed',
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Ad Campaign</h1>
          <p className="text-slate-400">Promote your content with decentralized transparency.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-indigo-400" />
              Campaign Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Summer Sale 2026"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Category</label>
                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Finance</option>
                  <option>Lifestyle</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <label className="block text-sm font-medium text-slate-300 mb-2">Total Budget (ADMC)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">ADMC</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Reward Per View</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0.01" 
                    max="1.00" 
                    step="0.01" 
                    value={rewardPerView}
                    onChange={(e) => setRewardPerView(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-mono text-white font-bold w-16 text-right">{rewardPerView.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Higher rewards attract more viewers faster.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimation & Action */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              Campaign Estimation
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Est. Total Views</span>
                <span className="text-2xl font-bold text-white font-mono">{estimatedViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Platform Fee (2%)</span>
                <span className="text-slate-200 font-mono">{platformFee.toFixed(2)} ADMC</span>
              </div>
              <div className="h-px bg-slate-700 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-indigo-300 font-bold">Total Deposit</span>
                <span className="text-3xl font-bold text-indigo-400 font-mono">{(budget + platformFee).toFixed(2)} ADMC</span>
              </div>
            </div>

            <button 
              onClick={handleDeposit}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              Deposit & Launch 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Smart Contract Verified
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3">
             <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
             <p className="text-sm text-amber-200/80">
               Funds are held in an escrow smart contract. Unused funds can be withdrawn at any time after the campaign ends.
             </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Confirm Deposit</h3>
                <p className="text-slate-400 text-sm">
                  Please sign the transaction in your wallet to deposit <span className="text-white font-mono font-bold">{(budget + platformFee).toFixed(2)} ADMC</span>.
                </p>
              </div>

              <div className="space-y-3 mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Network</span>
                  <span className="text-emerald-400 font-medium">Algorand Testnet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Gas Fee</span>
                  <span className="text-slate-200 font-mono">0.001 ALGO</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmTransaction}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  Sign & Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateCampaign;
