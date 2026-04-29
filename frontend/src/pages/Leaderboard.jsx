import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Trophy, Medal, ChevronRight } from 'lucide-react';

const MOCK_LEADERS = [
  { rank: 1, name: "null_pointer", title: "Pointer Whisperer", xp: 18940, status: "online" },
  { rank: 2, name: "async_ghost", title: "Race Condition Master", xp: 17420, status: "online" },
  { rank: 3, name: "byte_knight", title: "Memory Guard", xp: 16800, status: "offline" },
  { rank: 4, name: "loop_hunter", title: "Recursive Sage", xp: 15900, status: "online" },
  { rank: 5, name: "stack_overflow", title: "Off-by-One Slayer", xp: 14200, status: "online" },
  { rank: 6, name: "binary_bard", title: "Hex Wizard", xp: 13800, status: "offline" },
  { rank: 7, name: "trace_master", title: "Latency Legend", xp: 12500, status: "online" },
];

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Space_Grotesk']">
      <nav className="flex justify-between items-center px-8 h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Terminal className="text-lime-400" />
          <span className="text-xl font-bold tracking-tighter">DebugQuest</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Back to Dashboard</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/5 text-lime-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Trophy size={14} />
                Global Rankings
            </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-4">The Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">Masters</span></h1>
          <p className="text-zinc-500 max-w-xl mx-auto">Only the sharpest eyes and fastest fingers make it to the top. Are you ready to climb?</p>
        </header>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/80">
                        <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-20">Rank</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hunter</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hidden md:table-cell">Title</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">XP Total</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_LEADERS.map((leader, i) => (
                        <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                            <td className="px-6 py-6 font-mono text-xl font-bold italic">
                                {leader.rank <= 3 ? (
                                    <Medal className={leader.rank === 1 ? "text-yellow-400" : leader.rank === 2 ? "text-zinc-400" : "text-orange-500"} />
                                ) : (
                                    <span className="text-zinc-700">#0{leader.rank}</span>
                                )}
                            </td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs">
                                            {leader.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${leader.status === 'online' ? 'bg-lime-400' : 'bg-zinc-600'}`}></div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white group-hover:text-lime-400 transition-colors">{leader.name}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-tight md:hidden">{leader.title}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6 hidden md:table-cell">
                                <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-bold text-zinc-400 uppercase border border-zinc-700">
                                    {leader.title}
                                </span>
                            </td>
                            <td className="px-6 py-6 text-right font-mono font-bold text-lime-400">
                                {leader.xp.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-lime-400/10 to-transparent border border-lime-400/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(217,244,0,0.4)]">
                    #42
                </div>
                <div>
                    <h4 className="text-xl font-bold">You are currently ranked #42</h4>
                    <p className="text-zinc-500 text-sm">Win 3 more arenas to break into the Top 40.</p>
                </div>
            </div>
            <button 
                onClick={() => navigate('/arena')}
                className="bg-lime-400 text-zinc-950 px-8 py-3 rounded-lg font-bold hover:bg-white transition-all flex items-center gap-2"
            >
                Fight Now
                <ChevronRight size={18} />
            </button>
        </div>
      </main>
    </div>
  );
}
