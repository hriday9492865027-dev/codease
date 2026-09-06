'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import QuestionCard from '../../components/QuestionCard';
import { Calendar, Filter, Search, ListOrdered, ChevronDown } from 'lucide-react';

export default function MondayPage() {
  const [selectedQueNumber, setSelectedQueNumber] = useState<number | 'all'>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(36);

  const allMondayQuestions = useMemo(() => {
    return initialQuestionSets
      .filter(s => s.category === 'monday')
      .flatMap(s => s.questions);
  }, []);

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return allMondayQuestions.filter(q => {
      // 1. Strict Question Position filter (Que 1 to Que 6)
      if (selectedQueNumber !== 'all' && q.position !== selectedQueNumber) {
        return false;
      }

      // 2. Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // 3. Tag filter
      if (selectedTag !== 'all' && !q.tags.includes(selectedTag)) {
        return false;
      }

      // 4. Search filter
      if (searchQuery.trim() !== '') {
        const s = searchQuery.toLowerCase();
        const matches = q.title.toLowerCase().includes(s) ||
          q.problemCode.toLowerCase().includes(s) ||
          (q.contestTitle ? q.contestTitle.toLowerCase().includes(s) : false) ||
          q.tags.some(t => t.toLowerCase().includes(s));
        if (!matches) return false;
      }

      return true;
    });
  }, [allMondayQuestions, selectedQueNumber, selectedDifficulty, selectedTag, searchQuery]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(36);
  }, [selectedQueNumber, selectedDifficulty, selectedTag, searchQuery]);

  const paginatedQuestions = filteredQuestions.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-orange-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>DSA Monday Contests • Weeks 18 down to 1</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">DSA Monday Challenges</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Click on <strong>Que 1</strong>, <strong>Que 2</strong>, <strong>Que 3</strong>, <strong>Que 4</strong>, <strong>Que 5</strong>, or <strong>Que 6</strong> to see all corresponding questions across all 18 contest weeks.
          </p>
        </div>
      </div>

      {/* 6 QUESTION SECTION SELECTOR */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-orange-400" /> Filter by Question Number (Que 1 - 6)
          </h3>
          <button
            onClick={() => setSelectedQueNumber('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedQueNumber === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All 6 Questions
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isSelected = selectedQueNumber === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedQueNumber(num)}
                className={`py-3.5 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-orange-600 to-amber-600 border-orange-400 text-white shadow-lg shadow-orange-600/30 scale-105 font-bold ring-2 ring-orange-500/40'
                    : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
                }`}
              >
                <span className="text-sm font-mono">Que {num}</span>
                <span className="text-[10px] opacity-80 font-normal">
                  {num === 1 ? 'Arrays & Math' :
                   num === 2 ? 'Two Pointers' :
                   num === 3 ? 'Binary Search' :
                   num === 4 ? 'Trees & Graphs' :
                   num === 5 ? 'Dynamic Prog.' : 'Segment Tree'}
                </span>
              </button>
            );
          })}
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            DSA Monday Questions ({filteredQuestions.length}) — {selectedQueNumber === 'all' ? 'All Questions' : `Que ${selectedQueNumber}`}
          </h2>
          <span className="text-xs text-slate-400 font-mono">Week 18 down to Week 1</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No Monday DSA questions match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredQuestions.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setVisibleCount(prev => prev + 36)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm font-semibold text-slate-200 transition-all hover:scale-[1.02]"
                >
                  <span>Load Next Contests ({filteredQuestions.length - visibleCount} remaining)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
