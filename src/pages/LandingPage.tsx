
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreeScene from '../components/ui/ThreeScene';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white">
            <ThreeScene />

            {/* Navbar Overlay */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/10">
                <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
                    NEXUS
                </div>
                <div className="space-x-4">
                    <Link to="/app/feed" className="px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-400">
                        Launch App
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-black tracking-tight sm:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
                >
                    The Future of <br />
                    <span className="text-indigo-500">Decentralized Video</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
                >
                    Experience censorship-resistant content creation with Web3 integration.
                    Upload, share, and earn in a truly decentralized ecosystem.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 flex gap-4"
                >
                    <Link
                        to="/app/feed"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                    >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>

                    <Link
                        to="/whitepaper"
                        className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/5 px-8 font-medium text-white transition-colors hover:bg-white/10 backdrop-blur-sm"
                    >
                        Learn More
                    </Link>
                </motion.div>
            </main>
        </div>
    );
};

export default LandingPage;
