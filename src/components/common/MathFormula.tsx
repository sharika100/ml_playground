import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
  title?: string;
  explanation?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  block = false,
  className = '',
  title,
  explanation,
}) => {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return formula;
    }
  }, [formula, block]);

  return (
    <div className={`my-2 ${block ? 'p-3 bg-slate-900 text-slate-100 rounded-xl shadow-inner border border-slate-800' : 'inline-block'} ${className}`}>
      {title && <div className="text-xs uppercase tracking-wider text-brand-400 font-semibold mb-1">{title}</div>}
      <div
        className={`font-mono overflow-x-auto ${block ? 'text-center py-2' : ''}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
      {explanation && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300 italic">
          💡 {explanation}
        </div>
      )}
    </div>
  );
};
