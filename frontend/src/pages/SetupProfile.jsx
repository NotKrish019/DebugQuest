import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../App';
import { User, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function SetupProfile() {
  const { user, login } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [handle, setHandle] = useState('');
  const [status, setStatus] = useState('idle'); // idle, checking, available, taken, error
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (handle.length < 3) {
      setStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setStatus('checking');
      try {
        const res = await axios.post('/api/user/check-username', { username: handle });
        setStatus(res.data.available ? 'available' : 'taken');
      } catch (err) {
        setStatus('error');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [handle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'available') return;

    setLoading(true);
    // Simulate updating profile in Cloudant
    setTimeout(() => {
      const updatedUser = {
        ...user,
        username: handle,
        total_xp: 1240,
        level: 12,
        rank_title: "Off-by-One Slayer",
        isNew: false
      };
      login(updatedUser);
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const getUsernameStyle = (level) => {
    if (level <= 10) return "text-white";
    if (level <= 20) return "text-lime-400 drop-shadow-[0_0_8px_rgba(217,244,0,0.6)]";
    return "text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 animate-gradient-x";
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-zinc-700">
            <User size={40} className="text-zinc-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Claim Your Handle</h1>
          <p className="text-zinc-500 text-sm">Choose a unique identity for the global arena</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 block ml-1">Username</label>
            <input 
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="e.g. byte_knight"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 transition-all font-mono"
              maxLength={20}
            />
            
            <div className="absolute right-4 top-[38px]">
              {status === 'checking' && <div className="w-5 h-5 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>}
              {status === 'available' && <Check className="text-lime-400 w-5 h-5" />}
              {status === 'taken' && <AlertCircle className="text-red-500 w-5 h-5" />}
            </div>
          </div>

          {status === 'taken' && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle size={12} /> This handle is already claimed by another Hunter.</p>}
          {status === 'available' && <p className="text-lime-400 text-xs mt-1 ml-1 flex items-center gap-1"><Check size={12} /> Handle is available. Identity verified.</p>}

          <div className="bg-zinc-950/50 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Identity Preview</h3>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center font-bold text-lg">
                {handle ? handle.substring(0, 1).toUpperCase() : "?"}
               </div>
               <div>
                  <div className={`text-xl font-bold font-mono ${getUsernameStyle(12)}`}>
                    {handle || "hunter_name"}
                  </div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={10} />
                    Level 12 • Off-by-One Slayer
                  </div>
               </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={status !== 'available' || loading}
            className="w-full bg-lime-400 text-zinc-950 py-4 rounded-xl font-bold hover:bg-white active:scale-95 transition-all shadow-[0_0_20px_rgba(217,244,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Sync Identity & Start"}
          </button>
        </form>
      </div>
    </div>
  );
}
