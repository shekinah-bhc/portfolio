import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDB();
    const doc = await db.collection("geo_data").findOne(
      { key: "ne_110m_countries" },
      { projection: { type: 1, features: 1, _id: 0 } }
    );

    if (!doc) {
      return NextResponse.json(
        { error: "GeoJSON not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { type: doc.type, features: doc.features },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    console.error("[GET /api/geo/countries]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
