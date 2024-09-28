import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await db.movie.findMany({});
    return NextResponse.json({
      movies,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, releaseDate } = await req.json();

    const movie = await db.movie.create({
      data: {
        name,
        releaseDate,
      },
    });

    // console.log(movie);

    return NextResponse.json({
      movie,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
