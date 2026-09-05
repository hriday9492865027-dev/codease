'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Flame, 
  Zap, 
  Bookmark, 
  LayoutDashboard, 
  Archive, 
  RefreshCw, 
  Code2, 
  Menu, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streakCount, setStreakCount] = useState(5);

  useEffect(() => {
    // Read bookmarks/streak from localStorage if available
    try {
      const storedProgress = localStorage.getItem('codechef_hub_progress');
      if (storedProgress) {
        const parsed = JSON.parse(storedProgress);
        const solved = Object.values(parsed).filter((p: any) => p.status === 'completed').length;
        if (solved > 0) {
          setStreakCount(Math.max(5, Math.ceil(solved / 2)));
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Code2 },
    { name: 'Monday DSA', href: '/monday', icon: Calendar, badge: 'Weekly' },
    { name: 'Wednesday Starters', href: '/wednesday', icon: Zap, badge: 'Div 1-4' },
    { name: 'Archive', href: '/archive', icon: Archive },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Sync Hub', href: '/admin', icon: RefreshCw },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
                <Code2 className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  CodeChef <span className="gradient-text font-black">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Monday DSA • Wednesday Starters
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm shadow-orange-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                      isActive ? 'bg-orange-500/30 text-orange-200' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Streak & CodeChef Link */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
              title="Your Active Coding Streak"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streakCount} Day Streak</span>
            </Link>

            <a
              href="https://www.codechef.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all hover:border-slate-600"
            >
              <span>CodeChef.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{streakCount}d</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
