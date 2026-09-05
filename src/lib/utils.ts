import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getDifficultyColor(difficulty: string): { bg: string; text: string; border: string } {
  switch (difficulty.toLowerCase()) {
    case 'easy':
    case 'basic':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
      };
    case 'medium':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
      };
    case 'hard':
    case 'advanced':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/30',
      };
    default:
      return {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500/30',
      };
  }
}

export function getDivisionColor(div: string): { bg: string; text: string; border: string } {
  switch (div.toLowerCase()) {
    case 'div1':
      return {
        bg: 'bg-purple-500/15 text-purple-400',
        text: 'text-purple-400',
        border: 'border-purple-500/40',
      };
    case 'div2':
      return {
        bg: 'bg-blue-500/15 text-blue-400',
        text: 'text-blue-400',
        border: 'border-blue-500/40',
      };
    case 'div3':
      return {
        bg: 'bg-emerald-500/15 text-emerald-400',
        text: 'text-emerald-400',
        border: 'border-emerald-500/40',
      };
    case 'div4':
      return {
        bg: 'bg-amber-500/15 text-amber-400',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
      };
    default:
      return {
        bg: 'bg-gray-500/15 text-gray-300',
        text: 'text-gray-300',
        border: 'border-gray-500/40',
      };
  }
}
