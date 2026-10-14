import React from 'react';
import { ExternalLink, Heart, BookOpen, GraduationCap, School } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Platform Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-black text-sm">
                ML
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">ML Playground</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Machine Learning made simple. Understanding made interactive. Explore core concepts, play with predictive models, understand the underlying mathematics, and discover how machines learn from observations.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <GraduationCap className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Created for students, educators, and curious minds worldwide. Completely free & no login required.</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('journey')} className="hover:text-brand-400 transition-colors">
                  Learning Journey Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-brand-400 transition-colors">
                  Interactive ML Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('maths')} className="hover:text-brand-400 transition-colors">
                  Maths Playground (Entropy & MSE)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('videos')} className="hover:text-brand-400 transition-colors">
                  SharikaTR Video Lectures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('revision')} className="hover:text-brand-400 transition-colors">
                  Revision Studio & Challenges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Creator & Affiliation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Creator & Affiliation</h4>
            <div className="text-xs space-y-2 text-slate-400">
              <div className="font-semibold text-slate-200">Sharika T R</div>
              <div className="text-[11px] leading-tight">
                Assistant Professor, Dept of Computer Science and Engineering
              </div>
              <div className="text-[11px] flex items-center gap-1 text-slate-300">
                <School className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>Adi Shankara Institute of Engg & Tech (ASIET)</span>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                <a
                  href="https://youtube.com/@sharikatr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors font-medium text-xs"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>YouTube: @sharikatr</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <a
                  href="https://www.adishankara.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official ASIET Website</span>
                </a>
                <a
                  href="https://www.sharikatr.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>sharikatr.in (Notes Portal)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ML Playground. Open educational resource. Scientifically rigorous & interactive.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-1">
            <span>Built with care for curious learners everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
