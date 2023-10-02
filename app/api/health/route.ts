import { NextResponse } from "next/server";

export async function GET( request: Request ) {
  return NextResponse.json(
    "Server is up and running!",
    {
        status: 200,
    }
  )
}