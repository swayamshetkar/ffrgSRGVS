
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useWallet } from '../context/WalletContext'; // Assuming context exists based on App.tsx

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-transparent text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
                        NEXUS
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { name: 'Feed', path: '/app/feed' },
                        { name: 'Upload', path: '/app/upload' },
                        { name: 'My Videos', path: '/app/videos' },
                        { name: 'Campaigns', path: '/app/campaigns' },
                        { name: 'Analytics', path: '/app/analytics' },
                        { name: 'Revenue', path: '/app/revenue' },
                        { name: 'Settlements', path: '/app/settlements' },
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="text-xs text-gray-500">
                        Connected: <span className="text-green-400">●</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black/20 backdrop-blur-sm">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 glass border-b border-white/10">
                    <div className="font-bold">NEXUS</div>
                    {/* Add Mobile Menu Toggle Here */}
                </header>

                <div className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
