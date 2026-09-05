'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialQuestionSets } from '../lib/data-store';
import { Question, DivisionType } from '../lib/types';
import QuestionCard from '../components/QuestionCard';
import { 
  Calendar, 
  Zap, 
  Flame, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Search, 
  Sparkles, 
  Trophy,
  Filter,
  ArrowRight,
  ListOrdered
} from 'lucide-react';

export default function HomePage() {
  const [questionSets] = useState(initialQuestionSets);
  const [activeMainSection, setActiveMainSection] = useState<'monday' | 'wednesday'>('monday');
  
  // Monday state: Que 1 to Que 6 (or 'all')
  const [mondayQueNumber, setMondayQueNumber] = useState<number | 'all'>(1);
  
  // Wednesday state: Division (div4, div3, div2, div1) + Que 1 to Que 7 (or 'all')
  const [startersDivision, setStartersDivision] = useState<'div4' | 'div3' | 'div2' | 'div1'>('div4');
  const [startersQueNumber, setStartersQueNumber] = useState<number | 'all'>(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        const count = Object.values(parsed).filter((p: any) => p.status === 'completed').length;
        setSolvedCount(count);
      }
    } catch {
      // ignore
    }
  }, []);

  const allQuestions = questionSets.flatMap(s => s.questions);

  // Compute displayed questions based on active section
  let displayQuestions: Question[] = [];

  if (activeMainSection === 'monday') {
    const mondayQuestions = allQuestions.filter(q => q.category === 'monday');
    displayQuestions = mondayQuestions.filter(q => {
      const matchQue = mondayQueNumber === 'all' || q.position === mondayQueNumber || q.questionNumber === mondayQueNumber;
      const matchDiff = difficultyFilter === 'all' || q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      const matchSearch = searchQuery.trim() === '' || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.contestTitle ? q.contestTitle.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchQue && matchDiff && matchSearch;
    });
  } else {
    // Wednesday Starters
    const wednesdayQuestions = allQuestions.filter(q => q.category === 'wednesday' && q.division === startersDivision);
    displayQuestions = wednesdayQuestions.filter(q => {
      const matchQue = startersQueNumber === 'all' || q.position === startersQueNumber || q.questionNumber === startersQueNumber;
      const matchDiff = difficultyFilter === 'all' || q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      const matchSearch = searchQuery.trim() === '' || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.contestTitle ? q.contestTitle.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchQue && matchDiff && matchSearch;
    });
  }

  const divisionMeta = [
    { id: 'div4' as const, name: 'Div 4', rating: 'Rating 0 - 1399', badge: 'gradient-badge-div4' },
    { id: 'div3' as const, name: 'Div 3', rating: 'Rating 1400 - 1599', badge: 'gradient-badge-div3' },
    { id: 'div2' as const, name: 'Div 2', rating: 'Rating 1600 - 1999', badge: 'gradient-badge-div2' },
    { id: 'div1' as const, name: 'Div 1', rating: 'Rating 2000+', badge: 'gradient-badge-div1' },
  ];

  return (
    <div className="space-y-10">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800/80 p-8 sm:p-10 shadow-2xl bg-gradient-to-br from-slate-900/90 via-[#101524] to-[#0d111d]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>CodeChef Question Organizer • Question-by-Question Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Explore Every <span className="gradient-text">DSA Monday</span> &amp; <span className="text-amber-400">Starters (Div 1-4)</span> Problem
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Select a category, choose any <strong>Question Number (Que 1 to Que 7)</strong>, and get every corresponding problem across all weeks and contests in chronological order.
          </p>
        </div>
      </section>

      {/* TOP-LEVEL CATEGORY SELECTOR TABS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveMainSection('monday')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                activeMainSection === 'monday'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/25 scale-[1.02]'
                  : 'bg-[#121827] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>DSA MONDAY CONTESTS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-mono">
                Que 1 - 6
              </span>
            </button>

            <button
              onClick={() => setActiveMainSection('wednesday')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all ${
                activeMainSection === 'wednesday'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/25 scale-[1.02]'
                  : 'bg-[#121827] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>WEDNESDAY STARTERS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-mono">
                Div 1-4 • Que 1 - 7
              </span>
            </button>
          </div>

          <div className="ml-auto text-xs text-slate-400 font-mono">
            {displayQuestions.length} Problems Shown
          </div>
        </div>

        {/* SECTION SPECIFIC CONTROLS */}
        {activeMainSection === 'monday' ? (
          /* DSA MONDAY QUESTION SELECTOR */
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 bg-gradient-to-r from-orange-950/20 via-slate-900 to-[#121827]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  Select DSA Monday Question Tier (18 Weeks Available)
                </h3>
                <p className="text-xs text-slate-400">
                  Click on any Que # to see all {mondayQueNumber === 'all' ? 'questions' : `Question ${mondayQueNumber}s`} from Week 18 down to Week 1.
                </p>
              </div>

              {/* Reset to all */}
              <button
                onClick={() => setMondayQueNumber('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mondayQueNumber === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All 6 Questions
              </button>
            </div>

            {/* 6 Question Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const isSelected = mondayQueNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => setMondayQueNumber(num)}
                    className={`py-3.5 px-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-orange-600 to-amber-600 border-orange-400 text-white shadow-lg shadow-orange-600/30 scale-105 font-bold ring-2 ring-orange-500/40'
                        : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
                    }`}
                  >
                    <span className="text-sm font-mono tracking-tight">Que {num}</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      {num === 1 ? 'Arrays / Basics' :
                       num === 2 ? 'Two Pointers' :
                       num === 3 ? 'Binary Search' :
                       num === 4 ? 'Trees & Graphs' :
                       num === 5 ? 'Dynamic Prog.' : 'Segment Trees'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* WEDNESDAY STARTERS: DIVISION + QUESTION SELECTOR */
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 bg-gradient-to-r from-amber-950/20 via-slate-900 to-[#121827]">
            
            {/* 1. Division Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" /> Step 1: Select Division
                </h3>
                <span className="text-xs text-amber-400 font-mono">
                  Current: {startersDivision.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {divisionMeta.map((div) => {
                  const isSelected = startersDivision === div.id;
                  return (
                    <button
                      key={div.id}
                      onClick={() => setStartersDivision(div.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-orange-500 ring-2 ring-orange-500/30 shadow-md'
                          : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${div.badge}`}>
                          {div.name}
                        </span>
                        {isSelected && <span className="text-[10px] text-orange-400 font-bold">ACTIVE</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5">{div.rating}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Question Position Selector: Que 1 to Que 7 */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-orange-400" /> Step 2: Select Question Tier for {startersDivision.toUpperCase()} (START254 to START1)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Showing {startersQueNumber === 'all' ? 'all questions' : `Question ${startersQueNumber}s`} of {startersDivision.toUpperCase()} across all historical contests.
                  </p>
                </div>

                <button
                  onClick={() => setStartersQueNumber('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    startersQueNumber === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All 7 Questions
                </button>
              </div>

              {/* 7 Question Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const isSelected = startersQueNumber === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setStartersQueNumber(num)}
                      className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-amber-600 to-orange-600 border-amber-400 text-white shadow-lg shadow-amber-600/30 scale-105 font-bold ring-2 ring-amber-500/40'
                          : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
                      }`}
                    >
                      <span className="text-sm font-mono tracking-tight">Que {num}</span>
                      <span className="text-[10px] opacity-75 font-normal">
                        Problem {num}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, code (e.g. XLSL), tag (e.g. DP)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Difficulty:
          </span>
          {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                difficultyFilter === diff
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff === 'all' ? 'All' : diff}
            </button>
          ))}
        </div>
      </section>

      {/* QUESTION RESULTS FEED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {activeMainSection === 'monday' ? (
                <>
                  DSA Monday Contests — {mondayQueNumber === 'all' ? 'All Questions' : `Question ${mondayQueNumber}`}
                </>
              ) : (
                <>
                  Wednesday Starters — {startersDivision.toUpperCase()} — {startersQueNumber === 'all' ? 'All Questions' : `Question ${startersQueNumber}`}
                </>
              )}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono font-semibold">
              {displayQuestions.length} Available
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Sorted newest to oldest
          </span>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {displayQuestions.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No questions found matching your selected filters.</p>
          </div>
        )}
      </section>

    </div>
  );
}
