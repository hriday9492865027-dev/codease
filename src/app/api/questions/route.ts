import { NextResponse } from 'next/server';
import { initialQuestionSets } from '../../../lib/data-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const division = searchParams.get('division');
  const difficulty = searchParams.get('difficulty');
  const search = searchParams.get('search');

  let sets = [...initialQuestionSets];

  if (category && category !== 'all') {
    sets = sets.filter(s => s.category === category);
  }

  let questions = sets.flatMap(s => s.questions);

  if (division && division !== 'all') {
    questions = questions.filter(q => q.division === division);
  }

  if (difficulty && difficulty !== 'all') {
    questions = questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    questions = questions.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.problemCode.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    count: questions.length,
    sets,
    questions,
  });
}
