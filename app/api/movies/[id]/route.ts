import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const movie = await db.movie.findFirst({
      where: {
        id: id,
      },
    });
    // console.log("found: ", movie);

    return NextResponse.json({
      movie,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const movie = await db.movie.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      movieId: movie.id,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const values = await req.json();

    const movie = await db.movie.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json({
      movieId: movie.id,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
