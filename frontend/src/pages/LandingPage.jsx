import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Terminal, Zap, Shield, Trophy, Cpu, ArrowRight, Play, CheckCircle, Code } from 'lucide-react';

const FEATURE_CARDS = [
  {
    title: "Infinite Challenge Pool",
    description: "Powered by Gemini, every session generates a unique buggy program. You’ll never see the same bug twice.",
    icon: <Cpu className="text-lime-400" />
  },
  {
    title: "Socratic Mentorship",
    description: "Stuck? Get AI-driven hints that guide your logic instead of just giving you the answer.",
    icon: <Zap className="text-blue-400" />
  },
  {
    title: "Gamified Progression",
    description: "Earn XP, climb the global leaderboard, and unlock titles like 'Off-by-One Slayer' and 'Pointer Whisperer.'",
    icon: <Trophy className="text-orange-400" />
  },
  {
    title: "Live Competitive Ranking",
    description: "Battle against the clock and other hunters in real-time to see who has the sharpest eye.",
    icon: <Shield className="text-purple-400" />
  }
];

export default function LandingPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-950 text-white font-['Space_Grotesk'] antialiased min-h-screen flex flex-col selection:bg-lime-400/30 selection:text-white">
      {/* TopNavBar */}
      <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex justify-between items-center w-full px-8 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Terminal className="text-lime-400" />
          <span className="text-xl font-bold tracking-tighter">DebugQuest</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => navigate('/dashboard')} className="text-zinc-400 hover:text-white transition-colors">Dashboard</button>
          <button onClick={() => navigate('/projects')} className="text-zinc-400 hover:text-white transition-colors">Projects</button>
          <button onClick={() => navigate('/docs')} className="text-zinc-400 hover:text-white transition-colors">Documentation</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/arena-selection')}
            className="bg-lime-400 text-zinc-950 px-5 py-2 rounded-lg font-bold text-sm hover:bg-white active:scale-95 transition-all shadow-[0_0_15px_rgba(217,244,0,0.3)]"
          >
            Enter the Arena
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-8 flex flex-col items-center text-center">
          {/* Background effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full code-grid-bg opacity-10 -z-20"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur text-[10px] font-bold text-lime-400 uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            Gemini v3.1 Integration Active
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl leading-[0.9]">
            Master the Art of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">Fix.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
            DebugQuest uses Gemini to generate unique, real-world buggy code on-the-fly. <span className="text-zinc-200">No static banks. No memorization.</span> Just pure problem-solving.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => navigate('/arena-selection')}
              className="bg-lime-400 text-zinc-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(217,244,0,0.4)]"
            >
              Enter the Arena
              <ArrowRight size={20} />
            </button>
            <button 
              className="bg-zinc-900 text-white border border-zinc-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 active:scale-95 transition-all flex items-center gap-3"
            >
              <Play size={20} fill="currentColor" />
              Watch the Hook
            </button>
          </div>

          {/* Editor Mock Preview */}
          <div className="mt-24 w-full max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 shadow-2xl relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-900/50">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                        <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Arena Module: Recursive_Leak.rs</div>
                    <div className="w-12"></div>
                </div>
                <div className="p-8 font-mono text-sm text-left flex gap-6">
                    <div className="text-zinc-700 select-none">
                        01<br/>02<br/>03<br/>04<br/>05<br/>06
                    </div>
                    <div className="text-zinc-400">
                        <span className="text-purple-400">pub async fn</span> <span className="text-blue-400">execute_loop</span>(ctx: &Context) {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-zinc-600 italic">// Gemini injected bug here</span><br/>
                        &nbsp;&nbsp;<span className="text-purple-400">loop</span> {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">let</span> _data = ctx.fetch_raw_buffer().<span className="text-blue-400">await</span>;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-red-500/20 text-red-400 border-b border-red-500/50 px-1">if ctx.is_active() == true {'{'} continue; {'}'}</span><br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </div>
                <div className="absolute bottom-6 right-6 p-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center gap-3 animate-bounce">
                    <CheckCircle className="text-lime-400" size={18} />
                    <span className="text-xs font-bold text-white tracking-tight uppercase">Fix Detected!</span>
                </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">The 4 Pillars of Mastery</h2>
            <p className="text-zinc-500">Everything you need to go from Script Kiddie to Off-by-One Slayer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_CARDS.map((feature, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-lime-400/30 transition-all group relative overflow-hidden">
                <div className="mb-6 p-3 bg-zinc-800 rounded-xl border border-zinc-700 w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-zinc-800 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-8">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-lime-400 to-emerald-500 rounded-[2.5rem] p-12 md:p-20 text-zinc-950 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full code-grid-bg opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic uppercase">The matrix is broken. Fix it.</h2>
                    <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 max-w-2xl mx-auto">
                        Join 10,000+ developers sharpening their skills in the ultimate AI-powered arena.
                    </p>
                    <button 
                      onClick={() => navigate('/arena-selection')}
                      className="bg-zinc-950 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-zinc-950 active:scale-95 transition-all shadow-2xl"
                    >
                        Enter the Arena Now
                    </button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-zinc-900 text-center text-zinc-600 text-xs font-mono uppercase tracking-[0.2em]">
        <div className="flex justify-center gap-12 mb-8">
            <a href="#" className="hover:text-lime-400 transition-colors">Terminals</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Latency</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Integrity</a>
            <a href="#" className="hover:text-lime-400 transition-colors">About</a>
        </div>
        <p>© 2024 DebugQuest // Authorized Access Only</p>
      </footer>
    </div>
  );
}
