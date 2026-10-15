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
      border: 'border-[#315CEB]/30 bg-[#EBF0FD] text-[#1D389E]',
      icon: <Info className="w-5 h-5 text-[#315CEB] shrink-0" />,
      defaultTitle: 'Key Concept Note',
    },
    tip: {
      border: 'border-[#F5C94B]/60 bg-[#FEF9EB] text-[#8C6B0F]',
      icon: <Lightbulb className="w-5 h-5 text-[#D9A927] shrink-0" />,
      defaultTitle: 'Pro Intuition & Analogy',
    },
    warning: {
      border: 'border-[#FF8066]/60 bg-[#FFF0ED] text-[#C4462D]',
      icon: <AlertTriangle className="w-5 h-5 text-[#FF8066] shrink-0" />,
      defaultTitle: 'Common Pitfall & Limitation',
    },
    misconception: {
      border: 'border-purple-300 bg-purple-50/70 text-purple-900',
      icon: <BookOpen className="w-5 h-5 text-purple-600 shrink-0" />,
      defaultTitle: 'Misconception Buster',
    },
    success: {
      border: 'border-[#A8E6CF] bg-[#F0FAF6] text-[#247D5C]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#247D5C] shrink-0" />,
      defaultTitle: 'Verified Accurate',
    },
  };

  const config = configs[type];

  return (
    <div className={`p-4 rounded-2xl border ${config.border} shadow-playful-sm my-4 ${className}`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 text-sm leading-relaxed">
          <div className="font-extrabold mb-1 text-base tracking-tight">
            {title || config.defaultTitle}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
