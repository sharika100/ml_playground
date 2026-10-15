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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0ED] text-[#C4462D] border border-[#FF8066]/30 text-xs font-black mb-3">
          <YoutubeIcon className="w-3.5 h-3.5 text-[#C4462D]" />
          <span>Curated Video Learning Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#26324B] tracking-tight mb-2">
          SharikaTR Video Lectures
        </h1>
        <p className="text-sm text-[#667085] leading-relaxed">
          High-yield video tutorials and worked problem walkthroughs by Sharika T R. Watch lectures, follow along with accompanying notes, and strengthen your exam problem-solving skills.
        </p>
      </div>

      {/* Main Theater Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Video Player & Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="aspect-video rounded-3xl bg-[#26324B] border border-[#344465] overflow-hidden shadow-playful-lg relative flex flex-col justify-center items-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#315CEB]/20 border border-[#315CEB]/40 flex items-center justify-center text-[#315CEB] mb-4 shadow-playful-sm">
              <Play className="w-8 h-8 fill-current ml-1 text-[#315CEB]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 max-w-md">
              {selectedVideo.title}
            </h3>
            <p className="text-xs text-[#E8E5DE]/80 max-w-sm mb-6">
              Official video tutorial by Sharika T R. Click below to stream on YouTube with full playback controls and captions.
            </p>
            <a
              href={selectedVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#315CEB] hover:bg-[#2548BA] text-white font-black text-sm shadow-playful-sm transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Video on YouTube</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Active Video Metadata Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E5DE] shadow-playful space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-[#315CEB] uppercase tracking-wider">
                {selectedVideo.topicTitle}
              </span>
              <span className="text-xs text-[#667085] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" /> Duration: {selectedVideo.duration}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#26324B]">
              {selectedVideo.title}
            </h2>

            <p className="text-xs text-[#667085] leading-relaxed">
              {selectedVideo.description}
            </p>

            {/* Key Concepts */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#26324B] block mb-2">
                Key Concepts Covered in This Lecture:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.keyConcepts.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-xl bg-[#FFF9F0] border border-[#E8E5DE] text-[#26324B] font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#247D5C]" />
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Accompanying Notes Box */}
            <div className="pt-3 border-t border-[#E8E5DE] flex items-center justify-between text-xs text-[#667085]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#315CEB]" />
                <span>{selectedVideo.notesSummary}</span>
              </div>
              <a
                href="https://www.sharikatr.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#315CEB] hover:underline flex items-center gap-1 shrink-0"
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
            <h3 className="font-bold text-base text-[#26324B]">
              Channel Video Catalog ({VIDEO_RESOURCES.length})
            </h3>
            <a
              href="https://youtube.com/@sharikatr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#FF8066] hover:text-[#C4462D] flex items-center gap-1"
            >
              <span>@sharikatr</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search lectures or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs bg-white border border-[#E8E5DE] text-[#26324B] focus:outline-none focus:ring-2 focus:ring-[#315CEB]/20 shadow-sm"
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
                  className={`p-4 rounded-3xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#315CEB] bg-[#EBF0FD] ring-2 ring-[#315CEB]/20 shadow-playful-sm'
                      : 'border-[#E8E5DE] bg-white hover:border-[#315CEB] shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF9F0] text-[#667085] border border-[#E8E5DE]">
                      {vid.topicTitle}
                    </span>
                    <span className="text-[10px] text-[#667085] ml-auto font-mono">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#26324B] line-clamp-2 mb-2">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#667085]">
                    <span className="flex items-center gap-1 text-[#FF8066] font-semibold">
                      <Play className="w-3 h-3 fill-current" /> Lecture Video
                    </span>
                    <span className="text-[#315CEB] font-bold">
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
