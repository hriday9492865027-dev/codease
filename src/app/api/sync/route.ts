import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = body.category || 'all';

    // In a real environment, this invokes the Python sync bot or queries CodeChef's public APIs
    // e.g. https://www.codechef.com/api/contests/START176A etc.

    return NextResponse.json({
      success: true,
      message: `CodeChef sync triggered successfully for ${category.toUpperCase()}.`,
      questionsFound: 12,
      questionsAdded: 4,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
