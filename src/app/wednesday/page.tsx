'use client';

import React, { useState } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import QuestionCard from '../../components/QuestionCard';
import { DivisionType } from '../../lib/types';
import { Zap, Layers, Search, Trophy, ListOrdered, Filter } from 'lucide-react';

export default function WednesdayPage() {
  const [sets] = useState(initialQuestionSets.filter(s => s.category === 'wednesday'));
  const [selectedDiv, setSelectedDiv] = useState<'div4' | 'div3' | 'div2' | 'div1'>('div4');
  const [selectedQueNumber, setSelectedQueNumber] = useState<number | 'all'>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allWednesdayQuestions = sets.flatMap(s => s.questions);

  const filteredQuestions = allWednesdayQuestions.filter(q => {
    const matchesDiv = q.division === selectedDiv;
    const matchesQue = selectedQueNumber === 'all' || q.position === selectedQueNumber || q.questionNumber === selectedQueNumber;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.contestTitle ? q.contestTitle.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDiv && matchesQue && matchesDifficulty && matchesSearch;
  });

  const divisionInfo = [
    {
      id: 'div4' as const,
      title: 'Division 4',
      rating: 'Rating 0 - 1399',
      badgeClass: 'gradient-badge-div4',
      desc: 'Beginners & Starters: Basic Arrays, Loops, Math & Implementation',
    },
    {
      id: 'div3' as const,
      title: 'Division 3',
      rating: 'Rating 1400 - 1599',
      badgeClass: 'gradient-badge-div3',
      desc: 'Intermediate: Constructive Algorithms, Bitwise Ops, Prefix Sums',
    },
    {
      id: 'div2' as const,
      title: 'Division 2',
      rating: 'Rating 1600 - 1999',
      badgeClass: 'gradient-badge-div2',
      desc: 'Advanced: Tree Algorithms, Binary Search, Modulo Arithmetic, DP',
    },
    {
      id: 'div1' as const,
      title: 'Division 1',
      rating: 'Rating 2000+',
      badgeClass: 'gradient-badge-div1',
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
            Select your division (**Div 4, Div 3, Div 2, Div 1**) and choose any **Question (Que 1 to Que 7)** to browse that exact question position across every single Starters contest.
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
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider ${info.badgeClass}`}>
                      {info.title}
                    </span>
                    {isSelected && <span className="text-[10px] text-orange-400 font-bold">SELECTED</span>}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">
                    {info.rating}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {info.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: QUESTION NUMBER SELECTOR (QUE 1 TO QUE 7) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-orange-400" /> Step 2: Select Question Tier for {selectedDiv.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-400">
              Click on Que 1, Que 2, etc. to see all corresponding questions of {selectedDiv.toUpperCase()} across all Starters contests (START254 to START1).
            </p>
          </div>

          <button
            onClick={() => setSelectedQueNumber('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedQueNumber === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All 7 Questions
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
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
                <span className="text-[10px] opacity-75 font-normal">
                  Problem {num}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH & DIFFICULTY FILTER */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Starters problems, codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
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
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff === 'all' ? 'All' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTIONS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-lg font-bold text-white">
            {selectedDiv.toUpperCase()} — {selectedQueNumber === 'all' ? 'All 7 Questions' : `Question ${selectedQueNumber}`} ({filteredQuestions.length} Found)
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            START254 down to START1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">No questions found matching your selected filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
