import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Terminal, LayoutGrid, Trophy, Book, Play, ArrowRight, Activity, Zap, Shield, Target, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { xp, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Space_Grotesk']">
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
          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <span className="text-xs">JD</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Welcome back, <span className="text-lime-400">Hunter</span>.</h1>
          <p className="text-zinc-500">Your current standing in the Arena is looking sharp.</p>
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
                  <div className="text-3xl font-bold italic">Off-by-One Slayer</div>
                </div>
                <div className="text-right">
                  <div className="text-lime-400 font-bold text-xl">{xp} / 2000 XP</div>
                  <div className="text-zinc-500 text-xs">Level 12</div>
                </div>
              </div>
              <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                <div 
                  className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 shadow-[0_0_20px_rgba(217,244,0,0.4)] transition-all duration-1000" 
                  style={{ width: `${(xp / 2000) * 100}%` }}
                ></div>
              </div>
              <div className="mt-6 flex gap-4">
                <button 
                  onClick={() => navigate('/arena')}
                  className="bg-lime-400 text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-all flex items-center gap-2 group/btn"
                >
                  Enter the Arena
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/leaderboard')}
                  className="bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-zinc-700 transition-all"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Activity size={14} className="text-blue-400" /> Bugs Fixed</span>
                  <span className="font-mono font-bold">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Success Rate</span>
                  <span className="font-mono font-bold">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm flex items-center gap-2"><Shield size={14} className="text-purple-400" /> Integrity Score</span>
                  <span className="font-mono font-bold">A+</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Hunter ID: #QX-9921-ALPHA</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Target className="text-lime-400" size={20} />
                    Active Missions
                </h2>
                {[1, 2].map(i => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:border-lime-400/30 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                <span className="material-symbols-outlined text-zinc-500 group-hover:text-lime-400 transition-colors">code</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Mission: {i === 1 ? "Recursive Loop Leak" : "Memory Ghost in V8"}</h4>
                                <p className="text-xs text-zinc-500">Tier {i === 1 ? "I" : "II"} • High Severity</p>
                            </div>
                        </div>
                        <ChevronRight className="text-zinc-700 group-hover:text-lime-400 transition-colors" size={20} />
                    </div>
                ))}
           </div>

           <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Book className="text-lime-400" size={20} />
                    Intelligence Feed
                </h2>
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl italic text-zinc-400 text-sm leading-relaxed relative">
                    "The most dangerous bug is the one that looks like a feature. Always verify state changes across async boundaries."
                    <div className="mt-4 not-italic font-bold text-zinc-500 text-[10px] uppercase tracking-widest">— The Socratic Mentor</div>
                </div>
           </div>
        </div>
      </main>
    </div>
  );
}
