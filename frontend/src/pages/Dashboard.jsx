import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ThemeContext } from '../App';
import { Terminal, LayoutGrid, Trophy, Book, Play, ArrowRight, Activity, Zap, Shield, Target, ChevronRight, History, Code } from 'lucide-react';

export default function Dashboard() {
  const { user, xp } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'users', user.id, 'history'), orderBy('timestamp', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        const historyData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistory(historyData);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Space_Grotesk'] selection:bg-lime-400/30">
      <nav className="flex justify-between items-center px-8 h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Terminal className="text-lime-400" />
          <span className="text-xl font-bold tracking-tighter">DebugQuest</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <button onClick={() => navigate('/dashboard')} className="text-lime-400">Dashboard</button>
          <button onClick={() => navigate('/projects')} className="text-zinc-400 hover:text-white transition-colors">Projects</button>
          <button onClick={() => navigate('/docs')} className="text-zinc-400 hover:text-white transition-colors">Documentation</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{user?.username || "Hunter"}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Welcome back, <span className="text-lime-400">{user?.username || "Hunter"}</span>.</h1>
          <p className="text-zinc-500">The Arena awaits your next move. System integrity is at <span className="text-white font-bold">98.4%</span>.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* XP Progress Card */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy size={120} className="text-lime-400" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Rank Progression</h3>
                  <div className="text-3xl font-bold italic">{user?.rank_title || "Novice Hunter"}</div>
                </div>
                <div className="text-right">
                  <div className="text-lime-400 font-bold text-xl">{xp} XP</div>
                  <div className="text-zinc-500 text-xs uppercase tracking-widest">Level {user?.level || 1}</div>
                </div>
              </div>
              <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                <div 
                  className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 shadow-[0_0_20px_rgba(217,244,0,0.4)] transition-all duration-1000" 
                  style={{ width: `${(xp % 2000 / 2000) * 100}%` }}
                ></div>
              </div>
              <div className="mt-6 flex gap-4">
                <button 
                  onClick={() => navigate('/arena-selection')}
                  className="bg-lime-400 text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-all flex items-center gap-2 group/btn"
                >
                  Enter the Arena
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-zinc-700 transition-all"
                >
                  Global Rankings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Tactical Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Activity size={14} className="text-blue-400" /> Anomalies Cleared</span>
                  <span className="font-mono font-bold text-white">{history.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Avg. Solve Time</span>
                  <span className="font-mono font-bold text-white">2.4m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Shield size={14} className="text-purple-400" /> Security Rating</span>
                  <span className="font-mono font-bold text-lime-400">A+</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest font-mono">Hunter ID: {user?.id?.substring(0, 8).toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <History className="text-lime-400" size={20} />
                    Intelligence Logs
                </h2>
                {loadingHistory ? (
                    <div className="flex justify-center p-12">
                        <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : history.length > 0 ? (
                    history.map(item => (
                        <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between group hover:border-lime-400/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:bg-lime-400/10 group-hover:border-lime-400/30 transition-all">
                                    <Code className="text-zinc-500 group-hover:text-lime-400 transition-colors" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white group-hover:text-lime-400 transition-colors">{item.title}</h4>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{item.language} • {item.xp_earned} XP EARNED</p>
                                </div>
                            </div>
                            <ChevronRight className="text-zinc-700 group-hover:text-lime-400 transition-all" size={20} />
                        </div>
                    ))
                ) : (
                    <div className="p-12 border border-zinc-800 border-dashed rounded-2xl text-center">
                        <p className="text-zinc-600 text-xs italic">No mission data recorded. The Arena awaits your first initialization.</p>
                    </div>
                )}
           </div>

           <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Book className="text-lime-400" size={20} />
                    Mentor's Protocol
                </h2>
                <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl italic text-zinc-400 text-sm leading-relaxed relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Target size={60} className="text-white" />
                    </div>
                    "The most dangerous bug is the one that looks like a feature. Always verify state changes across async boundaries. In the Arena, speed is secondary to precision."
                    <div className="mt-6 not-italic font-bold text-zinc-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-zinc-800"></div>
                        The Socratic Mentor
                    </div>
                </div>
           </div>
        </div>
      </main>
    </div>
  );
}

