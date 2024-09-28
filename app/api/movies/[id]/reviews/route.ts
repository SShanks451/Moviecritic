import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const reviews = await db.review.findMany({
      where: {
        movieId: id,
      },
    });

    return NextResponse.json({
      reviews,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
