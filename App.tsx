import React, { useState, useEffect, useRef } from 'react';
import { 
  AIModel, 
  ArticleData, 
  PainterStyle, 
  ChatMessage, 
  Language,
  AIKeyword
} from './types';
import { INITIAL_ARTICLE_CONTENT, PAINTER_STYLES } from './constants';
import { generateText, streamChat, improveArticle, generateKeywords } from './geminiService';
import { ArticleEditor } from './components/ArticleEditor';
import { Dashboard } from './components/Dashboard';
import { WowButton, Card, Select } from './components/UIComponents';

export default function App() {
  const [content, setContent] = useState(INITIAL_ARTICLE_CONTENT);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');
  const [styleIndex, setStyleIndex] = useState(0);
  const [jackpotRunning, setJackpotRunning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [keywords, setKeywords] = useState<AIKeyword[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>(AIModel.GEMINI_3_FLASH_PREVIEW);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentStyle = PAINTER_STYLES[styleIndex];

  // Jackpot Style Selector
  const runJackpot = () => {
    if (jackpotRunning) return;
    setJackpotRunning(true);
    let duration = 2000;
    let step = 100;
    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % PAINTER_STYLES.length);
      duration -= step;
      if (duration <= 0) {
        clearInterval(interval);
        setJackpotRunning(false);
      }
    }, 100);
    setTimeout(() => {
        clearInterval(interval);
        setJackpotRunning(false);
    }, 2000);
  };

  // AI Magics
  const runAIMagic = async (type: string) => {
    setIsAiThinking(true);
    let prompt = "";
    
    switch (type) {
      case 'keywords':
        const kws = await generateKeywords(content);
        setKeywords(kws);
        setIsAiThinking(false);
        return;
      case 'summarize':
        prompt = "Summarize the following article into 3 key bullet points focusing on 2026 impact.";
        break;
      case 'sentiment':
        prompt = "Analyze the sentiment of this regulatory outlook. Is it optimistic, pessimistic, or neutral? Explain why.";
        break;
      case 'simplify':
        prompt = "Explain this article to a 5-year-old.";
        break;
      case 'quiz':
        prompt = "Create a 3-question multiple choice quiz based on this article.";
        break;
      case 'translate':
        prompt = "Translate the Executive Summary to Traditional Chinese.";
        break;
      case 'title':
        prompt = "Generate 5 catchy alternative titles for this article.";
        break;
    }

    if (prompt) {
      const response = await generateText(`${prompt}\n\nArticle: ${content.substring(0, 5000)}...`, selectedModel);
      setChatHistory(prev => [...prev, 
        { role: 'user', text: `Magic: ${type}`, timestamp: Date.now() },
        { role: 'model', text: response, timestamp: Date.now() }
      ]);
    }
    setIsAiThinking(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: msg, timestamp: Date.now() }]);
    setIsAiThinking(true);

    try {
      const generator = await streamChat(chatHistory, msg, selectedModel);
      let fullResponse = "";
      
      setChatHistory(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);
      
      for await (const chunk of generator) {
        fullResponse += chunk;
        setChatHistory(prev => {
          const newH = [...prev];
          newH[newH.length - 1].text = fullResponse;
          return newH;
        });
      }
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Error connecting to AI Agent.", timestamp: Date.now() }]);
    }
    setIsAiThinking(false);
  };

  const handleImproveArticle = async () => {
    setIsAiThinking(true);
    const improvement = await improveArticle(content, chatInput || "Fix grammar and improve flow.", selectedModel);
    setContent(improvement);
    setChatHistory(prev => [...prev, 
        { role: 'user', text: "Improve Article: " + (chatInput || "General improvement"), timestamp: Date.now() },
        { role: 'model', text: "I have updated the article in the editor based on your request.", timestamp: Date.now() }
    ]);
    setIsAiThinking(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          setContent(ev.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "medtech_outlook_2026.md";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden transition-all duration-700 ${currentStyle.bgGradient} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Navbar / Status Bar */}
      <header className={`h-16 flex items-center justify-between px-6 backdrop-blur-md shadow-md z-50 ${currentStyle.cardBg} ${currentStyle.borderColor} border-b`}>
        <div className="flex items-center space-x-4">
          <h1 className={`text-xl font-bold hidden md:block ${currentStyle.fontFamily}`}>MedTech Agent 2026</h1>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${isAiThinking ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}>
            {isAiThinking ? 'AI THINKING...' : 'SYSTEM ONLINE'}
          </span>
          <span className="text-xs opacity-70 hidden sm:block">Word Count: {content.split(/\s+/).length}</span>
        </div>

        <div className="flex items-center space-x-3">
          <WowButton onClick={runJackpot} styleData={currentStyle} active={jackpotRunning} className="animate-pulse-fast">
             🎰 {jackpotRunning ? '...' : currentStyle.name}
          </WowButton>
          
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as any)} 
            className={`bg-transparent border rounded p-1 text-xs ${currentStyle.borderColor} ${currentStyle.textColor}`}
          >
            <option value="light" className="text-black">Light</option>
            <option value="dark" className="text-black">Dark</option>
          </select>

          <select 
             value={language} 
             onChange={(e) => setLanguage(e.target.value as any)}
             className={`bg-transparent border rounded p-1 text-xs ${currentStyle.borderColor} ${currentStyle.textColor}`}
          >
             <option value={Language.EN} className="text-black">EN</option>
             <option value={Language.ZH} className="text-black">中文</option>
          </select>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        
        {/* Left: Article Editor (6/12) */}
        <div className="lg:col-span-6 flex flex-col h-full space-y-4">
          <div className="flex space-x-2">
            <WowButton onClick={() => setViewMode('edit')} active={viewMode === 'edit'} styleData={currentStyle} className="text-sm">Edit</WowButton>
            <WowButton onClick={() => setViewMode('preview')} active={viewMode === 'preview'} styleData={currentStyle} className="text-sm">Preview</WowButton>
            <div className="flex-grow" />
            <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" />
            <WowButton onClick={() => fileInputRef.current?.click()} styleData={currentStyle} variant="secondary" className="text-sm">Upload</WowButton>
            <WowButton onClick={handleDownload} styleData={currentStyle} variant="secondary" className="text-sm">Download</WowButton>
          </div>
          
          <ArticleEditor 
             content={content} 
             setContent={setContent} 
             viewMode={viewMode} 
             styleData={currentStyle}
             keywords={keywords}
          />
        </div>

        {/* Right: Dashboard & Agent (6/12) */}
        <div className="lg:col-span-6 flex flex-col h-full space-y-4 overflow-hidden">
          
          {/* Top Right: Agent & Magics */}
          <div className={`flex-1 flex flex-col min-h-0 ${currentStyle.cardBg} rounded-xl shadow-xl border ${currentStyle.borderColor} p-4`}>
             <div className="flex justify-between items-center mb-2">
                <h3 className={`font-bold ${currentStyle.textColor}`}>Agentic Command Center</h3>
                <Select styleData={currentStyle} value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
                    <option value={AIModel.GEMINI_3_FLASH_PREVIEW} className="text-black">Gemini 3 Flash</option>
                    <option value={AIModel.GEMINI_3_PRO_PREVIEW} className="text-black">Gemini 3 Pro</option>
                    <option value={AIModel.GEMINI_2_5_FLASH} className="text-black">Gemini 2.5 Flash</option>
                </Select>
             </div>

             {/* Chat History */}
             <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar p-2 rounded bg-black/10">
                {chatHistory.length === 0 && (
                    <div className="text-center opacity-50 mt-10 italic">Select an AI Magic or ask a question...</div>
                )}
                {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-stone-700 text-stone-200'}`}>
                           {msg.text}
                        </div>
                        <span className="text-[10px] opacity-40 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
             </div>

             {/* Magics Grid */}
             <div className="grid grid-cols-3 gap-2 mb-4">
                 {['keywords', 'summarize', 'sentiment', 'simplify', 'quiz', 'translate'].map(magic => (
                     <button 
                        key={magic}
                        onClick={() => runAIMagic(magic)}
                        className={`p-1 text-xs border rounded hover:bg-white/20 transition ${currentStyle.borderColor} ${currentStyle.textColor}`}
                     >
                        ✨ {magic.charAt(0).toUpperCase() + magic.slice(1)}
                     </button>
                 ))}
             </div>

             {/* Input Area */}
             <div className="flex space-x-2">
                 <input 
                    className={`flex-1 bg-transparent border rounded px-3 py-2 outline-none ${currentStyle.borderColor} ${currentStyle.textColor}`}
                    placeholder="Ask agent or instruction to improve..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleChat()}
                 />
                 <WowButton onClick={handleChat} styleData={currentStyle}>Send</WowButton>
                 <WowButton onClick={handleImproveArticle} styleData={currentStyle} variant="secondary">Improve</WowButton>
             </div>
          </div>

          {/* Bottom Right: Graphs (Scrollable) */}
          <div className="flex-[1.5] min-h-0 overflow-hidden relative">
             <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                 <Dashboard styleData={currentStyle} articleContent={content} />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
