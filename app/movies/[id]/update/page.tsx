"use client";

import Loader from "@/components/Loader";
import MovieForm from "@/components/MovieForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  name: string;
  releaseDate: string;
}

export default function UpdateMovie() {
  const params = useParams();
  const id = params.id;

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovie() {
      const res = await axios.get(`/api/movies/${id}`);
      setMovie(res.data.movie);
    }

    getMovie();
  }, []);

  if (!movie) {
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
        <MovieForm id={movie.id} name={movie.name} releaseDate={movie.releaseDate} />
      </div>
    </div>
  );
}
