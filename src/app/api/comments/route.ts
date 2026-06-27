import { getDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 400 });
  }
  try {
    const db = await getDatabase();
    const comments = await db.collection('comments')
      .find({})
      .sort({ is_pinned: -1, created_at: -1 })
      .toArray();
    
    const mapped = comments.map(c => ({
      ...c,
      id: c.id || c._id.toString(),
      _id: undefined
    }));
    return NextResponse.json(mapped);
  } catch (e) {
    console.error('MongoDB fetch comments error:', e);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { name, comment, image_url } = body;
    
    if (!name || !comment) {
      return NextResponse.json({ error: 'Name and comment are required' }, { status: 400 });
    }

    const db = await getDatabase();
    
    const newComment = {
      name,
      comment,
      image_url: image_url || null,
      likes: 0,
      is_pinned: false,
      replies: [],
      created_at: new Date().toISOString(),
      liked_by_admin: false
    };

    const result = await db.collection('comments').insertOne(newComment);
    
    const savedComment = {
      ...newComment,
      id: result.insertedId.toString()
    };
    
    return NextResponse.json(savedComment);
  } catch (e) {
    console.error('MongoDB post comment error:', e);
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
