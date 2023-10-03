import { NextResponse, NextRequest } from "next/server";
import path from 'path';
import { promises as fs } from 'fs';

// Get solana tokens list
export async function GET(request: NextRequest) {
    const data = await fs.readFile(path.join(process.cwd(), 'data', 'foundingfrensdata.json'), 'utf8');
    return NextResponse.json(JSON.parse(data));
}

