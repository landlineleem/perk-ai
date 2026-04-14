import { NextResponse } from "next/server";
import perksData from "@/data/perks.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const perk = perksData.find((p) => p.id === id);

  if (!perk) {
    return NextResponse.redirect(new URL("/browse", _request.url));
  }

  // TODO: Log click for analytics / affiliate tracking here

  return NextResponse.redirect(perk.claimUrl);
}
