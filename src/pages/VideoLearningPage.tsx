import React, { useState } from 'react';
import { VIDEO_RESOURCES } from '../data/videos';
import { VideoResource } from '../types';
import { ExternalLink, Play, BookOpen, Clock, CheckCircle2, Search } from 'lucide-react';
import { YoutubeIcon } from '../components/common/YoutubeIcon';

export const VideoLearningPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoResource>(VIDEO_RESOURCES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = VIDEO_RESOURCES.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.keyConcepts.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold mb-3">
          <YoutubeIcon className="w-3.5 h-3.5" />
          <span>Curated Video Learning Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          SharikaTR Video Lectures
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          High-yield video tutorials and worked problem walkthroughs by Sharika T R. Watch lectures, follow along with accompanying notes, and strengthen your exam problem-solving skills.
        </p>
      </div>

      {/* Main Theater Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Video Player & Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="aspect-video rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative flex flex-col justify-center items-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-600/20">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 max-w-md">
              {selectedVideo.title}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mb-6">
              Official video tutorial by Sharika T R. Click below to stream on YouTube with full playback controls and captions.
            </p>
            <a
              href={selectedVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Video on YouTube</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Active Video Metadata Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                {selectedVideo.topicTitle}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" /> Duration: {selectedVideo.duration}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedVideo.title}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedVideo.description}
            </p>

            {/* Key Concepts */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Key Concepts Covered in This Lecture:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.keyConcepts.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Accompanying Notes Box */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>{selectedVideo.notesSummary}</span>
              </div>
              <a
                href="https://www.sharikatr.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>sharikatr.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Channel Video Catalog ({VIDEO_RESOURCES.length})
            </h3>
            <a
              href="https://youtube.com/@sharikatr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <span>@sharikatr</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search lectures or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Video Cards List */}
          <div className="space-y-3">
            {filteredVideos.map((vid) => {
              const isSelected = selectedVideo.id === vid.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {vid.topicTitle}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto font-mono">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-rose-500 font-semibold">
                      <Play className="w-3 h-3 fill-current" /> Lecture Video
                    </span>
                    <span className="text-brand-600 dark:text-brand-400 font-semibold">
                      {isSelected ? 'Currently Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
