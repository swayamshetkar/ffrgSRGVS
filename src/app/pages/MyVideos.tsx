import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, Eye, ThumbsUp, MessageSquare, ExternalLink, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyVideos = () => {
  const videos = [
    {
      id: 1,
      title: "Building a Decentralized App in 10 Minutes",
      thumbnail: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cCUyMGRhcmt8ZW58MXx8fHwxNzcxNTA3MzI1fDA&ixlib=rb-4.1.0&q=80&w=300",
      views: 12405,
      likes: 2500,
      comments: 45,
      date: "Oct 24, 2025",
      status: "Public",
      cid: "QmX7...9s2"
    },
    {
      id: 2,
      title: "The Future of Web3 Gaming Explained",
      thumbnail: "https://images.unsplash.com/photo-1617507171089-6cb9aa5add36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHJnYnxlbnwxfHx8fDE3NzE0OTA1NTJ8MA&ixlib=rb-4.1.0&q=80&w=300",
      views: 8500,
      likes: 1200,
      comments: 32,
      date: "Oct 20, 2025",
      status: "Public",
      cid: "QmY8...2k1"
    },
    {
      id: 3,
      title: "Draft: Smart Contract Auditing",
      thumbnail: "https://images.unsplash.com/photo-1768242079046-c9c633187db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzE1MDI5OTF8MA&ixlib=rb-4.1.0&q=80&w=300",
      views: 0,
      likes: 0,
      comments: 0,
      date: "Oct 18, 2025",
      status: "Private",
      cid: "QmZ3...5p9"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">My Content</h1>
          <p className="text-slate-400">Manage your uploaded videos and view performance.</p>
        </div>
        <Link 
          to="/app/upload"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          Upload New Video
        </Link>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 font-medium w-1/3">Video</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Performance</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {videos.map((video) => (
                <motion.tr 
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-slate-700/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                         <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover"
                         />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-medium line-clamp-1 mb-1 group-hover:text-indigo-400 transition-colors">{video.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <span className="truncate max-w-[100px]">{video.cid}</span>
                          <ExternalLink className="w-3 h-3 hover:text-indigo-400 cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                      video.status === 'Public' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {video.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {video.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="flex items-center gap-1" title="Views">
                        <Eye className="w-4 h-4 text-slate-500" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1" title="Likes">
                        <ThumbsUp className="w-4 h-4 text-slate-500" />
                        <span>{video.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1" title="Comments">
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                        <span>{video.comments}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyVideos;
