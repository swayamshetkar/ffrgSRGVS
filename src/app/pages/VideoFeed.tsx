import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, MoreVertical, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoFeed = () => {
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "Building a Decentralized App in 10 Minutes",
      creator: "CryptoDev",
      avatar: "CD",
      views: "12K",
      time: "2 days ago",
      duration: "10:24",
      reward: "0.05",
      thumbnail: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cCUyMGRhcmt8ZW58MXx8fHwxNzcxNTA3MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "The Future of Web3 Gaming Explained",
      creator: "GameFi Hub",
      avatar: "GH",
      views: "8.5K",
      time: "5 hours ago",
      duration: "14:10",
      reward: "0.03",
      thumbnail: "https://images.unsplash.com/photo-1617507171089-6cb9aa5add36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJnYnxlbnwxfHx8fDE3NzE0OTA1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Understanding Blockchain Visualizations",
      creator: "DataViz Pro",
      avatar: "DP",
      views: "32K",
      time: "1 week ago",
      duration: "08:45",
      reward: "0.10",
      thumbnail: "https://images.unsplash.com/photo-1768242079046-c9c633187db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzE1MDI5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "Digital Art Landscapes 2024",
      creator: "ArtStation",
      avatar: "AS",
      views: "1.2K",
      time: "3 days ago",
      duration: "05:30",
      reward: "0.02",
      thumbnail: "https://images.unsplash.com/photo-1528826291215-e7b2d8fe2c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MTUwNzMyNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      title: "Abstract Tech: Design Principles",
      creator: "DesignMasters",
      avatar: "DM",
      views: "45K",
      time: "2 weeks ago",
      duration: "12:00",
      reward: "0.08",
      thumbnail: "https://images.unsplash.com/photo-1736175549681-c24c552da1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxNDE2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      title: "Market Analysis for Q2 2026",
      creator: "CryptoWatch",
      avatar: "CW",
      views: "5K",
      time: "1 day ago",
      duration: "18:20",
      reward: "0.15",
      thumbnail: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzcxNTA3MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Recommended Videos</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-colors">All</button>
          <button className="px-3 py-1 hover:bg-slate-800 text-slate-400 rounded-full text-sm transition-colors">Web3</button>
          <button className="px-3 py-1 hover:bg-slate-800 text-slate-400 rounded-full text-sm transition-colors">Gaming</button>
          <button className="px-3 py-1 hover:bg-slate-800 text-slate-400 rounded-full text-sm transition-colors">Art</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
            onClick={() => navigate(`/app/watch/${video.id}`)}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-700 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 backdrop-blur-sm">
                <Coins className="w-3 h-3" />
                {video.reward} ADMC
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-indigo-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                  <Play className="w-6 h-6 text-white ml-1 fill-current" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 border border-slate-600">
                    {video.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium line-clamp-2 leading-tight mb-1 group-hover:text-indigo-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-1">{video.creator}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>{video.views} views</span>
                    <span className="mx-1">•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
                <button className="self-start text-slate-500 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
