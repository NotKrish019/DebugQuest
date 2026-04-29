import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Code, Zap, Target, ArrowRight, Shield, Cpu, Flame, Terminal } from 'lucide-react';

const LANGUAGES = [
  { id: 'python', name: 'Python', icon: <Code className="text-yellow-400" /> },
  { id: 'javascript', name: 'JavaScript', icon: <Zap className="text-yellow-300" /> },
  { id: 'rust', name: 'Rust', icon: <Cpu className="text-orange-500" /> },
  { id: 'cpp', name: 'C++', icon: <Shield className="text-blue-500" /> }
];

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', xp: '200-500', color: 'text-emerald-400', icon: <Target size={20} /> },
  { id: 'medium', name: 'Medium', xp: '600-1200', color: 'text-yellow-400', icon: <Zap size={20} /> },
  { id: 'hard', name: 'Hard', xp: '1500-3000', color: 'text-red-400', icon: <Flame size={20} /> }
];

export default function ArenaSelection() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('python');
  const [selectedDiff, setSelectedDiff] = useState('easy');

  const handleStart = () => {
    navigate(`/arena?lang=${selectedLang}&diff=${selectedDiff}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Space_Grotesk'] selection:bg-lime-400/30 py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] font-bold text-lime-400 uppercase tracking-widest mb-6">
            <Terminal size={12} /> Mission Initialization
          </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Configure Your <span className="text-lime-400 italic">Arena</span></h1>
          <p className="text-zinc-500 text-lg">Select your specialized environment and tactical difficulty level.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Language Selection */}
          <section>
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Tactical Environment</h2>
            <div className="grid grid-cols-2 gap-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 group ${
                    selectedLang === lang.id 
                      ? 'bg-zinc-900 border-lime-400 shadow-[0_0_20px_rgba(217,244,0,0.1)]' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-zinc-800 ${selectedLang === lang.id ? 'scale-110' : ''} transition-transform`}>
                    {lang.icon}
                  </div>
                  <span className={`font-bold ${selectedLang === lang.id ? 'text-white' : 'text-zinc-500'}`}>{lang.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Difficulty Selection */}
          <section>
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Threat Level</h2>
            <div className="flex flex-col gap-4">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDiff(diff.id)}
                  className={`p-6 rounded-2xl border transition-all flex items-center justify-between group ${
                    selectedDiff === diff.id 
                      ? 'bg-zinc-900 border-lime-400 shadow-[0_0_20px_rgba(217,244,0,0.1)]' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-zinc-800 ${diff.color}`}>
                      {diff.icon}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${selectedDiff === diff.id ? 'text-white' : 'text-zinc-500'}`}>{diff.name}</div>
                      <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{diff.xp} Potential XP</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${selectedDiff === diff.id ? 'bg-lime-400' : 'bg-zinc-800'}`}></div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="group relative bg-lime-400 text-zinc-950 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white active:scale-95 transition-all shadow-[0_0_40px_rgba(217,244,0,0.2)] flex items-center gap-4"
          >
            Enter Simulation
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
