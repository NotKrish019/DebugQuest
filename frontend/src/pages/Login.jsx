import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { Terminal, Shield, LogIn, Code, Mail } from 'lucide-react';

export default function Login() {
  const { login } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleMockLogin = (provider) => {
    setLoading(true);
    // Simulate IBM App ID OAuth redirect/callback
    setTimeout(() => {
      // Mock user data returned from provider
      const mockUser = {
        id: "ibm_" + Math.random().toString(36).substring(7),
        email: "hunter@example.com",
        name: "Code Hunter",
        provider: provider,
        isNew: true // Simulate a new user for the first time
      };
      
      login(mockUser);
      setLoading(false);
      
      if (mockUser.isNew) {
        navigate('/setup-profile');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
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
          <button 
            onClick={() => handleMockLogin('github')}
            disabled={loading}
            className="w-full bg-white text-zinc-950 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 active:scale-95 transition-all"
          >
            {loading ? <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div> : <Code size={20} />}
            Continue with GitHub
          </button>
          
          <button 
            onClick={() => handleMockLogin('google')}
            disabled={loading}
            className="w-full bg-zinc-800 text-white border border-zinc-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-700 active:scale-95 transition-all"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <LogIn size={20} />}
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-zinc-950 px-4 text-zinc-600">Secure OAuth2</span></div>
          </div>

          <button 
            onClick={() => handleMockLogin('email')}
            className="w-full text-zinc-500 text-sm hover:text-lime-400 transition-colors py-2"
          >
            Use Enterprise Email SSO
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          <Shield size={12} className="text-lime-400/50" />
          Protected by IBM Security App ID
        </div>
      </div>
    </div>
  );
}
