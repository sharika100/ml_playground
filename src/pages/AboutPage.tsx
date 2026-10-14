import React from 'react';
import { User, School, ExternalLink, Heart, Sparkles, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold">
          <User className="w-3.5 h-3.5" />
          <span>Creator Profile & Educational Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About ML Playground
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Bridging the gap between mathematical theory and hands-on understanding. Created by Sharika T R for students and curious minds everywhere.
        </p>
      </div>

      {/* Creator Profile Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-brand-500/25 shrink-0">
            STR
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sharika T R</h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300">
                Lead Educator & Creator
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Assistant Professor, Department of Computer Science and Engineering
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-bold">
              <School className="w-4 h-4" />
              <span>Adi Shankara Institute of Engineering and Technology (ASIET), Kalady, Kerala</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Sharika T R is an educator in Artificial Intelligence and Computer Science at the Department of Computer Science and Engineering, Adi Shankara Institute of Engineering and Technology (ASIET). Through her widely watched YouTube channel <strong>@sharikatr</strong> and notes platform <strong>sharikatr.in</strong>, she has empowered thousands of undergraduate engineering students to understand complex algorithmic subjects with clarity and confidence.
          </p>
          <p>
            <strong>ML Playground</strong> was envisioned as the natural interactive evolution of traditional lecture notes: transforming static PDF pages and PowerPoint slides into live simulations where students can test hypotheses, calculate information gains, and visualize cost function optimization in real time.
          </p>
        </div>

        {/* Verified Links */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
          <a
            href="https://youtube.com/@sharikatr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>YouTube: @sharikatr</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.adishankara.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ASIET Official Website</span>
          </a>
          <a
            href="https://www.sharikatr.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>sharikatr.in (Notes Archive)</span>
          </a>
        </div>
      </div>

      {/* Scientific Accuracy & Open Access Charter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Scientific Accuracy Contract</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Never simplify a concept so much that it becomes technically incorrect. Every formula, probability calculation, and simulation uses genuine mathematical definitions without fabricated shortcuts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-2">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Universal & Free Access</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No mandatory signups, no paywalls, and no external AI API keys needed. Open to university students, self-learners, school educators, and engineering professionals globally.
          </p>
        </div>
      </div>
    </div>
  );
};
