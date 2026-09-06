'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { initialQuestionSets } from '../lib/data-store';
import { Question } from '../lib/types';
import QuestionCard from '../components/QuestionCard';
import { 
  Calendar, 
  Zap, 
  Layers, 
  Search, 
  Sparkles, 
  ListOrdered,
  Filter,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const [activeMainSection, setActiveMainSection] = useState<'monday' | 'wednesday'>('monday');
  
  // Monday state: Que 1 to Que 6 (or 'all')
  const [mondayQueNumber, setMondayQueNumber] = useState<number | 'all'>(1);
  
  // Wednesday state: Division (div4, div3, div2, div1) + Que 1 to Que 7 (or 'all')
  const [startersDivision, setStartersDivision] = useState<'div4' | 'div3' | 'div2' | 'div1'>('div4');
  const [startersQueNumber, setStartersQueNumber] = useState<number | 'all'>(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [visibleCount, setVisibleCount] = useState(36);

  // Flatten all questions once
  const allQuestions = useMemo(() => {
    return initialQuestionSets.flatMap(s => s.questions);
  }, []);

  // Compute displayed questions based strictly on selected category, division, and question number
  const displayQuestions = useMemo(() => {
    let list: Question[] = [];

    if (activeMainSection === 'monday') {
      list = allQuestions.filter(q => {
        if (q.category !== 'monday') return false;
        
        // Strict Que filter: Must match exact position
        if (mondayQueNumber !== 'all' && q.position !== mondayQueNumber) {
          return false;
        }

        if (difficultyFilter !== 'all' && q.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
          return false;
        }

        if (searchQuery.trim() !== '') {
          const s = searchQuery.toLowerCase();
          const match = q.title.toLowerCase().includes(s) ||
            q.problemCode.toLowerCase().includes(s) ||
            (q.contestTitle ? q.contestTitle.toLowerCase().includes(s) : false) ||
            q.tags.some(t => t.toLowerCase().includes(s));
          if (!match) return false;
        }

        return true;
      });
    } else {
      // Wednesday Starters
      list = allQuestions.filter(q => {
        if (q.category !== 'wednesday') return false;
        if (q.division !== startersDivision) return false;

        // Strict Que filter: Must match exact position in that division
        if (startersQueNumber !== 'all' && q.position !== startersQueNumber) {
          return false;
        }

        if (difficultyFilter !== 'all' && q.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
          return false;
        }

        if (searchQuery.trim() !== '') {
          const s = searchQuery.toLowerCase();
          const match = q.title.toLowerCase().includes(s) ||
            q.problemCode.toLowerCase().includes(s) ||
            (q.contestTitle ? q.contestTitle.toLowerCase().includes(s) : false) ||
            q.tags.some(t => t.toLowerCase().includes(s));
          if (!match) return false;
        }

        return true;
      });
    }

    return list;
  }, [activeMainSection, mondayQueNumber, startersDivision, startersQueNumber, difficultyFilter, searchQuery, allQuestions]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(36);
  }, [activeMainSection, mondayQueNumber, startersDivision, startersQueNumber, difficultyFilter, searchQuery]);

  const paginatedQuestions = displayQuestions.slice(0, visibleCount);

  const divisionMeta = [
    { id: 'div4' as const, name: 'Div 4', rating: 'Rating 0 - 1399', badge: 'gradient-badge-div4', desc: 'Beginner & Implementation' },
    { id: 'div3' as const, name: 'Div 3', rating: 'Rating 1400 - 1599', badge: 'gradient-badge-div3', desc: 'Constructive & Bitwise' },
    { id: 'div2' as const, name: 'Div 2', rating: 'Rating 1600 - 1999', badge: 'gradient-badge-div2', desc: 'Trees, DP & Binary Search' },
    { id: 'div1' as const, name: 'Div 1', rating: 'Rating 2000+', badge: 'gradient-badge-div1', desc: 'Advanced DP, Flow & HLD' },
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
            <span>Complete Contest Archive • START254 down to START1 &amp; DSA Monday Weeks 18 to 1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Practice by <span className="gradient-text">Division</span> &amp; <span className="text-amber-400">Question Number</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Choose your division and question position (e.g. <strong>Div 4 Que 2</strong>) to get all corresponding problems from every single contest in reverse order with direct CodeChef compiler &amp; workspace links.
          </p>
        </div>
      </section>

      {/* TOP-LEVEL MAIN TABS */}
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
                Weeks 18 - 1 • Que 1-6
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
                START254 - START1 • Div 1-4 • Que 1-7
              </span>
            </button>
          </div>

          <div className="ml-auto text-xs text-slate-400 font-mono">
            {displayQuestions.length} Problems Found
          </div>
        </div>

        {/* SECTION CONTROLS */}
        {activeMainSection === 'monday' ? (
          /* DSA MONDAY QUESTION SELECTOR */
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 bg-gradient-to-r from-orange-950/20 via-slate-900 to-[#121827]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  Select Question Number for DSA Monday (Weeks 18 down to 1)
                </h3>
                <p className="text-xs text-slate-400">
                  Clicking <strong>Que {mondayQueNumber === 'all' ? '1-6' : mondayQueNumber}</strong> strictly shows only Question {mondayQueNumber === 'all' ? '1-6' : mondayQueNumber} from Week 18, Week 17, Week 16... down to Week 1.
                </p>
              </div>

              <button
                onClick={() => setMondayQueNumber('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                    <span className="text-base font-mono tracking-tight">Que {num}</span>
                    <span className="text-[10px] opacity-80 font-normal">
                      {num === 1 ? 'Arrays & Basics' :
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
            
            {/* Step 1: Division Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" /> Step 1: Select Division
                </h3>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  Active: {startersDivision.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {divisionMeta.map((div) => {
                  const isSelected = startersDivision === div.id;
                  return (
                    <button
                      key={div.id}
                      onClick={() => setStartersDivision(div.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-orange-500 ring-2 ring-orange-500/30 shadow-md scale-[1.02]'
                          : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${div.badge}`}>
                          {div.name}
                        </span>
                        {isSelected && <span className="text-[10px] text-orange-400 font-bold">ACTIVE</span>}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-2">{div.rating}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{div.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Question Number Selector (Que 1 to Que 7) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-orange-400" /> Step 2: Select Question Tier for {startersDivision.toUpperCase()}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Showing strictly <strong>Question {startersQueNumber === 'all' ? '1-7' : startersQueNumber}</strong> of {startersDivision.toUpperCase()} across all 254 Starters contests (START254 to START1).
                  </p>
                </div>

                <button
                  onClick={() => setStartersQueNumber('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
                      className={`py-3.5 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-amber-600 to-orange-600 border-amber-400 text-white shadow-lg shadow-amber-600/30 scale-105 font-bold ring-2 ring-amber-500/40'
                          : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
                      }`}
                    >
                      <span className="text-base font-mono tracking-tight">Que {num}</span>
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
            placeholder="Search by problem name, code (e.g. XLSL), contest..."
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
                  ? 'bg-orange-600 text-white shadow'
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
              {displayQuestions.length} Contests
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Showing {Math.min(visibleCount, displayQuestions.length)} of {displayQuestions.length}
          </span>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* Load More Button if more questions exist */}
        {visibleCount < displayQuestions.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 36)}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Load Next Contests ({displayQuestions.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {displayQuestions.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No questions found matching your selected filters.</p>
          </div>
        )}
      </section>

    </div>
  );
}
