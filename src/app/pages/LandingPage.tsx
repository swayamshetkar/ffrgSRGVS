import React from 'react';
import { motion } from 'motion/react';
import { useWallet } from '../context/WalletContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Database, PlayCircle, BarChart3, Wallet, Video, TrendingUp, Github, FileText, Twitter, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const LandingPage = () => {
  const { connect, isConnected } = useWallet();
  const navigate = useNavigate();

  const handleConnect = async () => {
    await connect();
    navigate('/app');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      title: "Transparent Settlements",
      description: "Every ad view is verified on-chain. Creators get paid instantly without middleman delays."
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-400" />,
      title: "IPFS Video Storage",
      description: "Decentralized storage ensures your content is censorship-resistant and always available."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-amber-400" />,
      title: "2% Fair Platform Fee",
      description: "We take only 2% to maintain the protocol. You keep 98% of your ad revenue."
    }
  ];

  const steps = [
    { title: "Upload", desc: "Creators upload content to IPFS via our dashboard." },
    { title: "Watch", desc: "Users watch videos and view non-intrusive ads." },
    { title: "Earn", desc: "Ad revenue is calculated in real-time per view." },
    { title: "Settle", desc: "Smart contracts distribute tokens to your wallet." }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <PlayCircle className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">PayPerView</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              <a href="#docs" className="hover:text-white transition-colors">Docs</a>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={isConnected ? () => navigate('/app') : handleConnect}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg shadow-indigo-500/20 text-sm flex items-center gap-2"
              >
                {isConnected ? 'Go to Dashboard' : (
                  <>
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Live on Algorand Testnet
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Decentralized Creator <br /> Monetization
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the future of video streaming. Transparent ad settlements, 
              direct creator payments, and censorship-resistant storage powered by Web3.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleConnect}
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
              <Link 
                to="/app"
                className="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Explore Videos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-colors backdrop-blur-sm"
              >
                <div className="mb-4 bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-950 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400">Simple, transparent flow for creators and viewers.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 font-bold mb-4 shadow-lg shadow-indigo-500/10">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-slate-400 max-w-[200px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="text-indigo-500 w-6 h-6 fill-current" />
                <span className="text-xl font-bold">PayPerView</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                The first decentralized video platform that ensures fair compensation through blockchain verification.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Browse Videos</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Creators</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Advertisers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><FileText className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; 2026 PayPerView. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
