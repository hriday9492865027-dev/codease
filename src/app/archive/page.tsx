'use client';

import React, { useState } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import ContestCard from '../../components/ContestCard';
import { Archive, Calendar, Zap, Search } from 'lucide-react';

export default function ArchivePage() {
  const [sets] = useState(initialQuestionSets);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'monday' | 'wednesday'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSets = sets.filter(s => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (searchQuery.trim() !== '') {
      const matchTitle = s.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchQuestions = s.questions.some(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.problemCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchTitle || matchQuestions;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="relative rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-slate-900 via-[#101626] to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
            <Archive className="w-3.5 h-3.5 text-orange-400" />
            <span>Historical Repository</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">Question Archive</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Browse through past Monday DSA Challenges and Wednesday Starters collections. Never miss any question from previous weeks or contests.
          </p>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Sets ({sets.length})
            </button>
            <button
              onClick={() => setCategoryFilter('monday')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                categoryFilter === 'monday'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Monday DSA
            </button>
            <button
              onClick={() => setCategoryFilter('wednesday')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                categoryFilter === 'wednesday'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Wednesday Starters
            </button>
          </div>

        </div>
      </div>

      {/* Archive Sets */}
      <div className="space-y-8">
        {filteredSets.map((set) => (
          <ContestCard key={set.id} questionSet={set} initialDivision="all" showAllDivisionsByDefault={true} />
        ))}

        {filteredSets.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No archived question sets found matching your query.</p>
          </div>
        )}
      </div>

    </div>
  );
}
