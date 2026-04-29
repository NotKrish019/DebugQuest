import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';
import { Terminal, Shield, LogIn, Code, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInAnonymously(auth);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Failed to sign in anonymously.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-lime-400/10 rounded-2xl border border-lime-400/20 mb-4">
            <Terminal className="text-lime-400 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Initialize Session</h1>
          <p className="text-zinc-500 text-sm">Access the DebugQuest Arena via IBM App ID</p>
        </div>

        <div className="space-y-4">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center">{error}</div>}
          
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-zinc-950 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div> : <LogIn size={20} />}
            Continue with Google
          </button>
          
          <button 
            onClick={handleAnonymousLogin}
            disabled={loading}
            className="w-full bg-zinc-800 text-white border border-zinc-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Code size={20} />}
            Quick Start (Anonymous)
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-zinc-950 px-4 text-zinc-600">Secure Firebase Auth</span></div>
          </div>

          <p className="text-zinc-600 text-[10px] text-center leading-relaxed">
            By initializing a session, you agree to the Arena's Rules of Engagement and Data Synthesis Protocols.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          <Shield size={12} className="text-lime-400/50" />
          Protected by Firebase Security
        </div>
      </div>
    </div>
  );
}
