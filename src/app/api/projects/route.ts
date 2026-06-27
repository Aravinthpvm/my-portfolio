import { getDatabase } from '@/lib/mongodb';
import { localProjects } from '@/lib/portfolioData';
import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(localProjects);
  }
  try {
    const db = await getDatabase();
    const data = await db.collection('projects')
      .find({})
      .sort({ created_at: 1 })
      .toArray();
    
    if (data && data.length > 0) {
      const mapped = data.map(item => ({
        ...item,
        id: item.id || item._id.toString(),
        _id: undefined
      }));
      return NextResponse.json(mapped);
    }
    return NextResponse.json(localProjects);
  } catch (e) {
    console.error('MongoDB fetch projects error:', e);
    return NextResponse.json(localProjects);
  }
}
export const dynamic = 'force-dynamic';
