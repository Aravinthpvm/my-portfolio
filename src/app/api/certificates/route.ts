import { getDatabase } from '@/lib/mongodb';
import { localCertificates } from '@/lib/portfolioData';
import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(localCertificates);
  }
  try {
    const db = await getDatabase();
    const data = await db.collection('certificates')
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
    return NextResponse.json(localCertificates);
  } catch (e) {
    console.error('MongoDB fetch certificates error:', e);
    return NextResponse.json(localCertificates);
  }
}
export const dynamic = 'force-dynamic';
