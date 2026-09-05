'use client';

import React, { useState, useEffect } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import { UserProgress } from '../../lib/types';
import QuestionCard from '../../components/QuestionCard';
import { 
  Flame, 
  CheckCircle2, 
  CircleDot, 
  Calendar, 
  Zap, 
  Trophy, 
  TrendingUp
} from 'lucide-react';

export default function DashboardPage() {
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  const allQuestions = initialQuestionSets.flatMap(s => s.questions);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      if (stored) {
        setProgressMap(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const solvedQuestions = allQuestions.filter(q => progressMap[q.id]?.status === 'completed');
  const attemptingQuestions = allQuestions.filter(q => progressMap[q.id]?.status === 'attempting');

  // Difficulty counts
  const easySolved = solvedQuestions.filter(q => q.difficulty === 'Easy').length;
  const easyTotal = allQuestions.filter(q => q.difficulty === 'Easy').length;

  const mediumSolved = solvedQuestions.filter(q => q.difficulty === 'Medium').length;
  const mediumTotal = allQuestions.filter(q => q.difficulty === 'Medium').length;

  const hardSolved = solvedQuestions.filter(q => q.difficulty === 'Hard').length;
  const hardTotal = allQuestions.filter(q => q.difficulty === 'Hard').length;

  // Monday vs Wednesday
  const mondaySolved = solvedQuestions.filter(q => q.category === 'monday').length;
  const mondayTotal = allQuestions.filter(q => q.category === 'monday').length;

  const wednesdaySolved = solvedQuestions.filter(q => q.category === 'wednesday').length;
  const wednesdayTotal = allQuestions.filter(q => q.category === 'wednesday').length;

  const totalPercentage = allQuestions.length > 0 ? Math.round((solvedQuestions.length / allQuestions.length) * 100) : 0;

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-orange-950/40 via-slate-900 to-[#121827] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Personal Coding Performance</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Student <span className="gradient-text">Progress &amp; Streak Hub</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Track your weekly CodeChef practice consistency, analyze difficulty mastery, and review solved problems.
          </p>
        </div>

        {/* Big Streak Badge */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-600/20 to-amber-600/10 border border-orange-500/30 flex items-center gap-4 shrink-0 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Flame className="w-8 h-8 text-white fill-white animate-pulse" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">5 Days</div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Active Streak 🔥</div>
          </div>
        </div>
      </div>

      {/* STREAK & WEEKLY CALENDAR */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" /> Weekly Activity Streak
          </h3>
          <span className="text-xs text-slate-400 font-mono">Current Week</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {daysOfWeek.map((day, idx) => {
            const isCompleted = idx < 5; // Monday to Friday active
            return (
              <div 
                key={day} 
                className={`p-3 sm:p-4 rounded-xl text-center border transition-all ${
                  isCompleted 
                    ? 'bg-orange-500/15 border-orange-500/40 text-white' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-400 mb-1">{day}</div>
                <div className="flex justify-center">
                  {isCompleted ? (
                    <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-bounce" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-dashed border-slate-700"></div>
                  )}
                </div>
                <div className="text-[10px] font-mono mt-1 text-slate-400">
                  {isCompleted ? 'Done' : 'Rest'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* METRICS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Solved Questions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {solvedQuestions.length} <span className="text-sm font-normal text-slate-400">/ {allQuestions.length}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${totalPercentage}%` }}
            ></div>
          </div>
          <div className="text-[11px] text-slate-400">{totalPercentage}% overall completion</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>In Progress</span>
            <CircleDot className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {attemptingQuestions.length}
          </div>
          <p className="text-[11px] text-slate-400">Problems currently being solved</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Monday DSA Solved</span>
            <Calendar className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {mondaySolved} <span className="text-sm font-normal text-slate-400">/ {mondayTotal}</span>
          </div>
          <p className="text-[11px] text-slate-400">Curated weekly DSA sets</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
            <span>Wednesday Starters</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {wednesdaySolved} <span className="text-sm font-normal text-slate-400">/ {wednesdayTotal}</span>
          </div>
          <p className="text-[11px] text-slate-400">Contest division questions</p>
        </div>

      </div>

      {/* DIFFICULTY BREAKDOWN PROGRESS */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-400" /> Difficulty Mastery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Easy */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Easy</span>
              <span className="text-xs font-mono text-slate-300">{easySolved} / {easyTotal}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Medium */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Medium</span>
              <span className="text-xs font-mono text-slate-300">{mediumSolved} / {mediumTotal}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Hard */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Hard</span>
              <span className="text-xs font-mono text-slate-300">{hardSolved} / {hardTotal}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-rose-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>

      {/* CURRENTLY ATTEMPTING & RECENTLY SOLVED QUESTIONS */}
      {attemptingQuestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-amber-400" /> In Progress Problems ({attemptingQuestions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attemptingQuestions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>
      )}

      {solvedQuestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Solved Problems ({solvedQuestions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solvedQuestions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
