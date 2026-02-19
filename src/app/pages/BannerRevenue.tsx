import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, Users, TrendingUp, HelpCircle } from 'lucide-react';

const BannerRevenue = () => {
  const data = [
    { name: 'Creator Pool (70%)', value: 70, color: '#10B981' },
    { name: 'Platform Fee (30%)', value: 30, color: '#6366F1' },
  ];

  const monthlyRevenue = [
    { name: 'Jan', revenue: 1200 },
    { name: 'Feb', revenue: 1500 },
    { name: 'Mar', revenue: 1800 },
    { name: 'Apr', revenue: 2200 },
    { name: 'May', revenue: 2600 },
    { name: 'Jun', revenue: 3100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Revenue Distribution</h1>
          <p className="text-slate-400">Transparent breakdown of platform earnings and creator rewards.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Split Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Revenue Split Model
          </h3>
          
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }} 
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">70%</span>
              <span className="text-xs text-slate-400">Creator Share</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-300">Creator Pool</span>
              </div>
              <span className="font-bold text-emerald-400">70%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-sm text-slate-300">Platform Maintenance</span>
              </div>
              <span className="font-bold text-indigo-400">30%</span>
            </div>
          </div>
        </motion.div>

        {/* Monthly Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Monthly Revenue Growth
              </h3>
              <p className="text-sm text-slate-400 mt-1">Total revenue generated across all campaigns.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Total this month</p>
              <p className="text-2xl font-bold text-emerald-400 font-mono">3,100 ADMC</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                />
                <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-xl p-6 flex items-start gap-4">
        <div className="bg-indigo-600/20 p-2 rounded-lg text-indigo-400">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">How are rewards calculated?</h4>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            Rewards are distributed based on a "Pay Per View" consensus mechanism. Each valid view is verified on-chain to prevent bot fraud. 
            Advertisers deposit funds into a smart contract, which releases payments directly to creators (70%) and the platform DAO (30%) instantly upon verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerRevenue;
