import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { movieId, reviewerName, rating, reviewComment } = await req.json();

    const review = await db.review.create({
      data: {
        movieId,
        reviewerName,
        rating,
        reviewComment,
      },
    });

    const allReviews = await db.review.findMany({
      where: {
        movieId: movieId,
      },
    });
    //console.log("all reviews: ", allReviews);

    let avgRating: number = 0;
    for (let i = 0; i < allReviews.length; i++) {
      avgRating += allReviews[i].rating;
    }
    avgRating = avgRating / allReviews.length; // finding average
    avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100; // rounding to 2 decilam places

    await db.movie.update({
      where: {
        id: movieId,
      },
      data: {
        averageRating: avgRating,
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
