"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

interface FormData {
  selectedMovie: string;
  name: string;
  rating: string;
  comment: string;
}

interface Movie {
  id: string;
  name: string;
  releaseDate: string;
  averageRating: number;
}

export default function ReviewForm({
  id,
  movieId,
  name,
  rating,
  comment,
}: {
  id?: string;
  movieId?: string;
  name?: string;
  rating?: string;
  comment?: string;
}) {
  const router = useRouter();

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState<FormData>({ selectedMovie: "", name: "", rating: "", comment: "" });
  const [movies, setMovies] = useState<Movie[] | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "add") {
      await axios.post("/api/reviews", {
        movieId: formData.selectedMovie,
        reviewerName: formData.name,
        rating: parseFloat(formData.rating),
        reviewComment: formData.comment,
      });
      router.push("/movies");
    }
    if (mode === "edit") {
      await axios.patch(`/api/reviews/${id}`, {
        movieId: formData.selectedMovie,
        reviewerName: formData.name,
        rating: parseFloat(formData.rating),
        reviewComment: formData.comment,
      });
      router.push(`/movies/${movieId}`);
    }
  };

  useEffect(() => {
    async function getMovies() {
      const res = await axios.get("/api/movies");
      setMovies(res.data.movies);
    }

    getMovies();

    if (id) {
      setMode("edit");
      //@ts-expect-error abcd
      setFormData({ selectedMovie: movieId, name: name, rating: rating, comment: comment });
    }
  }, []);

  if (!movies) {
    return (
      <div className="w-[100%] flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 px-10 py-6 w-fit">
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-2xl font-medium">{mode === "add" ? "Add new review" : "Update review"}</h1>

        <select
          className="w-full py-1.5 px-3 mb-4 mt-7 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.selectedMovie}
          onChange={mode === "add" ? (e) => setFormData({ ...formData, selectedMovie: e.target.value }) : () => {}}
        >
          <option value="" disabled>
            Select a movie
          </option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          className="border-2 rounded-md py-1.5 px-3 my-4 w-full"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border-2 rounded-md py-1.5 px-3 my-4 w-full"
          type="text"
          placeholder="Rating out of 10"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
        <textarea
          className="border-2 rounded-md py-1.5 px-3 my-4 w-full"
          placeholder="Review comments"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        ></textarea>
        <div className="flex justify-end mt-5">
          <Button buttonType="submit" backgorund="purple">
            {mode === "add" ? "Add review" : "Update review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
