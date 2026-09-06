import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  RotateCcw,
  Sparkles,
  MessageSquare,
  X,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  highlights?: Array<{
    label: string;
    value: string;
    color: 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple';
  }>;
}

interface PredefinedQuestion {
  id: string;
  shortText: string;
  fullQuestion: string;
  answer: string;
  highlights: Array<{
    label: string;
    value: string;
    color: 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple';
  }>;
}

const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  {
    id: 'q-situation',
    shortText: 'What is the current situation?',
    fullQuestion: 'What is the current situation?',
    answer:
      'Overall, the school is performing well today. 842 students are present, 58 students are absent, 126 students have pending fees, and 24 students are currently flagged as at risk.',
    highlights: [
      { label: 'Present Today', value: '842', color: 'emerald' },
      { label: 'Absent Today', value: '58', color: 'amber' },
      { label: 'Pending Fees', value: '126', color: 'rose' },
      { label: 'At Risk', value: '24', color: 'indigo' }
    ]
  },
  {
    id: 'q-attendance',
    shortText: 'Students present today',
    fullQuestion: 'How many students are present today?',
    answer:
      'Today, 842 students are present out of 900 registered students. That means the current attendance is approximately 93.6%.',
    highlights: [
      { label: 'Attendance Rate', value: '93.6%', color: 'emerald' },
      { label: 'Present Count', value: '842 / 900', color: 'indigo' }
    ]
  },
  {
    id: 'q-fees',
    shortText: 'Students with pending fees',
    fullQuestion: 'How many students have fees pending?',
    answer:
      'Currently, 126 students have pending fees. The total outstanding amount in this demo is ₹8,45,000.',
    highlights: [
      { label: 'Pending Fee Records', value: '126 Students', color: 'amber' },
      { label: 'Total Outstanding', value: '₹8,45,000', color: 'rose' }
    ]
  },
  {
    id: 'q-risk',
    shortText: 'Students at risk',
    fullQuestion: 'How many students are at risk?',
    answer:
      'There are currently 24 students flagged as at risk. These students may require attention based on attendance, academic performance, or other predefined indicators.',
    highlights: [
      { label: 'Flagged At-Risk', value: '24 Students', color: 'rose' },
      { label: 'Priority Level', value: 'High Attention', color: 'amber' }
    ]
  }
];

interface AdminChatbotProps {
  isOpenExternal?: boolean;
  onToggleExternal?: (open: boolean) => void;
}

export const AdminChatbot: React.FC<AdminChatbotProps> = ({
  isOpenExternal,
  onToggleExternal
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Determine if popup is open (controlled or uncontrolled)
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;

  const setIsOpen = (val: boolean) => {
    if (onToggleExternal) {
      onToggleExternal(val);
    } else {
      setInternalIsOpen(val);
    }
  };

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSelectQuestion = (q: PredefinedQuestion) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: q.fullQuestion,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-ast-${Date.now()}`,
        sender: 'assistant',
        text: q.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        highlights: q.highlights
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    const lower = query.toLowerCase();
    let matchedQ = PREDEFINED_QUESTIONS.find((pq) => {
      if (lower.includes('situation') || lower.includes('overview') || lower.includes('summary')) {
        return pq.id === 'q-situation';
      }
      if (lower.includes('present') || lower.includes('attend')) {
        return pq.id === 'q-attendance';
      }
      if (lower.includes('fee') || lower.includes('due') || lower.includes('pay') || lower.includes('pending')) {
        return pq.id === 'q-fees';
      }
      if (lower.includes('risk') || lower.includes('flag') || lower.includes('low')) {
        return pq.id === 'q-risk';
      }
      return false;
    });

    setTimeout(() => {
      if (matchedQ) {
        const assistantMsg: ChatMessage = {
          id: `msg-ast-${Date.now()}`,
          sender: 'assistant',
          text: matchedQ.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          highlights: matchedQ.highlights
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const fallbackMsg: ChatMessage = {
          id: `msg-ast-${Date.now()}`,
          sender: 'assistant',
          text: `I am currently in demo mode. Please select one of the suggested admin queries below to explore simulated operational metrics.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
      setIsTyping(false);
    }, 400);
  };

  const handleReset = () => {
    setMessages([]);
    setIsTyping(false);
  };

  const getHighlightStyle = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rose':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <>
      {/* Pop-Up Chatbot Window Overlay */}
      {isOpen && (
        <div
          id="admin-chatbot-popup"
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[620px] h-[540px] z-50 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold tracking-tight">EduPlus Admin AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-bold border border-indigo-400/30 uppercase tracking-wider">
                    Demo Mode
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Instant Admin Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Chat Content Area */}
          <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto bg-slate-50/50">
            {messages.length === 0 ? (
              /* Welcome & Initial Predefined Question Cards */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/40 to-slate-50 border border-indigo-100/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">
                      EduPlus AI Admin Assistant
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      Select a pre-written question below to quickly view simulated campus metrics and stats.
                    </p>
                  </div>
                </div>

                {/* Predefined Question Cards */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5">
                    Tap a Pre-Written Question:
                  </p>
                  <div className="space-y-2">
                    {PREDEFINED_QUESTIONS.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleSelectQuestion(q)}
                        className="w-full text-left p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {q.fullQuestion}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">{q.shortText}</p>
                        </div>
                        <div className="w-6 h-6 rounded-lg bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
                          <MessageSquare className="w-3 h-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Active Conversation History */
              <div className="space-y-3.5">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] space-y-1.5 ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs font-medium'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs font-medium'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Metric Highlights Pill Badges */}
                        {msg.highlights && msg.highlights.length > 0 && (
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                            {msg.highlights.map((hl, idx) => (
                              <div
                                key={idx}
                                className={`p-1.5 rounded-xl border text-[10px] font-semibold flex flex-col justify-center ${getHighlightStyle(
                                  hl.color
                                )}`}
                              >
                                <span className="text-[9px] opacity-75 uppercase tracking-wider font-bold">
                                  {hl.label}
                                </span>
                                <span className="text-[11px] font-extrabold mt-0.5">{hl.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-[9px] text-slate-400 font-medium px-1 ${
                          msg.sender === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-1">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/80 rounded-tl-xs shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>
            )}
          </div>

          {/* Input & Persistent Suggestion Controls */}
          <div className="p-3.5 bg-white border-t border-slate-100 space-y-2 shrink-0">
            {/* Quick Suggestion Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {PREDEFINED_QUESTIONS.map((q) => (
                <button
                  key={`chip-${q.id}`}
                  onClick={() => handleSelectQuestion(q)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-[11px] font-semibold border border-slate-200/70 hover:border-indigo-200 transition-all shrink-0 cursor-pointer"
                >
                  {q.shortText}
                </button>
              ))}
            </div>

            {/* Form Input */}
            <form onSubmit={handleSendCustom} className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask predefined question..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Ask</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Floating Chatbot Pop-Up Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          id="admin-chatbot-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2.5 px-4 py-3 rounded-full text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 hover:bg-slate-800 ring-4 ring-slate-200'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 shadow-indigo-500/30 hover:scale-105'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5 animate-pulse" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
            )}
          </div>
          <span className="text-xs font-bold tracking-tight">
            {isOpen ? 'Close Chat' : 'EduPlus AI Assistant'}
          </span>
        </button>
      </div>
    </>
  );
};
