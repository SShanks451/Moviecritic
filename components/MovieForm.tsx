"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MovieForm({ id, name, releaseDate }: { id?: string; name?: string; releaseDate?: string }) {
  const router = useRouter();

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({ name: "", releaseDate: "" });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "add") {
      await axios.post("/api/movies", {
        name: formData.name,
        releaseDate: formData.releaseDate,
      });
      router.push("/movies");
    }
    if (mode === "edit") {
      await axios.patch(`/api/movies/${id}`, {
        name: formData.name,
        releaseDate: formData.releaseDate,
      });
      router.push("/movies");
    }
  };

  useEffect(() => {
    if (name && releaseDate) {
      setMode("edit");
      setFormData({ name: name, releaseDate: releaseDate });
    }
  }, []);

  return (
    <div className="border-2 px-10 py-6 w-fit">
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-2xl font-medium">{mode === "add" ? "Add new movie" : "Update movie"}</h1>
        <input
          className="border-2 rounded-md py-1.5 px-3 mb-4 mt-7 w-[100%]"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border-2 rounded-md py-1.5 px-3 my-4 w-[100%]"
          type="text"
          placeholder="Release Date"
          value={formData.releaseDate}
          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
        />
        <div className="flex justify-end mt-5">
          <Button buttonType="submit" backgorund="purple">
            {mode === "add" ? "Create movie" : "Update movie"}
          </Button>
        </div>
      </form>
    </div>
  );
}
