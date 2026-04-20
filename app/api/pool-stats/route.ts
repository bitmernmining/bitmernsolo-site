import { NextResponse } from "next/server";
import { fetchPoolData } from "@/lib/pool-stats";

export async function GET() {
  try {
    const pools = await fetchPoolData();
    return NextResponse.json(pools);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch pool stats" },
      { status: 500 }
    );
  }
}
