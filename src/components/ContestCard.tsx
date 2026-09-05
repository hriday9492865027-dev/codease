'use client';

import React, { useState } from 'react';
import { QuestionSet, DivisionType } from '../lib/types';
import QuestionCard from './QuestionCard';
import { Calendar, Zap, ExternalLink, Layers } from 'lucide-react';

interface ContestCardProps {
  questionSet: QuestionSet;
  initialDivision?: DivisionType;
  showAllDivisionsByDefault?: boolean;
}

export default function ContestCard({ questionSet, initialDivision = 'all', showAllDivisionsByDefault = false }: ContestCardProps) {
  const [activeDiv, setActiveDiv] = useState<DivisionType>(initialDivision);

  const isWednesday = questionSet.category === 'wednesday';

  const filteredQuestions = questionSet.questions.filter((q) => {
    if (activeDiv === 'all') return true;
    return q.division === activeDiv;
  });

  return (
    <div className="rounded-2xl bg-[#121827] border border-slate-800 p-6 shadow-xl space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isWednesday
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            }`}>
              {isWednesday ? <Zap className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
              {isWednesday ? 'Wednesday Starters' : 'Monday DSA'}
            </span>

            {questionSet.contestCode && (
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {questionSet.contestCode}
              </span>
            )}

            <span className="text-xs text-slate-400 font-medium">
              📅 {questionSet.eventDate}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            {questionSet.title}
          </h3>

          {questionSet.description && (
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {questionSet.description}
            </p>
          )}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={questionSet.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:border-slate-600"
          >
            <span>CodeChef Arena</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Division Selector Tabs for Wednesday Starters */}
      {isWednesday && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Filter Division:
          </span>
          {(['all', 'div1', 'div2', 'div3', 'div4'] as DivisionType[]).map((div) => {
            const count = div === 'all' 
              ? questionSet.questions.length 
              : questionSet.questions.filter(q => q.division === div).length;

            return (
              <button
                key={div}
                onClick={() => setActiveDiv(div)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDiv === div
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                {div === 'all' ? 'All Divisions' : div.toUpperCase()} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          No questions found for the selected division in this set.
        </div>
      )}

    </div>
  );
}
