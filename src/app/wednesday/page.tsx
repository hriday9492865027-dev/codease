'use client';

import React, { useState } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import ContestCard from '../../components/ContestCard';
import QuestionCard from '../../components/QuestionCard';
import { DivisionType } from '../../lib/types';
import { Zap, Layers, Search, Trophy } from 'lucide-react';

export default function WednesdayPage() {
  const [sets] = useState(initialQuestionSets.filter(s => s.category === 'wednesday'));
  const [selectedDiv, setSelectedDiv] = useState<DivisionType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allWednesdayQuestions = sets.flatMap(s => s.questions);

  const filteredQuestions = allWednesdayQuestions.filter(q => {
    const matchesDiv = selectedDiv === 'all' || q.division === selectedDiv;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDiv && matchesDifficulty && matchesSearch;
  });

  const divisionInfo = [
    {
      id: 'div1' as const,
      title: 'Division 1',
      rating: 'Rating 2000+',
      color: 'purple',
      badgeClass: 'gradient-badge-div1',
      desc: 'Grandmasters & Experts: Advanced DP, Segment Trees, Flow, Heavy Graphs',
    },
    {
      id: 'div2' as const,
      title: 'Division 2',
      rating: 'Rating 1600 - 1999',
      color: 'blue',
      badgeClass: 'gradient-badge-div2',
      desc: 'Advanced: Tree Algorithms, Binary Search, Modulo Arithmetic, Greedy',
    },
    {
      id: 'div3' as const,
      title: 'Division 3',
      rating: 'Rating 1400 - 1599',
      color: 'emerald',
      badgeClass: 'gradient-badge-div3',
      desc: 'Intermediate: Constructive Algorithms, Bitwise Ops, Prefix Sums, Sorting',
    },
    {
      id: 'div4' as const,
      title: 'Division 4',
      rating: 'Rating 0 - 1399',
      color: 'amber',
      badgeClass: 'gradient-badge-div4',
      desc: 'Beginners & Starters: Basic Arrays, Loops, Math, Logic & Implementation',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Every Wednesday 8:00 PM IST</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            CodeChef <span className="gradient-text">Wednesday Starters</span> Arena
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Direct problem links &amp; rankings for every Division (**Div 1, Div 2, Div 3, Div 4**). Practice recent contest problem sets with verified solution links.
          </p>
        </div>
      </div>

      {/* DIVISION HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {divisionInfo.map((info) => {
          const isSelected = selectedDiv === info.id;
          const count = allWednesdayQuestions.filter(q => q.division === info.id).length;

          return (
            <button
              key={info.id}
              onClick={() => setSelectedDiv(isSelected ? 'all' : info.id)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-orange-500 ring-2 ring-orange-500/30 shadow-lg'
                  : 'bg-[#121827] border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider ${info.badgeClass}`}>
                    {info.title}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {count} Problems
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {info.rating}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {info.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-orange-400 font-semibold">
                <span>{isSelected ? '✓ Filtering' : 'Filter by ' + info.title}</span>
                <Trophy className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Starters problems, codes, Div..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Division:
            </span>
            {(['all', 'div1', 'div2', 'div3', 'div4'] as DivisionType[]).map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDiv(div)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDiv === div
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                }`}
              >
                {div === 'all' ? 'All Divisions' : div.toUpperCase()}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Starters Contest Sets */}
      {selectedDiv !== 'all' || searchQuery.trim() !== '' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Showing Questions ({filteredQuestions.length})
            </h2>
            <button
              onClick={() => {
                setSelectedDiv('all');
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
        </div>
      ) : (
        <div className="space-y-8">
          {sets.map((set) => (
            <ContestCard key={set.id} questionSet={set} initialDivision="all" showAllDivisionsByDefault={true} />
          ))}
        </div>
      )}

    </div>
  );
}
