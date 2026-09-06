'use client';

import React, { useState, useMemo } from 'react';
import { initialQuestionSets } from '../lib/data-store';
import { Question } from '../lib/types';
import QuestionCard from '../components/QuestionCard';
import { 
  Calendar, 
  Zap, 
  Layers, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';

export default function HomePage() {
  const [activeMainSection, setActiveMainSection] = useState<'wednesday' | 'monday'>('wednesday');
  
  const mondaySets = useMemo(() => {
    return initialQuestionSets.filter(s => s.category === 'monday');
  }, []);

  const startersSets = useMemo(() => {
    return initialQuestionSets.filter(s => s.category === 'wednesday');
  }, []);

  // WEDNESDAY STARTERS STATE
  const [selectedStartersCode, setSelectedStartersCode] = useState<string>(
    startersSets[0]?.contestCode || 'START254'
  );
  const [startersSearch, setStartersSearch] = useState<string>('');
  const [startersDivision, setStartersDivision] = useState<'div4' | 'div3' | 'div2' | 'div1' | 'all'>('div4');

  // MONDAY DSA STATE
  const [selectedMondayWeek, setSelectedMondayWeek] = useState<number>(18);
  const [mondaySearch, setMondaySearch] = useState<string>('');

  // Visible Starters Contests based on search
  const visibleStartersSets = useMemo(() => {
    if (!startersSearch.trim()) return startersSets;
    const q = startersSearch.toLowerCase().trim();
    return startersSets.filter(s => 
      s.title.toLowerCase().includes(q) || 
      (s.contestCode && s.contestCode.toLowerCase().includes(q))
    );
  }, [startersSets, startersSearch]);

  // Active Starters Contest Object
  const activeStartersSet = useMemo(() => {
    return startersSets.find(s => s.contestCode === selectedStartersCode) || startersSets[0];
  }, [startersSets, selectedStartersCode]);

  // Active Starters Questions for Selected Division
  const startersDisplayQuestions = useMemo(() => {
    if (!activeStartersSet) return [];
    if (startersDivision === 'all') return activeStartersSet.questions;
    return activeStartersSet.questions.filter(q => q.division === startersDivision);
  }, [activeStartersSet, startersDivision]);

  // Active Monday Contest Object
  const activeMondaySet = useMemo(() => {
    return mondaySets.find(s => s.weekNumber === selectedMondayWeek) || mondaySets[0];
  }, [mondaySets, selectedMondayWeek]);

  // Active Monday Questions
  const mondayDisplayQuestions = useMemo(() => {
    if (!activeMondaySet) return [];
    if (!mondaySearch.trim()) return activeMondaySet.questions;
    const q = mondaySearch.toLowerCase();
    return activeMondaySet.questions.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.problemCode.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [activeMondaySet, mondaySearch]);

  const divisionMeta = [
    { 
      id: 'div4' as const, 
      name: 'Division 4', 
      rating: 'Rating 0 - 1399', 
      badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      activeBg: 'from-emerald-950/60 to-slate-900 border-emerald-500 shadow-emerald-500/10',
      desc: 'Beginners & Starters: Basic Arrays, Loops, Math & Implementation' 
    },
    { 
      id: 'div3' as const, 
      name: 'Division 3', 
      rating: 'Rating 1400 - 1599', 
      badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      activeBg: 'from-blue-950/60 to-slate-900 border-blue-500 shadow-blue-500/10',
      desc: 'Intermediate: Constructive Algorithms, Bitwise Ops, Prefix Sums' 
    },
    { 
      id: 'div2' as const, 
      name: 'Division 2', 
      rating: 'Rating 1600 - 1999', 
      badge: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
      activeBg: 'from-purple-950/60 to-slate-900 border-purple-500 shadow-purple-500/10',
      desc: 'Advanced: Trees, Binary Search, Modulo Arithmetic, DP' 
    },
    { 
      id: 'div1' as const, 
      name: 'Division 1', 
      rating: 'Rating 2000+', 
      badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      activeBg: 'from-amber-950/60 to-slate-900 border-amber-500 shadow-amber-500/10',
      desc: 'Grandmasters: Advanced DP, Segment Trees, Flow, HLD' 
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800/80 p-8 sm:p-10 shadow-2xl bg-gradient-to-br from-slate-900/90 via-[#101524] to-[#0d111d]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Complete Contest Library • START254 to START1 &amp; DSA Monday</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            CodeChef <span className="gradient-text">Weekly Arena</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Select <strong>Wednesday Starters</strong> or <strong>DSA Monday</strong>, choose your contest week, pick your division (<strong>Div 4, 3, 2, 1</strong>), and solve authentic problems directly on CodeChef.
          </p>
        </div>
      </section>

      {/* TOP TOGGLE: WEDNESDAY STARTERS vs MONDAY DSA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveMainSection('wednesday')}
          className={`w-full sm:w-1/2 p-4 rounded-2xl border text-center transition-all flex items-center justify-center gap-3 ${
            activeMainSection === 'wednesday'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400 text-white shadow-xl shadow-amber-600/20 ring-2 ring-amber-400/40 font-bold scale-[1.02]'
              : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
          }`}
        >
          <Zap className="w-5 h-5 text-amber-300" />
          <div className="text-left">
            <div className="text-sm font-bold">Wednesday Starters</div>
            <div className="text-[11px] opacity-80">START254 down to START001</div>
          </div>
        </button>

        <button
          onClick={() => setActiveMainSection('monday')}
          className={`w-full sm:w-1/2 p-4 rounded-2xl border text-center transition-all flex items-center justify-center gap-3 ${
            activeMainSection === 'monday'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 border-orange-400 text-white shadow-xl shadow-orange-600/20 ring-2 ring-orange-400/40 font-bold scale-[1.02]'
              : 'bg-[#121827] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 font-semibold'
          }`}
        >
          <Calendar className="w-5 h-5 text-orange-300" />
          <div className="text-left">
            <div className="text-sm font-bold">DSA Monday Challenges</div>
            <div className="text-[11px] opacity-80">Weeks 18 down to Week 1</div>
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* WEDNESDAY STARTERS FLOW: Step 1 (Contest) -> Step 2 (Div) -> Questions    */}
      {/* ========================================================================= */}
      {activeMainSection === 'wednesday' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* STEP 1: CONTEST WEEK SELECTOR */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Step 1: Select Starters Contest Week (START254 to START1)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Currently active: <strong className="text-amber-400">{activeStartersSet?.title || selectedStartersCode}</strong>
                </p>
              </div>

              {/* Contest Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search contest (e.g. 176, 254, 100)..."
                  value={startersSearch}
                  onChange={(e) => setStartersSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Contest Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {visibleStartersSets.slice(0, 80).map((set) => {
                const isSelected = selectedStartersCode === set.contestCode;
                return (
                  <button
                    key={set.id}
                    onClick={() => setSelectedStartersCode(set.contestCode || 'START254')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/30 ring-2 ring-amber-400/50 scale-105'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span>{set.contestCode}</span>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>

            {visibleStartersSets.length > 80 && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Showing top 80 contests. Type in the search box to find any specific contest.</span>
                <span>{startersSets.length} Total Contests</span>
              </div>
            )}
          </div>

          {/* STEP 2: DIVISION SELECTOR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Step 2: Select Division for {selectedStartersCode}</span>
              </h3>

              <button
                onClick={() => setStartersDivision('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  startersDivision === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Divisions
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {divisionMeta.map((info) => {
                const isSelected = startersDivision === info.id;
                return (
                  <button
                    key={info.id}
                    onClick={() => setStartersDivision(info.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? `bg-gradient-to-br ${info.activeBg} ring-2 ring-amber-500/40 shadow-xl`
                        : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-white">{info.name}</span>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase font-bold ${info.badge}`}>
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

          {/* STEP 3: QUESTIONS GRID */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{activeStartersSet?.title}</span>
                  <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20 uppercase">
                    {startersDivision === 'all' ? 'All Divisions' : startersDivision.toUpperCase()}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Showing {startersDisplayQuestions.length} questions for {startersDivision === 'all' ? 'all divisions' : startersDivision.toUpperCase()}
                </p>
              </div>

              <a
                href={activeStartersSet?.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-amber-400 font-mono flex items-center gap-1 underline"
              >
                <span>View Contest Page on CodeChef</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {startersDisplayQuestions.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
                <p className="text-sm text-slate-400">No questions found for this selection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {startersDisplayQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MONDAY DSA FLOW: Select Week -> View 6 Questions                          */}
      {/* ========================================================================= */}
      {activeMainSection === 'monday' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Week Selector */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>Select DSA Monday Contest Week (Week 18 to Week 1)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Currently active: <strong className="text-orange-400">Week {selectedMondayWeek} Challenge</strong>
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Monday problems, topics..."
                  value={mondaySearch}
                  onChange={(e) => setMondaySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Week Chips */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2.5">
              {mondaySets.map((set) => {
                const isSelected = selectedMondayWeek === set.weekNumber;
                return (
                  <button
                    key={set.id}
                    onClick={() => setSelectedMondayWeek(set.weekNumber || 18)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-orange-400/50 scale-105'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    Week {set.weekNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Monday Questions Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{activeMondaySet?.title}</span>
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    6 Curated Tiers
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  All 6 algorithmic problems for Week {selectedMondayWeek}
                </p>
              </div>

              <a
                href={activeMondaySet?.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-orange-400 font-mono flex items-center gap-1 underline"
              >
                <span>View Week {selectedMondayWeek} on CodeChef</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {mondayDisplayQuestions.length === 0 ? (
              <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
                <p className="text-sm text-slate-400">No Monday DSA questions match your filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {mondayDisplayQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
