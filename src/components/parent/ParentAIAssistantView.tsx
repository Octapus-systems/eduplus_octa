import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Sparkles,
  Send,
  User,
  Bot,
  RefreshCw,
  HelpCircle,
  BookOpen,
  Award,
  CalendarCheck2,
  CreditCard
} from 'lucide-react';

export const ParentAIAssistantView: React.FC = () => {
  const { selectedChild, addToast } = useLms();

  const [inputQuery, setInputQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Hello Mr. Mehta! I am your AI Parent Assistant for EduPulse LMS. How can I help you analyze ${selectedChild.name}'s progress today?`,
      time: '12:00 PM'
    }
  ]);

  const promptSuggestions = [
    `Summarize ${selectedChild.name}'s performance in Physics & Math`,
    `Are there any upcoming fee deadlines for ${selectedChild.name}?`,
    `Generate 3 key questions to discuss during my upcoming PTA meeting`,
    `Explain Class 10 CGPA grading scale and distinction criteria`
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: query, time };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    setTimeout(() => {
      let aiResponse = `Based on ${selectedChild.name}'s academic record in ${selectedChild.grade}, overall GPA is ${selectedChild.gpa} (Rank #3 in class). Attendance is currently ${selectedChild.attendancePercentage}%.`;
      if (query.toLowerCase().includes('fee')) {
        aiResponse = `${selectedChild.name}'s fee status is currently ${selectedChild.feeStatus.toUpperCase()}. Outstanding dues amount to $${selectedChild.pendingFeeAmount}. Due date: Sep 15, 2026.`;
      } else if (query.toLowerCase().includes('pta') || query.toLowerCase().includes('question')) {
        aiResponse = `Recommended questions for your teacher meeting:\n1. How is ${selectedChild.name} progressing in numerical physics problems?\n2. Are there specific Olympiad preparation materials recommended?\n3. How is classroom participation and peer collaboration?`;
      } else if (query.toLowerCase().includes('grading') || query.toLowerCase().includes('cgpa')) {
        aiResponse = `Class 10 grading scale is calculated on a 4.0 GPA scale. Scores above 90% receive Grade A+ (4.0 Points, Distinction). ${selectedChild.name} currently holds an overall grade average of 91% (Grade A+).`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 600);
  };

  return (
    <div id="parent-ai-assistant-view" className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-200">
              AI Parent Companion
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Academic Insights & PTA Meeting Preparation
          </h2>
          <p className="text-xs text-purple-100/90 mt-1">
            Instant natural language summaries of grades, attendance, exam prep, fee schedules, and teacher agendas for {selectedChild.name}.
          </p>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Suggested Parent Prompts</h4>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-left cursor-pointer"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Stream Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs h-[480px] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">EduPulse AI Parent Assistant</h3>
              <p className="text-[10px] text-slate-500">Live Context: {selectedChild.name} ({selectedChild.grade})</p>
            </div>
          </div>
          <button
            onClick={() => setChatMessages([])}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Stream
          </button>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/40">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-md text-xs shadow-xs space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-[9px] font-mono block text-right ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                  {msg.time}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask anything about ${selectedChild.name}'s progress, fees, or PTA meetings...`}
              className="flex-1 p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
