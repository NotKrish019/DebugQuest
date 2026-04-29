import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

export default function Challenge() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const onToggleTheme = () => {
        toggleTheme();
    };

    if (theme === 'dark') {
        return (
            <div className="bg-zinc-950 text-zinc-300 font-body-md h-screen overflow-hidden flex flex-col selection:bg-lime-400/30 selection:text-white">
                {/* TopNavBar */}
<nav className="flex justify-between items-center w-full px-6 h-14 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 font-['Space_Grotesk'] font-medium antialiased">
<div className="flex items-center gap-6">
<div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
<span className="material-symbols-outlined text-lime-400">terminal</span>
                DebugMaster
            </div>
<div className="hidden md:flex items-center gap-6 ml-4">
<a className="text-white border-b-2 border-lime-400 pb-1" href="#">Dashboard</a>
<a className="text-zinc-400 hover:text-lime-500 transition-colors duration-200" href="#">Projects</a>
<a className="text-zinc-400 hover:text-lime-500 transition-colors duration-200" href="#">Documentation</a>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden sm:block mr-4">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
<input className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all w-64 placeholder-zinc-600 font-body-md" placeholder="Search commands..." type="text"/>
</div>
<button className="text-zinc-400 hover:text-lime-400 transition-colors scale-95 active:transition-transform">
<span className="material-symbols-outlined">light_mode</span>
</button>
<button className="text-zinc-400 hover:text-lime-400 transition-colors scale-95 active:transition-transform">
<span className="material-symbols-outlined">settings</span>
</button>
<button className="text-zinc-400 hover:text-lime-400 transition-colors scale-95 active:transition-transform">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="ml-2 bg-lime-400 text-zinc-950 px-4 py-1.5 rounded-md font-bold text-sm hover:bg-lime-500 transition-colors scale-95 active:transition-transform font-['Space_Grotesk']">
                Deploy
            </button>
</div>
</nav>
{/* Main Workspace Area */}
<div className="flex flex-1 overflow-hidden relative">
{/* SideNavBar */}
<aside className="fixed left-0 top-14 bottom-6 flex flex-col items-center py-4 z-40 bg-zinc-950 border-r border-zinc-800 w-16 font-['Space_Grotesk'] text-xs uppercase tracking-widest transition-all duration-150 ease-in-out">
<div className="flex flex-col gap-2 w-full mt-2">
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group relative" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">folder_open</span>
</a>
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group relative" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">search</span>
</a>
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group relative" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">schema</span>
</a>
<a className="w-full flex justify-center py-3 bg-zinc-800 border-l-2 border-lime-400 text-white group relative" href="#">
<span className="material-symbols-outlined text-lime-400">bug_report</span>
</a>
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group relative" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">extension</span>
</a>
</div>
<div className="mt-auto flex flex-col gap-2 w-full mb-2">
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">account_circle</span>
</a>
<a className="w-full flex justify-center py-3 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
</a>
</div>
</aside>
{/* Content Canvas */}
<main className="flex-1 ml-16 flex h-full bg-zinc-950 overflow-hidden">
{/* Left Panel: Run & Debug */}
<div className="w-72 border-r border-zinc-800 bg-zinc-900/50 flex flex-col h-full flex-shrink-0">
<div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80">
<div>
<h2 className="font-headline-md text-sm text-zinc-200">RUN &amp; DEBUG</h2>
<div className="text-[10px] text-zinc-500 font-mono mt-1">session_id: ax_772b</div>
</div>
<button className="text-zinc-400 hover:text-lime-400">
<span className="material-symbols-outlined text-sm">more_horiz</span>
</button>
</div>
<div className="p-4 flex-1 overflow-y-auto">
{/* Config Selector */}
<div className="mb-6">
<label className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-2 block">Configuration</label>
<div className="flex items-center gap-2">
<select className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded px-2 py-1.5 focus:border-lime-400 focus:ring-0 outline-none">
<option>Node.js: API Server</option>
<option>Python: Data Pipeline</option>
<option>Go: Microservice</option>
</select>
<button className="bg-lime-400/10 text-lime-400 hover:bg-lime-400 hover:text-zinc-950 p-1.5 rounded border border-lime-400/30 transition-colors">
<span className="material-symbols-outlined text-sm filled">play_arrow</span>
</button>
</div>
</div>
{/* Variables Tree */}
<div className="mb-6">
<label className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-2 flex justify-between items-center cursor-pointer hover:text-zinc-300">
                            VARIABLES
                            <span className="material-symbols-outlined text-sm">expand_more</span>
</label>
<div className="pl-2 border-l border-zinc-800 space-y-1">
<div className="flex items-center gap-1 text-sm font-mono text-zinc-300">
<span className="material-symbols-outlined text-[14px] text-zinc-500">expand_more</span>
<span className="text-blue-400">Local</span>
</div>
<div className="pl-5 space-y-1 text-xs font-mono">
<div className="flex items-center gap-2 hover:bg-zinc-800 px-1 rounded cursor-pointer">
<span className="text-purple-400">req</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">Object</span>
</div>
<div className="flex items-center gap-2 hover:bg-zinc-800 px-1 rounded cursor-pointer">
<span className="text-purple-400">res</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">Object</span>
</div>
<div className="flex items-center gap-2 hover:bg-zinc-800 px-1 rounded cursor-pointer">
<span className="text-purple-400">userId</span><span className="text-zinc-500">:</span> <span className="text-orange-400">"usr_9981a"</span>
</div>
<div className="flex items-center gap-2 bg-lime-400/10 px-1 rounded border border-lime-400/20">
<span className="text-purple-400 font-bold">isValid</span><span className="text-zinc-500">:</span> <span className="text-red-400 font-bold">false</span>
<span className="material-symbols-outlined text-[12px] text-lime-400 ml-auto">edit</span>
</div>
</div>
<div className="flex items-center gap-1 text-sm font-mono text-zinc-300 mt-2">
<span className="material-symbols-outlined text-[14px] text-zinc-500">chevron_right</span>
<span className="text-blue-400">Closure</span>
</div>
<div className="flex items-center gap-1 text-sm font-mono text-zinc-300">
<span className="material-symbols-outlined text-[14px] text-zinc-500">chevron_right</span>
<span className="text-blue-400">Global</span>
</div>
</div>
</div>
{/* Call Stack */}
<div className="mb-6">
<label className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-2 flex justify-between items-center cursor-pointer hover:text-zinc-300">
                            CALL STACK
                            <span className="material-symbols-outlined text-sm">expand_more</span>
</label>
<div className="pl-2 border-l border-zinc-800 space-y-1 text-xs font-mono">
<div className="flex items-center justify-between hover:bg-zinc-800 px-1 py-0.5 rounded cursor-pointer text-zinc-400">
<span className="truncate">validateUserAuth</span>
<span className="text-zinc-600 text-[10px]">auth.js:42</span>
</div>
<div className="flex items-center justify-between bg-zinc-800 text-lime-400 px-1 py-0.5 rounded cursor-pointer border-l-2 border-lime-400">
<span className="truncate font-bold">processRequest</span>
<span className="text-zinc-500 text-[10px]">handler.js:118</span>
</div>
<div className="flex items-center justify-between hover:bg-zinc-800 px-1 py-0.5 rounded cursor-pointer text-zinc-400">
<span className="truncate">app.post</span>
<span className="text-zinc-600 text-[10px]">routes.js:24</span>
</div>
</div>
</div>
{/* Breakpoints */}
<div>
<label className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-2 flex justify-between items-center cursor-pointer hover:text-zinc-300">
                            BREAKPOINTS
                            <div className="flex gap-1">
<span className="material-symbols-outlined text-[14px]">add</span>
<span className="material-symbols-outlined text-[14px]">expand_more</span>
</div>
</label>
<div className="space-y-1 text-xs font-mono">
<div className="flex items-center gap-2 hover:bg-zinc-800 px-1 py-1 rounded cursor-pointer text-zinc-300">
<div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-900"></div>
<span className="truncate">handler.js</span>
<span className="text-zinc-500 ml-auto">118</span>
</div>
<div className="flex items-center gap-2 hover:bg-zinc-800 px-1 py-1 rounded cursor-pointer text-zinc-300 opacity-50">
<div className="w-2.5 h-2.5 rounded-full border border-zinc-500"></div>
<span className="truncate">database.js</span>
<span className="text-zinc-500 ml-auto">45</span>
</div>
</div>
</div>
</div>
</div>
{/* Main Editor Area */}
<div className="flex-1 flex flex-col h-full bg-zinc-950 relative">
{/* Editor Tabs */}
<div className="flex border-b border-zinc-800 bg-zinc-900/80 overflow-x-auto no-scrollbar">
<div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border-t-2 border-lime-400 text-zinc-200 text-sm font-mono cursor-pointer min-w-max border-r border-zinc-800">
<span className="material-symbols-outlined text-sm text-yellow-500">javascript</span>
                        handler.js
                        <button className="ml-2 text-zinc-500 hover:text-zinc-300"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
<div className="flex items-center gap-2 px-4 py-2 text-zinc-500 text-sm font-mono cursor-pointer hover:bg-zinc-900 min-w-max border-r border-zinc-800">
<span className="material-symbols-outlined text-sm text-blue-400">data_object</span>
                        config.json
                        <button className="ml-2 text-zinc-600 hover:text-zinc-400"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
<div className="flex items-center gap-2 px-4 py-2 text-zinc-500 text-sm font-mono cursor-pointer hover:bg-zinc-900 min-w-max border-r border-zinc-800">
<span className="material-symbols-outlined text-sm text-yellow-500">javascript</span>
                        auth.js
                        <button className="ml-2 text-zinc-600 hover:text-zinc-400"><span className="material-symbols-outlined text-[14px]">close</span></button>
</div>
</div>
{/* Floating Toolbar */}
<div className="absolute top-12 right-6 z-10 flex bg-zinc-800/90 backdrop-blur border border-zinc-700 rounded-md shadow-lg overflow-hidden">
<button className="p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white" title="Continue (F5)"><span className="material-symbols-outlined text-sm">play_arrow</span></button>
<button className="p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white border-l border-zinc-700" title="Step Over (F10)"><span className="material-symbols-outlined text-sm">redo</span></button>
<button className="p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white border-l border-zinc-700" title="Step Into (F11)"><span className="material-symbols-outlined text-sm">download</span></button>
<button className="p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white border-l border-zinc-700" title="Step Out (Shift+F11)"><span className="material-symbols-outlined text-sm">upload</span></button>
<button className="p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-white border-l border-zinc-700" title="Restart (Ctrl+Shift+F5)"><span className="material-symbols-outlined text-sm">refresh</span></button>
<button className="p-1.5 text-red-400 hover:bg-red-500/20 hover:text-red-300 border-l border-zinc-700" title="Stop (Shift+F5)"><span className="material-symbols-outlined text-sm">stop</span></button>
</div>
{/* Code Editor */}
<div className="flex-1 overflow-auto font-mono text-[13px] leading-relaxed bg-[#111113]">
<div className="flex">
{/* Line Numbers */}
<div className="w-12 flex-shrink-0 text-right pr-3 py-4 text-zinc-600 select-none bg-[#18181b] border-r border-zinc-800 space-y-1">
<div>110</div>
<div>111</div>
<div>112</div>
<div>113</div>
<div>114</div>
<div>115</div>
<div>116</div>
<div>117</div>
<div className="text-zinc-300 font-bold bg-zinc-800 rounded -ml-2 pr-3">118</div>
<div>119</div>
<div>120</div>
<div>121</div>
<div>122</div>
<div>123</div>
<div>124</div>
<div>125</div>
<div>126</div>
</div>
{/* Code Content */}
<div className="flex-1 py-4 pl-4 pr-8 relative whitespace-pre space-y-1 text-zinc-300">
<div><span className="text-purple-400">async function</span> <span className="text-blue-300">processRequest</span>(req, res) {'{'}</div>
<div> <span className="text-purple-400">try</span> {'{'}</div>
<div> <span className="text-purple-400">const</span> userId <span className="text-zinc-400">=</span> req.<span className="text-blue-200">body</span>.<span className="text-blue-200">userId</span>;</div>
<div> <span className="text-green-600 italic">// Validate incoming token against redis cache</span></div>
<div> <span className="text-purple-400">const</span> isValid <span className="text-zinc-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-300">validateUserAuth</span>(userId, req.<span className="text-blue-200">headers</span>.<span className="text-blue-200">authorization</span>);</div>
<div> </div>
<div> <span className="text-purple-400">if</span> (<span className="text-zinc-400">!</span>isValid) {'{'}</div>
<div className="absolute left-0 w-full h-[22px] bg-lime-400/10 border-y border-lime-400/30 flex items-center -z-10 mt-[-2px]"></div>
<div className="text-zinc-100"><span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 z-10 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> <span className="text-green-600 italic">// Execution paused here</span></div>
<div className="text-zinc-100 font-medium"> <span className="text-purple-400">return</span> res.<span className="text-blue-300">status</span>(<span className="text-orange-300">401</span>).<span className="text-blue-300">json</span>({'{'} <span className="text-blue-200">error</span><span className="text-zinc-400">:</span> <span className="text-orange-400">'Unauthorized access attempt'</span> {'}'});</div>
<div>    {'}'}</div>
<div> </div>
<div> <span className="text-purple-400">const</span> data <span className="text-zinc-400">=</span> <span className="text-purple-400">await</span> Database.<span className="text-blue-300">query</span>(</div>
<div> <span className="text-orange-400">'SELECT * FROM user_metrics WHERE id = ?'</span>, </div>
<div>      [userId]</div>
<div>    );</div>
<div> </div>
<div> <span className="text-purple-400">return</span> res.<span className="text-blue-300">json</span>({'{'} <span className="text-blue-200">success</span><span className="text-zinc-400">:</span> <span className="text-orange-300">true</span>, <span className="text-blue-200">data</span> {'}'});</div>
</div>
</div>
</div>
{/* Integrated Terminal / Console */}
<div className="h-64 border-t border-zinc-800 bg-[#0c0c0d] flex flex-col flex-shrink-0">
<div className="flex border-b border-zinc-800 px-2 bg-zinc-900/50">
<button className="px-4 py-2 text-xs font-label-sm uppercase tracking-widest text-zinc-500 hover:text-zinc-300">PROBLEMS</button>
<button className="px-4 py-2 text-xs font-label-sm uppercase tracking-widest text-zinc-500 hover:text-zinc-300">OUTPUT</button>
<button className="px-4 py-2 text-xs font-label-sm uppercase tracking-widest text-lime-400 border-b-2 border-lime-400">DEBUG CONSOLE</button>
<button className="px-4 py-2 text-xs font-label-sm uppercase tracking-widest text-zinc-500 hover:text-zinc-300">TERMINAL</button>
<div className="ml-auto flex items-center gap-2 pr-2">
<span className="material-symbols-outlined text-[16px] text-zinc-500 hover:text-zinc-300 cursor-pointer">delete</span>
<span className="material-symbols-outlined text-[16px] text-zinc-500 hover:text-zinc-300 cursor-pointer">expand_less</span>
<span className="material-symbols-outlined text-[16px] text-zinc-500 hover:text-zinc-300 cursor-pointer">close</span>
</div>
</div>
<div className="flex-1 p-3 font-mono text-[12px] text-zinc-400 overflow-y-auto space-y-1">
<div><span className="text-zinc-600">[Info]</span> Debugger attached to Node.js v18.16.0</div>
<div><span className="text-blue-400">[Log]</span> Server listening on port 3000</div>
<div><span className="text-blue-400">[Log]</span> Database connection established</div>
<div><span className="text-zinc-600">[Info]</span> Incoming request: POST /api/v1/metrics</div>
<div className="flex items-start gap-2 text-red-400 bg-red-950/30 p-1 border-l-2 border-red-500 rounded-r">
<span className="material-symbols-outlined text-[14px] mt-0.5">error</span>
<div>
<span className="font-bold">AuthWarning</span>: Token validation failed for user usr_9981a
                                <div className="text-zinc-500 mt-1 pl-4">at validateUserAuth (auth.js:42:15)</div>
<div className="text-zinc-500 pl-4">at processRequest (handler.js:114:21)</div>
</div>
</div>
<div className="flex items-center gap-2 mt-4 text-zinc-300">
<span className="text-blue-400 font-bold">&gt;</span>
<input className="bg-transparent border-none outline-none flex-1 font-mono text-[12px] focus:ring-0 p-0" placeholder="Evaluate expression..." type="text"/>
</div>
</div>
</div>
</div>
{/* Right Panel: AI Assistant (Bento/Glassmorphism) */}
<div className="w-80 border-l border-zinc-800 bg-zinc-950 flex flex-col h-full flex-shrink-0 relative">
{/* Subtle background gradient for AI feel */}
<div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-lime-400/5 to-transparent pointer-events-none"></div>
<div className="p-4 border-b border-zinc-800 flex justify-between items-center z-10 backdrop-blur-sm bg-zinc-950/80">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-lime-400 text-lg">smart_toy</span>
<h2 className="font-headline-md text-sm text-zinc-200">AI ASSISTANT</h2>
</div>
</div>
<div className="p-4 flex-1 overflow-y-auto z-10 space-y-4">
{/* Context Card */}
<div className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/50 hover:border-lime-400/50 transition-colors">
<div className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-2">Current Context</div>
<div className="text-xs text-zinc-300 font-mono bg-zinc-950 p-2 rounded border border-zinc-800">
                            Stopped at breakpoint in <span className="text-yellow-400">handler.js:118</span>
</div>
</div>
{/* AI Suggestion Bento Box */}
<div className="border border-lime-400/20 rounded-lg p-4 bg-gradient-to-br from-lime-400/5 to-zinc-900 shadow-[inset_0_1px_0_rgba(217,244,0,0.1)] relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-16 h-16 bg-lime-400/10 blur-xl rounded-full group-hover:bg-lime-400/20 transition-all"></div>
<div className="flex items-start gap-3 mb-3">
<div className="bg-lime-400/10 p-1.5 rounded text-lime-400 border border-lime-400/20">
<span className="material-symbols-outlined text-sm">lightbulb</span>
</div>
<div>
<h3 className="text-sm font-medium text-zinc-200">Analysis Found Issue</h3>
<p className="text-xs text-zinc-400 mt-1">The variable <code className="text-lime-300 font-mono">isValid</code> is evaluating to false because the Redis cache token has expired.</p>
</div>
</div>
<div className="bg-zinc-950 border border-zinc-800 rounded p-2 text-[11px] font-mono text-zinc-300 mb-3 overflow-x-auto">
<div className="text-red-400 line-through opacity-70">- const isValid = await validateUserAuth(userId, token);</div>
<div className="text-green-400">+ const isValid = await validateUserAuth(userId, token, {'{'} refresh: true {'}'});</div>
</div>
<div className="flex gap-2">
<button className="flex-1 bg-lime-400 text-zinc-950 py-1.5 px-3 rounded text-xs font-bold hover:bg-lime-500 transition-colors">Apply Fix</button>
<button className="bg-zinc-800 text-zinc-300 py-1.5 px-3 rounded text-xs border border-zinc-700 hover:bg-zinc-700 transition-colors">Explain</button>
</div>
</div>
{/* Related Issues Glass Card */}
<div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30 backdrop-blur-md">
<div className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest mb-3">Similar Past Issues</div>
<div className="space-y-3">
<div className="flex gap-3 items-start cursor-pointer group">
<span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover:text-lime-400 mt-0.5">check_circle</span>
<div>
<div className="text-xs text-zinc-300 group-hover:text-white">Token refresh race condition</div>
<div className="text-[10px] text-zinc-500 font-mono mt-0.5">Resolved 2 days ago • PR #842</div>
</div>
</div>
<div className="flex gap-3 items-start cursor-pointer group">
<span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover:text-lime-400 mt-0.5">check_circle</span>
<div>
<div className="text-xs text-zinc-300 group-hover:text-white">Redis connection timeout on auth</div>
<div className="text-[10px] text-zinc-500 font-mono mt-0.5">Resolved last week • PR #815</div>
</div>
</div>
</div>
</div>
</div>
{/* Chat Input Area */}
<div className="p-3 border-t border-zinc-800 bg-zinc-950 z-10">
<div className="relative">
<textarea className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-3 pr-10 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/30 resize-none font-body-md" placeholder="Ask AI about this error..." rows="2"></textarea>
<button className="absolute right-2 bottom-2 bg-lime-400/10 text-lime-400 p-1.5 rounded hover:bg-lime-400 hover:text-zinc-950 transition-colors">
<span className="material-symbols-outlined text-sm">send</span>
</button>
</div>
</div>
</div>
</main>
</div>
{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full h-6 px-4 flex justify-between items-center z-50 bg-zinc-950 border-t border-zinc-800 font-['Space_Grotesk'] text-[10px] font-mono tracking-tight">
<div className="text-zinc-500">
            © 2024 DebugMaster AI • System: Latency 24ms
        </div>
<div className="flex items-center gap-4">
<a className="text-lime-400 font-bold cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">v1.2.0</a>
<a className="text-zinc-500 hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Logs</a>
<a className="text-zinc-500 hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Console</a>
<a className="text-zinc-500 hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Support</a>
<div className="flex items-center gap-1 text-zinc-500 ml-2 border-l border-zinc-800 pl-4">
<span className="w-2 h-2 rounded-full bg-lime-400"></span>
                Connected
            </div>
</div>
</footer>
            </div>
        );
    }

    return (
        <div className="bg-background text-on-background font-body-md text-body-md h-screen w-screen overflow-hidden flex flex-col">
            {/* TopNavBar */}
<header className="flex justify-between items-center w-full px-6 h-14 sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
<div className="flex items-center gap-6">
<div className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white font-['Space_Grotesk']">
                DebugMaster
            </div>
<nav className="hidden md:flex gap-6 items-center font-['Space_Grotesk'] font-medium antialiased">
<a className="text-zinc-500 dark:text-zinc-400 hover:text-lime-500 transition-colors duration-200 scale-95 active:transition-transform" href="#">Dashboard</a>
<a className="text-zinc-900 dark:text-white border-b-2 border-lime-400 pb-1 hover:text-lime-500 transition-colors duration-200 scale-95 active:transition-transform" href="#">Projects</a>
<a className="text-zinc-500 dark:text-zinc-400 hover:text-lime-500 transition-colors duration-200 scale-95 active:transition-transform" href="#">Documentation</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="text-zinc-500 dark:text-zinc-400 hover:text-lime-500 transition-colors duration-200 flex items-center justify-center w-8 h-8 rounded-full">
<span className="material-symbols-outlined" style={{fontSize: '20px'}}>dark_mode</span>
</button>
<button className="text-zinc-500 dark:text-zinc-400 hover:text-lime-500 transition-colors duration-200 flex items-center justify-center w-8 h-8 rounded-full">
<span className="material-symbols-outlined" style={{fontSize: '20px'}}>settings</span>
</button>
<button className="text-zinc-500 dark:text-zinc-400 hover:text-lime-500 transition-colors duration-200 flex items-center justify-center w-8 h-8 rounded-full">
<span className="material-symbols-outlined" style={{fontSize: '20px'}}>notifications</span>
</button>
<button className="font-['Space_Grotesk'] font-medium antialiased bg-lime-400 text-zinc-900 px-4 py-1.5 rounded text-sm hover:bg-lime-500 transition-colors duration-200 scale-95 active:transition-transform">
                Deploy
            </button>
</div>
</header>
<div className="flex flex-1 overflow-hidden">
{/* SideNavBar */}
<aside className="fixed left-0 top-14 bottom-0 flex flex-col items-center py-4 z-40 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 h-full w-16">
<div className="flex-1 flex flex-col items-center gap-6 w-full pt-2">
<button className="w-full flex justify-center py-3 bg-zinc-200 dark:bg-zinc-800 border-l-2 border-lime-400 text-zinc-900 dark:text-white transition-all duration-150 ease-in-out" title="Explorer">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>folder_open</span>
</button>
<button className="w-full flex justify-center py-3 text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 ease-in-out" title="Search">
<span className="material-symbols-outlined">search</span>
</button>
<button className="w-full flex justify-center py-3 text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 ease-in-out" title="Source Control">
<span className="material-symbols-outlined">schema</span>
</button>
<button className="w-full flex justify-center py-3 text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 ease-in-out" title="Run &amp; Debug">
<span className="material-symbols-outlined">bug_report</span>
</button>
<button className="w-full flex justify-center py-3 text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 ease-in-out" title="Extensions">
<span className="material-symbols-outlined">extension</span>
</button>
</div>
<div className="flex flex-col items-center gap-4 w-full pb-10">
<button className="w-full flex justify-center py-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 transition-all duration-150 ease-in-out" title="Profile">
<span className="material-symbols-outlined">account_circle</span>
</button>
<button className="w-full flex justify-center py-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 transition-all duration-150 ease-in-out" title="Settings">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</aside>
{/* Main Workspace Area */}
<main className="flex-1 ml-16 mb-6 flex bg-surface-container-lowest">
{/* Explorer Panel (Secondary Nav) */}
<section className="w-64 border-r border-surface-container-highest bg-surface-bright flex flex-col shrink-0">
<div className="px-4 py-3 flex items-center justify-between border-b border-surface-container-highest">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Explorer</span>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer text-sm">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto py-2">
<div className="px-2">
<div className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-on-surface hover:bg-surface-container rounded-sm group transition-colors">
<span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-on-surface">keyboard_arrow_down</span>
<span className="material-symbols-outlined text-base text-outline">folder</span>
<span className="font-body-md text-sm">src</span>
</div>
<div className="pl-6 pr-2">
<div className="flex items-center gap-2 px-2 py-1 cursor-pointer bg-surface-container-low text-primary border-l-2 border-primary-container rounded-r-sm">
<span className="material-symbols-outlined text-sm text-primary">description</span>
<span className="font-body-md text-sm">data_parser.py</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 cursor-pointer text-on-surface-variant hover:bg-surface-container rounded-sm transition-colors">
<span className="material-symbols-outlined text-sm">description</span>
<span className="font-body-md text-sm">utils.py</span>
</div>
</div>
<div className="flex items-center gap-2 px-2 py-1.5 mt-1 cursor-pointer text-on-surface hover:bg-surface-container rounded-sm group transition-colors">
<span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-on-surface">keyboard_arrow_right</span>
<span className="material-symbols-outlined text-base text-outline">folder</span>
<span className="font-body-md text-sm">tests</span>
</div>
</div>
</div>
</section>
{/* Editor & Terminal Column */}
<section className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest">
{/* Editor Tabs */}
<div className="flex items-center border-b border-surface-container-highest bg-surface-bright overflow-x-auto no-scrollbar">
<div className="flex items-center gap-2 px-4 py-2 border-b-2 border-primary bg-surface-container-lowest text-on-surface cursor-pointer min-w-max">
<span className="material-symbols-outlined text-sm text-primary">description</span>
<span className="font-body-md text-sm">data_parser.py</span>
<div className="w-2 h-2 rounded-full bg-error ml-2" title="Unsaved changes"></div>
<span className="material-symbols-outlined text-sm text-on-surface-variant hover:text-on-surface ml-1">close</span>
</div>
<div className="flex items-center gap-2 px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:bg-surface-container-low cursor-pointer min-w-max transition-colors">
<span className="material-symbols-outlined text-sm">description</span>
<span className="font-body-md text-sm">utils.py</span>
</div>
</div>
{/* Code Editor Area */}
<div className="flex-1 relative overflow-auto p-4 font-mono text-sm leading-relaxed text-on-surface flex">
{/* Line Numbers */}
<div className="w-8 flex flex-col items-end pr-3 text-outline-variant select-none">
<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
</div>
{/* Code Content */}
<div className="flex-1 whitespace-pre">
<span className="text-secondary">def</span> <span className="text-on-surface font-medium">process_telemetry</span>(data_stream):
    <span className="text-outline">"""Parses incoming telemetry and calculates aggregates."""</span>
    total_latency = 0
    valid_packets = []
    
    <span className="text-secondary">for</span> packet <span className="text-secondary">in</span> data_stream:
        <span className="text-secondary">if</span> packet.get(<span className="text-primary">'status'</span>) == <span className="text-primary">'ok'</span>:
            <span className="text-secondary">try</span>:
                <span className="bg-error-container/30 border-b border-error text-on-surface px-1 -ml-1">latency = packet['metrics']['ping'] + <span className="text-primary">"ms"</span></span> <span className="text-error text-xs ml-2 italic">// TypeError potential</span>
                total_latency += latency
                valid_packets.append(packet)
            <span className="text-secondary">except</span> KeyError:
                <span className="text-secondary">continue</span>
<span className="text-secondary">return</span> {'{'} <span className="text-primary">'avg'</span>: total_latency / len(valid_packets), <span className="text-primary">'data'</span>: valid_packets {'}'}</div>
</div>
{/* Terminal */}
<div className="h-56 border-t border-surface-container-highest flex flex-col bg-surface">
<div className="flex items-center justify-between px-4 py-1.5 border-b border-surface-container-highest bg-surface-bright">
<div className="flex gap-4">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase cursor-pointer hover:text-on-surface">Problems <span className="bg-error text-on-error rounded-full px-1.5 text-[10px] ml-1">1</span></span>
<span className="font-label-sm text-label-sm text-on-surface uppercase border-b border-on-surface pb-0.5 cursor-pointer">Terminal</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase cursor-pointer hover:text-on-surface">Output</span>
</div>
<div className="flex gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-on-surface">add</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-on-surface">delete</span>
<span className="material-symbols-outlined text-sm cursor-pointer hover:text-on-surface">keyboard_arrow_up</span>
</div>
</div>
<div className="flex-1 p-3 font-mono text-xs overflow-y-auto text-on-surface-variant">
<div><span className="text-primary">~/workspace/debugmaster $</span> python src/data_parser.py</div>
<div className="text-error mt-2">Traceback (most recent call last):</div>
<div className="text-error">  File "/workspace/debugmaster/src/data_parser.py", line 18, in &lt;module&gt;</div>
<div className="text-error">    process_telemetry([{'{'}'status': 'ok', 'metrics': {'{'}'ping': 24{'}'}{'}'}])</div>
<div className="text-error">  File "/workspace/debugmaster/src/data_parser.py", line 9, in process_telemetry</div>
<div className="text-error">    latency = packet['metrics']['ping'] + "ms"</div>
<div className="text-on-error-container font-bold mt-1 bg-error-container inline-block px-1">TypeError: unsupported operand type(s) for +: 'int' and 'str'</div>
</div>
</div>
</section>
{/* AI Hint Panel (Right Side) */}
<section className="w-80 border-l border-surface-container-highest bg-surface-bright p-4 flex flex-col shrink-0">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2 text-on-surface">
<span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: '\'FILL\' 1'}}>psychology</span>
<span className="font-headline-md text-sm font-semibold tracking-tight">Debug Assistant</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer">close</span>
</div>
<div className="glass-panel rounded-lg p-4 flex flex-col gap-3 shadow-sm">
<div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-sm">lightbulb</span>
</div>
<div>
<h4 className="font-label-sm text-label-sm text-on-surface mb-1">Type Mismatch Detected</h4>
<p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                                You are attempting to use the <code className="bg-surface-container px-1 rounded text-xs text-on-surface">+</code> operator on <code className="bg-surface-container px-1 rounded text-xs text-on-surface">packet['metrics']['ping']</code> (an integer) and <code className="bg-surface-container px-1 rounded text-xs text-on-surface">"ms"</code> (a string) on line 9.
                            </p>
</div>
</div>
<div className="mt-2 pl-9">
<p className="font-body-md text-sm text-on-surface italic border-l-2 border-primary-container pl-3 py-1">
                            "If you intend to format the integer as a string for display, how might you convert the integer type first, or use string formatting like f-strings?"
                        </p>
</div>
<div className="mt-4 flex gap-2 pl-9">
<button className="bg-primary-container text-on-primary-container font-label-sm text-xs px-3 py-1.5 rounded hover:bg-primary-fixed transition-colors">
                            Show Solution
                        </button>
<button className="border border-surface-container-high text-on-surface-variant font-label-sm text-xs px-3 py-1.5 rounded hover:bg-surface-container transition-colors">
                            Explain f-strings
                        </button>
</div>
</div>
<div className="mt-auto pt-4 border-t border-surface-container-highest">
<div className="relative">
<input className="w-full bg-surface border border-surface-container-high rounded-full py-2 pl-4 pr-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant text-on-surface" placeholder="Ask a follow-up question..." type="text"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-on-primary-container transition-colors w-6 h-6 flex items-center justify-center">
<span className="material-symbols-outlined text-lg">send</span>
</button>
</div>
</div>
</section>
</main>
</div>
{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full h-6 px-4 flex justify-between items-center z-50 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
<div className="font-['Space_Grotesk'] text-[10px] font-mono tracking-tight text-zinc-500 dark:text-zinc-400">
            © 2024 DebugMaster AI • System: Latency 24ms
        </div>
<div className="flex gap-4 font-['Space_Grotesk'] text-[10px] font-mono tracking-tight">
<a className="text-lime-400 font-bold cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">v1.2.0</a>
<a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Logs</a>
<a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Console</a>
<a className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-opacity opacity-80 hover:opacity-100" href="#">Support</a>
</div>
</footer>
        </div>
    );
}
