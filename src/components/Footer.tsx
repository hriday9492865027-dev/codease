import React from 'react';
import Link from 'next/link';
import { Code2, Github, ExternalLink, Calendar, Zap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#080B13] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md">
                <Code2 className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                CodeChef <span className="gradient-text font-black">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Automated weekly question tracking system for CodeChef's Monday DSA practice and Wednesday Starters across Div 1, Div 2, Div 3, and Div 4.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Automation Pipeline Active
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Weekly Contests
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/monday" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>Monday DSA Challenge</span>
                </Link>
              </li>
              <li>
                <Link href="/wednesday" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span>Wednesday Starters (Div 1-4)</span>
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-orange-400 transition-colors">
                  Past Question Archive
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-orange-400 transition-colors">
                  Progress Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* CodeChef & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              CodeChef Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.codechef.com/contests" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <span>All Contests</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.codechef.com/practice" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <span>Practice Arena</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://discuss.codechef.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <span>Discuss & Editorials</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-orange-400 transition-colors">
                  Scraper & Sync Hub
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CodeChef Hub. Built for competitive programmers & learners.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Next.js & Python Automation Bot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
