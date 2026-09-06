'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import QuestionCard from '../../components/QuestionCard';
import { Question } from '../../lib/types';
import { Zap, Layers, Search, ListOrdered, ChevronDown } from 'lucide-react';

export default function WednesdayPage() {
  const [selectedDiv, setSelectedDiv] = useState<'div4' | 'div3' | 'div2' | 'div1'>('div4');
  const [selectedQueNumber, setSelectedQueNumber] = useState<number | 'all'>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(36);

  const allWednesdayQuestions = useMemo(() => {
    return initialQuestionSets
      .filter(s => s.category === 'wednesday')
      .flatMap(s => s.questions);
  }, []);

  const filteredQuestions = useMemo(() => {
    return allWednesdayQuestions.filter(q => {
      // 1. Division filter
      if (q.division !== selectedDiv) return false;

      // 2. Strict Question Position filter (Que 1, Que 2, etc.)
      if (selectedQueNumber !== 'all' && q.position !== selectedQueNumber) {
        return false;
      }

      // 3. Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // 4. Search query
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
  }, [allWednesdayQuestions, selectedDiv, selectedQueNumber, selectedDifficulty, searchQuery]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(36);
  }, [selectedDiv, selectedQueNumber, selectedDifficulty, searchQuery]);

  const paginatedQuestions = filteredQuestions.slice(0, visibleCount);

  const divisionInfo = [
    {
      id: 'div4' as const,
      title: 'Division 4',
      rating: 'Rating 0 - 1399',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      desc: 'Beginners & Starters: Basic Arrays, Loops, Math & Implementation',
    },
    {
      id: 'div3' as const,
      title: 'Division 3',
      rating: 'Rating 1400 - 1599',
      badgeClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      desc: 'Intermediate: Constructive Algorithms, Bitwise Ops, Prefix Sums',
    },
    {
      id: 'div2' as const,
      title: 'Division 2',
      rating: 'Rating 1600 - 1999',
      badgeClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
      desc: 'Advanced: Tree Algorithms, Binary Search, Modulo Arithmetic, DP',
    },
    {
      id: 'div1' as const,
      title: 'Division 1',
      rating: 'Rating 2000+',
      badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      desc: 'Grandmasters & Experts: Advanced DP, Segment Trees, Flow, HLD',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Wednesday Starters • START254 down to START1</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">Wednesday Starters</span> Arena
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Select your division (<strong>Div 4, Div 3, Div 2, Div 1</strong>) and choose any <strong>Question (Que 1 to Que 7)</strong> to browse that exact question position across every single Starters contest from START254 down to START1.
          </p>
        </div>
      </div>

      {/* STEP 1: DIVISION SELECTOR */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" /> Step 1: Select Division
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionInfo.map((info) => {
            const isSelected = selectedDiv === info.id;
            return (
              <button
                key={info.id}
                onClick={() => setSelectedDiv(info.id)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-orange-500 ring-2 ring-orange-500/30 shadow-lg'
                    : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{info.title}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase ${info.badgeClass}`}>
                      {info.id}
                    </span>
                  </div>
                  <p className="text-xs text-amber-400/90 font-mono font-medium">{info.rating}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{info.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: QUESTION NUMBER SELECTOR (Que 1 - 7) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-amber-400" /> Step 2: Choose Question Number in {selectedDiv.toUpperCase()}
          </h3>
          <button
            onClick={() => setSelectedQueNumber('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedQueNumber === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Questions
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isSelected = selectedQueNumber === num;
            return (
              <button
                key={num}
                onClick={() => setSelectedQueNumber(num)}
                className={`py-3.5 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-amber-600 to-orange-600 border-amber-400 text-white shadow-lg shadow-amber-600/30 scale-105 font-bold ring-2 ring-amber-500/40'
                    : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
                }`}
              >
                <span className="text-sm font-mono">Que {num}</span>
                <span className="text-[10px] opacity-80 font-normal">
                  {num === 1 ? 'Problem A' :
                   num === 2 ? 'Problem B' :
                   num === 3 ? 'Problem C' :
                   num === 4 ? 'Problem D' :
                   num === 5 ? 'Problem E' :
                   num === 6 ? 'Problem F' : 'Problem G'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${selectedDiv.toUpperCase()} questions...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Difficulty filter buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all shrink-0 ${
                  selectedDifficulty.toLowerCase() === diff.toLowerCase()
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

        </div>

        {/* Active Stats */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>
            Showing <strong className="text-white">{filteredQuestions.length}</strong> problems for{' '}
            <strong className="text-amber-400">{selectedDiv.toUpperCase()}</strong>{' '}
            {selectedQueNumber !== 'all' && (
              <span>• <strong className="text-orange-400">Que {selectedQueNumber}</strong></span>
            )}
          </span>
          <span className="text-slate-500">START254 to START1 Contests</span>
        </div>
      </div>

      {/* QUESTION GRID */}
      {filteredQuestions.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
          <p className="text-base text-slate-300 font-semibold">No questions found matching your criteria.</p>
          <p className="text-xs text-slate-500">Try changing your search query or selecting "All Questions".</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
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
  );
}
