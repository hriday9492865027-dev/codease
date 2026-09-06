'use client';

import React, { useState, useMemo } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import QuestionCard from '../../components/QuestionCard';
import { Zap, Layers, Search, Trophy, Calendar, Sparkles, ChevronRight, Check } from 'lucide-react';

export default function WednesdayPage() {
  const startersSets = useMemo(() => {
    return initialQuestionSets.filter(s => s.category === 'wednesday');
  }, []);

  // Step 1: Selected Contest (defaults to latest, e.g. START254 or START176)
  const [selectedContestCode, setSelectedContestCode] = useState<string>(
    startersSets[0]?.contestCode || 'START254'
  );

  // Contest search query to filter contest list
  const [contestSearch, setContestSearch] = useState('');

  // Step 2: Selected Division (div4, div3, div2, div1, all)
  const [selectedDiv, setSelectedDiv] = useState<'div4' | 'div3' | 'div2' | 'div1' | 'all'>('div4');

  // Filtered contests for selector
  const visibleContests = useMemo(() => {
    if (!contestSearch.trim()) return startersSets;
    const q = contestSearch.toLowerCase().trim();
    return startersSets.filter(s => 
      s.title.toLowerCase().includes(q) || 
      (s.contestCode && s.contestCode.toLowerCase().includes(q))
    );
  }, [startersSets, contestSearch]);

  // Current active contest set
  const activeSet = useMemo(() => {
    return startersSets.find(s => s.contestCode === selectedContestCode) || startersSets[0];
  }, [startersSets, selectedContestCode]);

  // Step 3: Questions of the selected contest for the selected division
  const activeQuestions = useMemo(() => {
    if (!activeSet) return [];
    if (selectedDiv === 'all') return activeSet.questions;
    return activeSet.questions.filter(q => q.division === selectedDiv);
  }, [activeSet, selectedDiv]);

  const divisionInfo = [
    {
      id: 'div4' as const,
      title: 'Division 4',
      rating: 'Rating 0 - 1399',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      activeBg: 'from-emerald-950/60 to-slate-900 border-emerald-500 shadow-emerald-500/10',
      desc: 'Beginners: Basic Arrays, Loops, Math & Implementation',
    },
    {
      id: 'div3' as const,
      title: 'Division 3',
      rating: 'Rating 1400 - 1599',
      badgeClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      activeBg: 'from-blue-950/60 to-slate-900 border-blue-500 shadow-blue-500/10',
      desc: 'Intermediate: Constructive Algorithms, Bitwise Ops, Prefix Sums',
    },
    {
      id: 'div2' as const,
      title: 'Division 2',
      rating: 'Rating 1600 - 1999',
      badgeClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
      activeBg: 'from-purple-950/60 to-slate-900 border-purple-500 shadow-purple-500/10',
      desc: 'Advanced: Trees, Binary Search, Modulo Arithmetic, DP',
    },
    {
      id: 'div1' as const,
      title: 'Division 1',
      rating: 'Rating 2000+',
      badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      activeBg: 'from-amber-950/60 to-slate-900 border-amber-500 shadow-amber-500/10',
      desc: 'Grandmasters: Advanced DP, Segment Trees, Flow, HLD',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Wednesday Starters • START254 to START1 Contests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">Wednesday Starters</span> Arena
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Select any weekly contest (from <strong>START254 down to START001</strong>), choose your <strong>Division (Div 4, 3, 2, 1)</strong>, and get all the exact questions for that division to solve directly on CodeChef.
          </p>
        </div>
      </div>

      {/* STEP 1: SELECT CONTEST WEEK */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Step 1: Select Starters Contest Week</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Currently selected: <strong className="text-amber-400">{activeSet?.title || selectedContestCode}</strong>
            </p>
          </div>

          {/* Quick Search for Contest */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contest (e.g. 176, 100, 1)..."
              value={contestSearch}
              onChange={(e) => setContestSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Contest Chips Grid / Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {visibleContests.slice(0, 80).map((set) => {
            const isSelected = selectedContestCode === set.contestCode;
            return (
              <button
                key={set.id}
                onClick={() => setSelectedContestCode(set.contestCode || 'START254')}
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

        {visibleContests.length > 80 && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Showing top 80 matching contests. Use the search bar above to find any contest from START254 to START1.</span>
            <span>{startersSets.length} Total Contests Available</span>
          </div>
        )}
      </div>

      {/* STEP 2: SELECT DIVISION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Step 2: Select Division for {selectedContestCode}</span>
          </h3>

          <button
            onClick={() => setSelectedDiv('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedDiv === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Show All Divisions
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionInfo.map((info) => {
            const isSelected = selectedDiv === info.id;
            return (
              <button
                key={info.id}
                onClick={() => setSelectedDiv(info.id)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-br ${info.activeBg} ring-2 ring-amber-500/40 shadow-xl`
                    : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">{info.title}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase font-bold ${info.badgeClass}`}>
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

      {/* STEP 3: QUESTIONS OF SELECTED DIVISION & CONTEST */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>{activeSet?.title}</span>
              <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20 uppercase">
                {selectedDiv === 'all' ? 'All Divisions' : selectedDiv.toUpperCase()}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing {activeQuestions.length} questions for {selectedDiv === 'all' ? 'all divisions' : selectedDiv.toUpperCase()}
            </p>
          </div>

          <a
            href={activeSet?.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-amber-400 font-mono flex items-center gap-1 underline"
          >
            <span>View Contest Page on CodeChef</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {activeQuestions.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 space-y-2">
            <p className="text-sm text-slate-300 font-semibold">No questions found for this selection.</p>
            <p className="text-xs text-slate-500">Try selecting a different division or contest week.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
