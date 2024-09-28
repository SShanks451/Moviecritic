"use client";

import Appbar from "@/components/Appbar";
import Loader from "@/components/Loader";
import Moviecard from "@/components/Moviecard";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Movies() {
  const [moviesFix, setMoviesFix] = useState(null);
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getAllMovies() {
      const res = await axios.get("/api/movies");
      // console.log(res.data.movies);
      setMoviesFix(res.data.movies);
      setMovies(res.data.movies);
    }

    getAllMovies();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setMovies(moviesFix);
    } else {
      const filteredMovies = moviesFix.filter((movie) => movie.name.toLowerCase().includes(searchText.toLowerCase()));
      setMovies(filteredMovies);
    }
  }, [searchText]);

  if (!movies)
    return (
      <div className="w-[100%] flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <Loader />
        </div>
      </div>
    );

  return (
    <div>
      <Appbar />
      <div className="my-12 mx-32">
        <h1 className="text-4xl font-medium font-sans">The best movie reviews site!</h1>
        <div className="mt-7">
          <Searchbar
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-wrap gap-10 my-10">
          {movies.map((m: any) => (
            <Moviecard key={m.id} id={m.id} name={m.name} releaseDate={m.releaseDate} rating={m.averageRating} />
          ))}
        </div>
      </div>
    </div>
  );
}
