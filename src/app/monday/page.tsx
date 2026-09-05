'use client';

import React, { useState } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import ContestCard from '../../components/ContestCard';
import QuestionCard from '../../components/QuestionCard';
import { Calendar, Filter, Search, Tag } from 'lucide-react';

export default function MondayPage() {
  const [sets] = useState(initialQuestionSets.filter(s => s.category === 'monday'));
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allMondayQuestions = sets.flatMap(s => s.questions);

  // Extract unique tags
  const allTags = Array.from(new Set(allMondayQuestions.flatMap(q => q.tags)));

  // Filtered list
  const filteredQuestions = allMondayQuestions.filter(q => {
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesTag = selectedTag === 'all' || q.tags.includes(selectedTag);
    const matchesSearch = searchQuery === '' || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDifficulty && matchesTag && matchesSearch;
  });

  const isFiltering = selectedDifficulty !== 'all' || selectedTag !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-orange-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Monday DSA Arena</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">Monday DSA Challenges</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every Monday, tackle curated high-frequency data structures &amp; algorithm problems ranging from fundamental Trees and Graphs to advanced Dynamic Programming and Segment Trees.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Monday problems, codes, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Difficulty Buttons */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {diff === 'all' ? 'All Difficulties' : diff}
              </button>
            ))}
          </div>

        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 pb-1">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
            <Tag className="w-3 h-3" /> Topics:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
              selectedTag === 'all'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                selectedTag === tag
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {isFiltering ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Filtered Monday Questions ({filteredQuestions.length})
            </h2>
            <button
              onClick={() => {
                setSelectedDifficulty('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="text-xs text-orange-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
              <p className="text-sm text-slate-400">No Monday DSA questions match your current filters.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {sets.map((set) => (
            <ContestCard key={set.id} questionSet={set} />
          ))}
        </div>
      )}

    </div>
  );
}
