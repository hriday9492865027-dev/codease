'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialQuestionSets } from '../lib/data-store';
import ContestCard from '../components/ContestCard';
import QuestionCard from '../components/QuestionCard';
import { 
  Calendar, 
  Zap, 
  Flame, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Code2
} from 'lucide-react';

export default function HomePage() {
  const [questionSets, setQuestionSets] = useState(initialQuestionSets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiv, setSelectedDiv] = useState<'all' | 'div1' | 'div2' | 'div3' | 'div4'>('all');
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

  const latestMonday = questionSets.find(s => s.category === 'monday');
  const latestWednesday = questionSets.find(s => s.category === 'wednesday');

  // Search filtered questions across all sets
  const allQuestions = questionSets.flatMap(s => s.questions);
  const searchResults = searchQuery.trim() === '' ? [] : allQuestions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.problemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    q.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      
      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800/80 p-8 sm:p-12 shadow-2xl bg-gradient-to-br from-slate-900/90 via-[#101524] to-[#0d111d]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Weekly CodeChef Problem Hub • Automated Sync</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Master Every <span className="gradient-text">Monday DSA</span> &amp; <span className="text-amber-400">Wednesday Starters</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Direct problem links, difficulty ratings, division filters (<strong className="text-purple-400">Div 1</strong>, <strong className="text-blue-400">Div 2</strong>, <strong className="text-emerald-400">Div 3</strong>, <strong className="text-amber-400">Div 4</strong>), and automated progress tracking in one place.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/wednesday"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Wednesday Starters (Div 1-4)</span>
            </Link>

            <Link
              href="/monday"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all hover:border-slate-600"
            >
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Monday DSA Challenges</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>My Progress ({solvedCount} Solved)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">Monday DSA</div>
            <div className="text-xs text-slate-400">Weekly Curated Topics</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">Wednesday</div>
            <div className="text-xs text-slate-400">Starters Contests</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">4 Divisions</div>
            <div className="text-xs text-slate-400">Div 1, 2, 3 &amp; 4 Sorted</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{solvedCount} Solved</div>
            <div className="text-xs text-slate-400">Tracked in Your Session</div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH & FILTER BAR */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem name, code (e.g. XLSL), tag (e.g. DP, Trees)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Div Filter:</span>
            {(['all', 'div1', 'div2', 'div3', 'div4'] as const).map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDiv(div)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDiv === div
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {div === 'all' ? 'All' : div.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results if searching */}
        {searchQuery.trim() !== '' && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-300">
                Search Results ({searchResults.length})
              </h3>
              <button onClick={() => setSearchQuery('')} className="text-xs text-orange-400 hover:underline">
                Clear search
              </button>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">No questions matching "{searchQuery}".</p>
            )}
          </div>
        )}
      </section>

      {/* LATEST WEDNESDAY STARTERS CONTEST */}
      {latestWednesday && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Latest Wednesday Starters</h2>
            </div>
            <Link 
              href="/wednesday" 
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
            >
              <span>View All Starters</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ContestCard questionSet={latestWednesday} initialDivision={selectedDiv} />
        </section>
      )}

      {/* LATEST MONDAY DSA CHALLENGE */}
      {latestMonday && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Latest Monday DSA Challenge</h2>
            </div>
            <Link 
              href="/monday" 
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
            >
              <span>View All Monday Sets</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ContestCard questionSet={latestMonday} />
        </section>
      )}

      {/* AUTOMATION SYNC STATUS BANNER */}
      <section className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Automated CodeChef Sync Engine</h4>
            <p className="text-xs text-slate-400">
              Auto-checks for every new Monday DSA set and Wednesday Starters (Div 1–4) without manual updates.
            </p>
          </div>
        </div>

        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all shrink-0"
        >
          Manage Sync &amp; Credentials
        </Link>
      </section>

    </div>
  );
}
