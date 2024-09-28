import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const review = await db.review.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      review,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const review = await db.review.delete({
      where: {
        id: id,
      },
    });

    const movieId = review.movieId;

    const allReviews = await db.review.findMany({
      where: {
        movieId: movieId,
      },
    });

    let avgRating: number = 0;
    for (let i = 0; i < allReviews.length; i++) {
      avgRating += allReviews[i].rating;
    }
    avgRating = avgRating / allReviews.length; // finding average
    avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100; // rounding to 2 decimal places

    await db.movie.update({
      where: {
        id: movieId,
      },
      data: {
        averageRating: avgRating,
      },
    });

    return NextResponse.json({
      reviewId: review.id,
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

    const review = await db.review.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });

    const movieId = review.movieId;

    const allReviews = await db.review.findMany({
      where: {
        movieId: movieId,
      },
    });

    let avgRating: number = 0;
    for (let i = 0; i < allReviews.length; i++) {
      avgRating += allReviews[i].rating;
    }
    avgRating = avgRating / allReviews.length; // finding average
    avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100; // rounding to 2 decimal places

    await db.movie.update({
      where: {
        id: movieId,
      },
      data: {
        averageRating: avgRating,
      },
    });

    return NextResponse.json({
      reviewId: review.id,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
