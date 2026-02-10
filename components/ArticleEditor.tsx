import React from 'react';
import { PainterStyle, AIKeyword } from '../types';
import { Card } from './UIComponents';

interface ArticleEditorProps {
  content: string;
  setContent: (s: string) => void;
  viewMode: 'edit' | 'preview';
  styleData: PainterStyle;
  keywords: AIKeyword[];
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({ 
  content, 
  setContent, 
  viewMode, 
  styleData,
  keywords 
}) => {
  
  const highlightKeywords = (text: string) => {
    // Simple naive highlighter for preview mode
    if (keywords.length === 0) return text;
    
    let processed = text;
    // Sort by length desc to avoid replacing substrings of other keywords
    const sortedKw = [...keywords].sort((a, b) => b.word.length - a.word.length);
    
    // We strictly shouldn't do regex replace heavily in render, but for this demo:
    // This is a simplified logic. In production, parsing properly is better.
    // Here we just return the raw text if no keywords, or render simple HTML.
    
    return (
        <div className="whitespace-pre-wrap">
            {text.split('\n').map((line, i) => {
                 let lineNode: React.ReactNode[] = [line];
                 sortedKw.forEach(kw => {
                     const regex = new RegExp(`(${kw.word})`, 'gi');
                     const newNodes: React.ReactNode[] = [];
                     lineNode.forEach(node => {
                         if (typeof node === 'string') {
                            const parts = node.split(regex);
                            parts.forEach((part, idx) => {
                                if (part.toLowerCase() === kw.word.toLowerCase()) {
                                    newNodes.push(
                                        <span key={`${i}-${kw.word}-${idx}`} 
                                              style={{ backgroundColor: kw.color, color: '#fff', padding: '0 4px', borderRadius: '4px' }}>
                                            {part}
                                        </span>
                                    );
                                } else {
                                    newNodes.push(part);
                                }
                            });
                         } else {
                             newNodes.push(node);
                         }
                     });
                     lineNode = newNodes;
                 });
                 return <p key={i} className="mb-2">{lineNode}</p>;
            })}
        </div>
    );
  };

  return (
    <Card styleData={styleData} className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 border-b pb-2 border-current opacity-70">
        <h2 className="text-2xl font-bold">Document Editor</h2>
        <span className="text-sm opacity-60">{content.split(/\s+/).length} words</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {viewMode === 'edit' ? (
          <textarea
            className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm sm:text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article here..."
          />
        ) : (
          <div className={`prose max-w-none ${styleData.textColor}`}>
             {highlightKeywords(content)}
          </div>
        )}
      </div>
    </Card>
  );
};
