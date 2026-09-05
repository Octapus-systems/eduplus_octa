import React from 'react';
import { useLms } from '../../context/LmsContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLms();

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const iconMap = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
            error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
            info: <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          };

          const borderMap = {
            success: 'border-emerald-200 bg-white',
            error: 'border-rose-200 bg-white',
            warning: 'border-amber-200 bg-white',
            info: 'border-indigo-200 bg-white'
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              layout
              id={`toast-${toast.id}`}
              className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 text-slate-800 ${borderMap[toast.type]}`}
            >
              {iconMap[toast.type]}
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {toast.title}
                </p>
                <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                  {toast.message}
                </p>
              </div>
              <button
                id={`btn-close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
