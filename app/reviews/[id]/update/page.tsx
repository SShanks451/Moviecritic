"use client";

import Loader from "@/components/Loader";
import ReviewForm from "@/components/ReviewForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  movieId: string;
  rating: string;
  reviewerName: string;
  reviewComment: string;
}

export default function UpdateMovie() {
  const params = useParams();
  const id = params.id;

  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    async function getReview() {
      const res = await axios.get(`/api/reviews/${id}`);
      setReview(res.data.review);
    }

    getReview();
  }, []);

  if (!review) {
    return (
      <div className="w-[100%] flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col justify-center">
        <ReviewForm id={review.id} movieId={review.movieId} name={review.reviewerName} rating={review.rating} comment={review.reviewComment} />
      </div>
    </div>
  );
}
