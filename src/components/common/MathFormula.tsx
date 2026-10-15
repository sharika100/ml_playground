import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Strips bounding LaTeX delimiters if already present ($$, $, \[, \], \(, \)).
 */
export function cleanMathExpression(expr: string): string {
  if (!expr) return '';
  let s = expr.trim();

  // Strip $$ ... $$
  if (s.startsWith('$$') && s.endsWith('$$') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  }
  // Strip \[ ... \]
  else if (s.startsWith('\\[') && s.endsWith('\\]') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  }
  // Strip $ ... $ (must not be escaped \$)
  else if (s.startsWith('$') && s.endsWith('$') && s.length >= 2 && !s.startsWith('\\$')) {
    s = s.slice(1, -1).trim();
  }
  // Strip \( ... \)
  else if (s.startsWith('\\(') && s.endsWith('\\)') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  }

  return s;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renders a LaTeX string to HTML using KaTeX with MathML preservation.
 */
export function renderMathToString(formula: string, displayMode: boolean): string {
  const cleaned = cleanMathExpression(formula);
  if (!cleaned) return '';

  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false,
    });
  } catch (err) {
    console.warn('KaTeX rendering error for expression:', formula, err);
    return `<span class="katex-error text-rose-500 font-mono text-xs">${escapeHtml(formula)}</span>`;
  }
}

export interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
  title?: string;
  explanation?: string;
}

/**
 * Universal mathematical formula renderer.
 * When block=true, renders a responsive, styled display equation card.
 * When block=false, renders a clean, baseline-aligned inline <span>.
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  block = false,
  className = '',
  title,
  explanation,
}) => {
  const renderedHtml = useMemo(() => {
    return renderMathToString(formula, block);
  }, [formula, block]);

  if (!block) {
    return (
      <span
        className={`inline-math inline-flex items-baseline align-baseline max-w-full px-0.5 text-inherit ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <div
      className={`my-4 p-5 sm:p-6 bg-white text-[#26324B] rounded-3xl shadow-playful border border-[#E8E5DE] max-w-full overflow-hidden transition-all ${className}`}
    >
      {title && (
        <div className="text-xs uppercase tracking-wider text-[#315CEB] font-extrabold mb-3 pb-2 border-b border-[#E8E5DE] flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[10px] font-mono font-bold text-[#315CEB] bg-[#EBF0FD] px-2 py-0.5 rounded-full">Formula</span>
        </div>
      )}
      <div
        className="math-display-scroll overflow-x-auto overflow-y-hidden max-w-full text-center py-2.5 text-[#26324B]"
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
      {explanation && (
        <div className="mt-3 pt-2.5 border-t border-[#E8E5DE] text-xs text-[#667085] leading-relaxed flex items-start gap-2 bg-[#FEF9EB]/80 p-3 rounded-2xl border border-[#F5C94B]/40">
          <span className="text-sm shrink-0">💡</span>
          <span className="text-[#26324B]">{explanation}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Helper component for inline mathematics.
 */
export const InlineMath: React.FC<{ math: string; className?: string }> = ({
  math,
  className = '',
}) => {
  return <MathFormula formula={math} block={false} className={className} />;
};

/**
 * Helper component that parses mixed text containing $...$ or \(...\) math delimiters
 * and renders plain text alongside KaTeX spans.
 */
export const MathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const parts = useMemo(() => {
    if (!text) return [];

    // Regex to split on $$...$$, \[...\], \(...\), or $...$
    // Supports escaped \$ inside text without mistaking it for math delimiter
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$(?:[\s\S]*?)\$\$|(?<!\\)\$[^\$\n]+?(?<!\\)\$)/g;
    const tokens: { isMath: boolean; content: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          isMath: false,
          content: text.slice(lastIndex, match.index),
        });
      }
      tokens.push({
        isMath: true,
        content: match[0],
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push({
        isMath: false,
        content: text.slice(lastIndex),
      });
    }

    return tokens;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p, idx) =>
        p.isMath ? (
          <InlineMath key={idx} math={p.content} />
        ) : (
          <React.Fragment key={idx}>{p.content.replace(/\\\$/g, '$')}</React.Fragment>
        )
      )}
    </span>
  );
};
