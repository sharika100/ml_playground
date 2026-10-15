import React from 'react';
import { User, School, ExternalLink, Heart, Sparkles, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0FD] text-[#315CEB] border border-[#315CEB]/20 text-xs font-black">
          <User className="w-3.5 h-3.5" />
          <span>Creator Profile & Educational Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#26324B] tracking-tight">
          About ML Playground
        </h1>
        <p className="text-sm text-[#667085] max-w-xl mx-auto leading-relaxed">
          Bridging the gap between mathematical theory and hands-on understanding. Created by Sharika T R for students and curious minds everywhere.
        </p>
      </div>

      {/* Creator Profile Card */}
      <div className="p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#315CEB] to-[#FF8066] flex items-center justify-center text-white font-black text-3xl shadow-playful-sm shrink-0">
            STR
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-[#26324B]">Sharika T R</h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FEF9EB] text-[#8C6B0F] border border-[#F5C94B]">
                Lead Educator & Creator
              </span>
            </div>
            <p className="text-xs font-semibold text-[#667085]">
              Assistant Professor, Department of Computer Science and Engineering
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#315CEB] font-bold">
              <School className="w-4 h-4" />
              <span>Adi Shankara Institute of Engineering and Technology (ASIET), Kalady, Kerala</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E5DE] space-y-3 text-xs text-[#667085] leading-relaxed">
          <p>
            Sharika T R is an educator in Artificial Intelligence and Computer Science at the Department of Computer Science and Engineering, Adi Shankara Institute of Engineering and Technology (ASIET). Through her widely watched YouTube channel <strong>@sharikatr</strong> and notes platform <strong>sharikatr.in</strong>, she has empowered thousands of undergraduate engineering students to understand complex algorithmic subjects with clarity and confidence.
          </p>
          <p>
            <strong>ML Playground</strong> was envisioned as the natural interactive evolution of traditional lecture notes: transforming static PDF pages and PowerPoint slides into live simulations where students can test hypotheses, calculate information gains, and visualize cost function optimization in real time.
          </p>
        </div>

        {/* Verified Links */}
        <div className="pt-4 border-t border-[#E8E5DE] flex flex-wrap items-center gap-4">
          <a
            href="https://youtube.com/@sharikatr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF8066] hover:bg-[#E0664F] text-white font-bold text-xs transition-colors shadow-playful-sm"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>YouTube: @sharikatr</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.adishankara.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8E5DE] bg-white hover:bg-[#FFF9F0] text-[#26324B] font-bold text-xs transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ASIET Official Website</span>
          </a>
          <a
            href="https://www.sharikatr.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8E5DE] bg-white hover:bg-[#FFF9F0] text-[#26324B] font-bold text-xs transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>sharikatr.in (Notes Archive)</span>
          </a>
        </div>
      </div>

      {/* Scientific Accuracy & Open Access Charter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#F0FAF6] text-[#247D5C] flex items-center justify-center mb-2 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-[#26324B]">Scientific Accuracy Contract</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            Never simplify a concept so much that it becomes technically incorrect. Every formula, probability calculation, and simulation uses genuine mathematical definitions without fabricated shortcuts.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#EBF0FD] text-[#315CEB] flex items-center justify-center mb-2 shadow-sm">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-[#26324B]">Universal & Free Access</h3>
          <p className="text-xs text-[#667085] leading-relaxed">
            No mandatory signups, no paywalls, and no external AI API keys needed. Open to university students, self-learners, school educators, and engineering professionals globally.
          </p>
        </div>
      </div>
    </div>
  );
};
