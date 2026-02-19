import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, UserCheck, PlayCircle, SkipForward, BadgeDollarSign, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const VideoPlayer = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(true);

  // Simulate ad progress
  useEffect(() => {
    if (isAdPlaying) {
      const interval = setInterval(() => {
        setAdProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAdPlaying(false);
            toast.success("Ad view verified on-chain! You earned 0.05 ADMC.");
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAdPlaying]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Video Player Container */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-4 group">
          {/* Mock Video Content */}
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
             <img 
                src="https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cCUyMGRhcmt8ZW58MXx8fHwxNzcxNTA3MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                className="w-full h-full object-cover opacity-50"
             />
             <button 
               onClick={() => setIsPlaying(!isPlaying)}
               className="absolute z-10 w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all transform hover:scale-110"
             >
               <PlayCircle className="w-8 h-8 text-white fill-current" />
             </button>
          </div>

          {/* Ad Overlay */}
          {isAdPlaying && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">AD</span>
                  <span className="text-white text-sm font-medium">Sponsor: DeFi Protocol XYZ</span>
                </div>
                <button className="text-slate-400 text-xs hover:text-white flex items-center gap-1">
                  Skip in {Math.max(0, 5 - Math.floor(adProgress / 20))}s <SkipForward className="w-3 h-3" />
                </button>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-500" 
                  initial={{ width: "0%" }}
                  animate={{ width: `${adProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Building a Decentralized App in 10 Minutes</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span>12,405 views</span>
              <span>•</span>
              <span>Oct 24, 2025</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                <BadgeDollarSign className="w-3 h-3" />
                Earn 0.05 ADMC
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium transition-colors text-slate-200">
                <ThumbsUp className="w-4 h-4" /> 2.5K
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium transition-colors text-slate-200">
                <ThumbsDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium transition-colors text-slate-200">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 px-2 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-medium transition-colors text-slate-200">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700 mb-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
              CD
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-1">
                CryptoDev
                <UserCheck className="w-4 h-4 text-blue-400 fill-current" />
              </h3>
              <p className="text-sm text-slate-400">105K subscribers</p>
            </div>
          </div>
          <button className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-2 rounded-full font-bold text-sm transition-colors">
            Subscribe
          </button>
        </div>

        {/* Comments Section (Mock) */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
           <div className="flex items-center gap-2 mb-4">
             <MessageSquare className="w-5 h-5 text-slate-400" />
             <h3 className="font-bold text-white">Comments (4)</h3>
           </div>
           
           <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-white">User{i}</span>
                      <span className="text-xs text-slate-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-slate-300">Great tutorial! The Web3 integration part was really clear.</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right Sidebar - Related Videos */}
      <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
        <h3 className="font-bold text-white text-lg mb-2">Up Next</h3>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex gap-2 group cursor-pointer hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
            <div className="relative w-40 h-24 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
               <img 
                 src={`https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cCUyMGRhcmt8ZW58MXx8fHwxNzcxNTA3MzI1fDA&ixlib=rb-4.1.0&q=80&w=200`}
                 className="w-full h-full object-cover"
               />
               <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">10:24</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h4 className="font-medium text-sm text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">
                Advanced Smart Contract Development
              </h4>
              <p className="text-xs text-slate-400">CryptoDev</p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <span>5K views</span>
                <span>•</span>
                <span>1 day ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
