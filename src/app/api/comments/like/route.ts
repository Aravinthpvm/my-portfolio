import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { commentId } = body;

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    const db = await getDatabase();
    
    // Attempt update using ObjectId, fall back to string id if not valid ObjectId format
    let query = {};
    try {
      query = { _id: new ObjectId(commentId) };
    } catch {
      query = { id: commentId };
    }

    const result = await db.collection('comments').findOneAndUpdate(
      query,
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const updated = {
      ...result,
      id: result.id || result._id.toString(),
      _id: undefined
    };

    return NextResponse.json(updated);
  } catch (e) {
    console.error('MongoDB like comment error:', e);
    return NextResponse.json({ error: 'Failed to update like status' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
