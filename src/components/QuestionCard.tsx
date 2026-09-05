'use client';

import React, { useState, useEffect } from 'react';
import { Question, SolveStatus } from '../lib/types';
import { getDifficultyColor, getDivisionColor } from '../lib/utils';
import { 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  CircleDot, 
  Circle, 
  BookOpen, 
  Users, 
  Tag
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onStatusChange?: (questionId: string, status: SolveStatus) => void;
  onBookmarkToggle?: (questionId: string, isBookmarked: boolean) => void;
}

export default function QuestionCard({ question, onStatusChange, onBookmarkToggle }: QuestionCardProps) {
  const [status, setStatus] = useState<SolveStatus>('not_started');
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[question.id]) {
          setStatus(parsed[question.id].status || 'not_started');
          setBookmarked(!!parsed[question.id].bookmarked);
        }
      }
    } catch {
      // ignore
    }
  }, [question.id]);

  const handleStatusChange = (newStatus: SolveStatus) => {
    setStatus(newStatus);
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[question.id] = {
        ...(parsed[question.id] || {}),
        questionId: question.id,
        status: newStatus,
        bookmarked,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('codechef_hub_progress', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
    if (onStatusChange) onStatusChange(question.id, newStatus);
  };

  const handleBookmarkToggle = () => {
    const nextState = !bookmarked;
    setBookmarked(nextState);
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[question.id] = {
        ...(parsed[question.id] || {}),
        questionId: question.id,
        status,
        bookmarked: nextState,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('codechef_hub_progress', JSON.stringify(parsed));
    } catch (e) {
      console.error(e);
    }
    if (onBookmarkToggle) onBookmarkToggle(question.id, nextState);
  };

  const diffColors = getDifficultyColor(question.difficulty);

  return (
    <div className={`rounded-xl border transition-all duration-200 p-5 ${
      status === 'completed'
        ? 'bg-slate-900/60 border-emerald-500/30'
        : status === 'attempting'
        ? 'bg-slate-900/60 border-amber-500/30'
        : 'bg-[#121827] border-slate-800 hover:border-slate-700'
    } glass-panel-hover flex flex-col justify-between`}>
      
      {/* Card Header: Meta Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Division Badge if available */}
            {question.division && question.division !== 'all' && (
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                question.division === 'div1' ? 'gradient-badge-div1' :
                question.division === 'div2' ? 'gradient-badge-div2' :
                question.division === 'div3' ? 'gradient-badge-div3' : 'gradient-badge-div4'
              }`}>
                {question.division.toUpperCase()}
              </span>
            )}

            {/* Difficulty Badge */}
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${diffColors.bg} ${diffColors.text} ${diffColors.border}`}>
              {question.difficulty} {question.rating ? `(${question.rating})` : ''}
            </span>

            {/* Problem Code Badge */}
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {question.problemCode}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkToggle}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked
                ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-orange-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
          {question.title}
        </h4>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {question.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {/* Statistics if available */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          {question.successfulSubmissions ? (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {Number(question.successfulSubmissions).toLocaleString()} solves
            </span>
          ) : (
            <span className="font-mono text-slate-500">100 Points</span>
          )}

          {question.accuracy && (
            <span className="font-mono text-slate-400">
              {question.accuracy}% accuracy
            </span>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Status selector buttons */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleStatusChange('not_started')}
              className={`p-1.5 rounded text-xs transition-colors ${
                status === 'not_started' 
                  ? 'bg-slate-700 text-slate-200 font-semibold' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Not Started"
            >
              <Circle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleStatusChange('attempting')}
              className={`p-1.5 rounded text-xs transition-colors ${
                status === 'attempting' 
                  ? 'bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Attempting"
            >
              <CircleDot className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`p-1.5 rounded text-xs transition-colors ${
                status === 'completed' 
                  ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Completed / Solved"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          {/* External Links */}
          <div className="flex items-center gap-2">
            {question.editorialUrl && (
              <a
                href={question.editorialUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="View Editorial / Discussion"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={question.problemUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Solve</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
