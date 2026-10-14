import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2, BookOpen } from 'lucide-react';

interface CalloutProps {
  type?: 'note' | 'tip' | 'warning' | 'misconception' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'note',
  title,
  children,
  className = '',
}) => {
  const configs = {
    note: {
      border: 'border-blue-500/40 bg-blue-50/60 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />,
      defaultTitle: 'Key Note',
    },
    tip: {
      border: 'border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200',
      icon: <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
      defaultTitle: 'Pro Intuition & Analogy',
    },
    warning: {
      border: 'border-rose-500/40 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
      defaultTitle: 'Common Pitfall & Limitation',
    },
    misconception: {
      border: 'border-purple-500/40 bg-purple-50/60 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200',
      icon: <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />,
      defaultTitle: 'Misconception Buster',
    },
    success: {
      border: 'border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      defaultTitle: 'Verified Accurate',
    },
  };

  const config = configs[type];

  return (
    <div className={`p-4 rounded-xl border ${config.border} my-4 ${className}`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 text-sm leading-relaxed">
          <div className="font-semibold mb-1 text-base tracking-tight">
            {title || config.defaultTitle}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
