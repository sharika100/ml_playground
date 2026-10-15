import React, { useState } from 'react';
import { Sparkles, Compass, FlaskConical, Calculator, Video, BookMarked, User, Menu, X, ArrowRight, Film } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartLearning: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onStartLearning }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'journey', label: 'Learning Journey', icon: <Compass className="w-4 h-4" /> },
    { id: 'scenarios', label: 'Animated Scenarios', icon: <Film className="w-4 h-4" /> },
    { id: 'lab', label: 'Interactive Lab', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'maths', label: 'Maths Playground', icon: <Calculator className="w-4 h-4" /> },
    { id: 'videos', label: 'Video Lectures', icon: <Video className="w-4 h-4" /> },
    { id: 'revision', label: 'Revision Studio', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0]/92 backdrop-blur-md border-b border-[#E8E5DE] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavClick('home'); }}
            aria-label="Go to ML Playground Home"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-[#315CEB] flex items-center justify-center text-white shadow-playful-cobalt group-hover:scale-105 group-hover:rotate-2 transition-transform">
                <span className="font-extrabold text-base tracking-tight">ML</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F5C94B] border-2 border-[#FFF9F0] shadow-sm"></span>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-[#26324B] tracking-tight flex items-center gap-2">
                <span>ML Playground</span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-[#FEF9EB] text-[#8C6B0F] border border-[#F5C94B]/50">
                  Interactive
                </span>
              </div>
              <div className="text-[11px] text-[#667085] hidden sm:block truncate max-w-xs font-medium">
                Machine Learning made simple. Understanding made interactive.
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FFF9F0] p-1 rounded-2xl border border-[#E8E5DE]/80 shadow-sm" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315CEB] ${
                    isActive
                      ? 'bg-[#315CEB] text-white shadow-playful-sm shadow-[#315CEB]/25'
                      : 'text-[#26324B] hover:text-[#315CEB] hover:bg-white'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#667085]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#315CEB] hover:bg-[#2649C2] text-white font-bold text-xs shadow-playful-cobalt transition-all hover:scale-102 active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#315CEB]"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#26324B] bg-white border border-[#E8E5DE] hover:bg-[#FFF9F0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315CEB]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#FFF9F0] border-b border-[#E8E5DE] shadow-playful-lg space-y-2 animate-fade-in">
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#315CEB] text-white shadow-playful-sm'
                      : 'bg-white text-[#26324B] border border-[#E8E5DE] hover:bg-[#FFF9F0]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#667085]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                onStartLearning();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#315CEB] text-white font-bold text-xs shadow-playful-cobalt"
            >
              <span>Start Learning Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
