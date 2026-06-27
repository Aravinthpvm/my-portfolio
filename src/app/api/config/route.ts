import { NextResponse } from 'next/server';

export async function GET() {
  const hasMongo = !!process.env.MONGODB_URI;
  return NextResponse.json({ dbConnected: hasMongo });
}
export const dynamic = 'force-dynamic';
