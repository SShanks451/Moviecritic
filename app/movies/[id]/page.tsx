"use client";

import Appbar from "@/components/Appbar";
import Loader from "@/components/Loader";
import ReviewCard from "@/components/Reviewcard";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  name: string;
  averageRating?: number;
}

interface Review {
  id: string;
  reviewComment: string;
  rating: number;
  reviewerName: string;
}

export default function Movie() {
  const params = useParams();
  const id = params.id;

  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovieReviews() {
      const res1 = await axios.get(`/api/movies/${id}/reviews`);
      setReviews(res1.data.reviews);

      const res2 = await axios.get(`/api/movies/${id}`);
      setMovie(res2.data.movie);
    }

    getMovieReviews();
  }, []);

  if (!movie || !reviews) {
    return (
      <div className="w-[100%] flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="mx-20 mt-10 mb-6">
        <div className="flex justify-between font-sans text-3xl font-medium">
          <h1>{movie.name}</h1>
          <h1 className="text-[#6558f5]">{movie.averageRating ? movie.averageRating : "-"} /10</h1>
        </div>
      </div>
      <div className="font-sans mx-20">
        {reviews.map((r) => (
          <ReviewCard key={r.id} id={r.id} comment={r.reviewComment} rating={r.rating} name={r.reviewerName} />
        ))}
      </div>
    </div>
  );
}
