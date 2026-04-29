import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Book, ChevronRight, Search, Lightbulb, Code, Cpu } from 'lucide-react';

export default function Docs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-['Space_Grotesk']">
      <nav className="flex justify-between items-center px-8 h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Terminal className="text-lime-400" />
          <span className="text-xl font-bold tracking-tighter">DebugQuest</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Dashboard</button>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-800 p-8 hidden md:block">
            <div className="space-y-8">
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">Fundamentals</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="text-lime-400 font-medium cursor-pointer">Socratic Hinting</li>
                        <li className="text-zinc-500 hover:text-white cursor-pointer transition-colors">The Arena Loop</li>
                        <li className="text-zinc-500 hover:text-white cursor-pointer transition-colors">XP & Ranking</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">AI Integration</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="text-zinc-500 hover:text-white cursor-pointer transition-colors">Gemini Bug Gen</li>
                        <li className="text-zinc-500 hover:text-white cursor-pointer transition-colors">Context Injection</li>
                    </ul>
                </div>
            </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 md:p-16 max-w-4xl">
            <article className="prose prose-invert max-w-none">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400">
                        <Lightbulb size={24} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter m-0">Socratic Hinting</h1>
                </div>

                <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                    DebugQuest doesn't just give you the answer. Our Socratic Mentor, powered by Gemini, is designed to guide your logic through inquiry, helping you build deep problem-solving intuition.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Code className="text-blue-400" size={18} />
                            Logic Guidance
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Instead of pointing to a line, the AI asks about your assumptions. "What happens to the stack if this loop never terminates?"
                        </p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Cpu className="text-purple-400" size={18} />
                            Context Aware
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            The mentor sees your current code and the specific error trace, providing hints that are relevant to your exact approach.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Requesting a Hint</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    During any Arena session, you can request a hint from the Right Panel. Note that requesting a hint costs <span className="text-white font-bold">50 XP</span> from your potential reward for that challenge. 
                </p>

                <div className="p-6 bg-zinc-900/50 border border-lime-400/20 rounded-xl border-l-4 border-l-lime-400 mb-8">
                    <h4 className="text-lime-400 font-bold mb-2 flex items-center gap-2">
                        <Terminal size={14} />
                        Example Interaction
                    </h4>
                    <div className="font-mono text-xs space-y-4">
                        <div className="text-zinc-500 italic">// You are stuck on a memory leak in a C++ pointer exercise</div>
                        <div className="text-white bg-zinc-950 p-3 rounded border border-zinc-800">
                            "I see you're allocating memory for the 'buffer' on line 12. Trace the path of that buffer variable. Is there any scenario where the function returns before it reaches the 'delete' call?"
                        </div>
                    </div>
                </div>
            </article>
        </main>
      </div>
    </div>
  );
}
