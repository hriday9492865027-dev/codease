'use client';

import React, { useState, useEffect } from 'react';
import { initialQuestionSets } from '../../lib/data-store';
import { UserProgress } from '../../lib/types';
import QuestionCard from '../../components/QuestionCard';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const allQuestions = initialQuestionSets.flatMap(s => s.questions);

  const loadBookmarks = () => {
    try {
      const stored = localStorage.getItem('codechef_hub_progress');
      if (stored) {
        const parsed: Record<string, UserProgress> = JSON.parse(stored);
        const ids = Object.entries(parsed)
          .filter(([_, val]) => val.bookmarked)
          .map(([id]) => id);
        setBookmarkedIds(ids);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const bookmarkedQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-2xl glass-panel border border-slate-800 p-8 bg-gradient-to-r from-orange-950/40 via-slate-900 to-[#121827]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 fill-orange-400" />
            <span>Saved Problem Library</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Bookmarked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Keep challenging problems, high-yield patterns, and editorial-worthy questions saved for revision and interview prep.
          </p>
        </div>
      </div>

      {/* Questions list */}
      {bookmarkedQuestions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Saved Problems ({bookmarkedQuestions.length})
            </h2>
            <span className="text-xs text-slate-400">Click bookmark icon on any card to remove</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedQuestions.map((q) => (
              <QuestionCard 
                key={q.id} 
                question={q} 
                onBookmarkToggle={() => loadBookmarks()}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Bookmarked Questions Yet</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            While exploring Monday DSA or Wednesday Starters questions, click the bookmark ribbon icon on any card to save it here for quick access.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/wednesday"
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
            >
              Explore Starters
            </Link>
            <Link
              href="/monday"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              Explore Monday DSA
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
