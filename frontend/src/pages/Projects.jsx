import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, FolderOpen, Plus, Search, Filter, Box, Code } from 'lucide-react';

const MOCK_PROJECTS = [
    { name: "AuthMicroservice_v2", lang: "Go", bugs: 3, severity: "High" },
    { name: "LegacyDataPipeline", lang: "Python", bugs: 12, severity: "Critical" },
    { name: "ReactFrontend_Global", lang: "TypeScript", bugs: 1, severity: "Low" },
    { name: "RedisCacheWrapper", lang: "Rust", bugs: 0, severity: "None" },
];

export default function Projects() {
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

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tighter mb-2">Projects</h1>
                <p className="text-zinc-500">Manage and debug your active codebases.</p>
            </div>
            <button className="bg-lime-400 text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-all flex items-center gap-2">
                <Plus size={18} />
                New Project
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-lime-400/50 transition-colors"
                />
            </div>
            <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <Filter size={18} />
                Filters
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROJECTS.map((project, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-lime-400/30 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-zinc-800 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 group-hover:border-lime-400/50 transition-colors">
                            <Box className="text-zinc-500 group-hover:text-lime-400 transition-colors" size={24} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                            project.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                            project.severity === 'High' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                            'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}>
                            {project.severity}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                        <span className="flex items-center gap-1"><Code size={12} /> {project.lang}</span>
                        <span>•</span>
                        <span className={project.bugs > 0 ? "text-red-400" : "text-lime-400"}>{project.bugs} Bugs Pending</span>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(j => (
                                <div key={j} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-bold">
                                    H{j}
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => navigate('/arena')}
                            className="text-zinc-500 group-hover:text-lime-400 transition-colors"
                        >
                            <Terminal size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
