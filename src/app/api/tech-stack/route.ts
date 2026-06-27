import { getDatabase } from '@/lib/mongodb';
import { localTechStack } from '@/lib/portfolioData';
import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(localTechStack);
  }
  try {
    const db = await getDatabase();
    const data = await db.collection('tech_stack')
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
    return NextResponse.json(localTechStack);
  } catch (e) {
    console.error('MongoDB fetch tech_stack error:', e);
    return NextResponse.json(localTechStack);
  }
}
export const dynamic = 'force-dynamic';
