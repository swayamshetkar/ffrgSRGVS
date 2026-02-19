import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { motion } from 'motion/react';
import { Eye, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const Analytics = () => {
  const viewsData = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 2000 },
    { name: 'Thu', views: 2780 },
    { name: 'Fri', views: 1890 },
    { name: 'Sat', views: 2390 },
    { name: 'Sun', views: 3490 },
  ];

  const revenueData = [
    { name: 'Video A', revenue: 400 },
    { name: 'Video B', revenue: 300 },
    { name: 'Video C', revenue: 200 },
    { name: 'Video D', revenue: 278 },
    { name: 'Video E', revenue: 189 },
  ];

  const pieData = [
    { name: 'Ad Revenue', value: 400 },
    { name: 'Direct Support', value: 300 },
    { name: 'Sponsorships', value: 300 },
    { name: 'Merch', value: 200 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  const stats = [
    { 
      title: 'Total Views', 
      value: '124.5K', 
      change: '+12%', 
      icon: <Eye className="w-5 h-5 text-indigo-400" />,
      color: 'bg-indigo-500/10 border-indigo-500/20'
    },
    { 
      title: 'Total Earnings', 
      value: '2,450 ADMC', 
      change: '+8%', 
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    { 
      title: 'Active Campaigns', 
      value: '3', 
      change: 'Active', 
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    { 
      title: 'Subscribers', 
      value: '12.8K', 
      change: '+245', 
      icon: <Users className="w-5 h-5 text-purple-400" />,
      color: 'bg-purple-500/10 border-purple-500/20'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
        <select className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-xl border backdrop-blur-sm ${stat.color} flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-slate-900/50 backdrop-blur-md">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/10 ${stat.change.includes('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Views Over Time
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Line type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={3} dot={{ fill: '#6366F1', r: 4 }} activeDot={{ r: 6, stroke: '#818CF8', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Top Earning Videos
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

       {/* Pie Chart & Recent Activity */}
       <div className="grid lg:grid-cols-3 gap-6">
         <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Sources</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
         </div>

         <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
           <h3 className="text-lg font-bold text-white mb-6">Recent Settlements</h3>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
                 <tr>
                   <th className="px-4 py-3 rounded-l-lg">Date</th>
                   <th className="px-4 py-3">Transaction Hash</th>
                   <th className="px-4 py-3">Amount</th>
                   <th className="px-4 py-3 rounded-r-lg">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-700">
                 {[1, 2, 3, 4].map((item) => (
                   <tr key={item} className="hover:bg-slate-700/30 transition-colors">
                     <td className="px-4 py-3 text-white">Oct {24 - item}, 2025</td>
                     <td className="px-4 py-3 font-mono text-indigo-400 truncate max-w-[150px]">
                       0x7f...3a9{item}
                     </td>
                     <td className="px-4 py-3 text-emerald-400 font-bold">
                       +{(Math.random() * 10).toFixed(2)} ADMC
                     </td>
                     <td className="px-4 py-3">
                       <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                         Confirmed
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
    </div>
  );
};

export default Analytics;
